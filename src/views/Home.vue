<template>
    <div class="container">
        <h1>新聞查詢</h1>
        <div class="searchFilter">
            <h3 class="text-center">新聞搜尋條件</h3>
            <div>
                搜尋關鍵字：<input type="text" v-model.trim.lazy="searchRrequirement.newsKeyWord">
            </div>
            <div class="timeRange">
                時間區間：
                <div>
                    最早日期
                    <date-picker v-model.lazy="searchRrequirement.dateRangeStart" value-type="format"
                        format="YYYY-MM-DD" :disabled-date="notAllowedDate" />
                </div>
                &nbsp;到&nbsp;
                <div>
                    最晚日期
                    <date-picker v-model.lazy="searchRrequirement.dateRangeEnd" value-type="format" format="YYYY-MM-DD"
                        :disabled-date="notAllowedDate" />
                </div>
            </div>
            <div>
                排序標準：
                <br />
                <input type="radio" id="publishedAt" value="publishedAt" v-model="searchRrequirement.sortBy">
                <label for="publishedAt">發布時間從最近到最久</label>
                <br />
                <input type="radio" id="relevancy" value="relevancy" v-model="searchRrequirement.sortBy">
                <label for="relevancy">相關性由高到低</label>
                <br />
                <input type="radio" id="popularity" value="popularity" v-model="searchRrequirement.sortBy">
                <label for="popularity">人氣由高到低</label>
                <br />
            </div>
        </div>

        <div class="d-flex justify-content-center">
            <button type="button" @click="searchNewsByUser" class="btn  btn-primary w-75">套用搜尋條件</button>
        </div>

        <div class="allNews mt-5">
            <div class="text-center mb-5" v-show="allNewsData.length === 0">
                抱歉，沒有找到符合條件的新聞
            </div>
            <div v-for="item in allNewsData" class="card mb-3 singleNews" :key="item.url">
                <img class="card-img-top" :src="item.urlToImage" alt="新聞圖片">
                <div class="card-body">
                    <h2 class="card-title">{{ item.title }}</h2>
                    <h6 class="mt-4">作者</h6>
                    <p class="card-text">{{ item.author }}</p>
                    <h6>發布時間</h6>
                    <p class="card-text">{{ item.publishedAt }}</p>
                    <h6>概述</h6>
                    <p class="card-text">{{ item.description }}</p>
                    <router-link :to="{ path: '/singleNews', query: { newsUrl: item.url }}">
                        查看詳細新聞內容
                    </router-link>
                </div>
            </div>
        </div>

        <ul class="pagination" v-show="allNewsData.length !== 0">
            <!-- 上一頁 -->
            <li class="page-item" :class="{ 'disabled': searchRrequirement.page === 1 }">
                <a class="page-link" href="#" @click.prevent="changePage('last')" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <!-- 
                免費版的 API 最多只能撈 100 筆資料；
                每頁 20 筆資料來算的話，
                最多只能呈現 5 頁的內容
            -->
            <!-- 當前頁碼 -->
            <li class="page-item" v-for="n in totalPages" :class="{ 'active': searchRrequirement.page === n }" :key="n">
                <a class="page-link" href="#" @click.prevent="changePage('direct', n)">
                    {{ n }}
                </a>
            </li>
            <!-- 下一頁 -->
            <li class="page-item" :class="{ 'disabled': searchRrequirement.page === totalPages }">
                <a class="page-link" href="#" @click.prevent="changePage('next')" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </div>
</template>


<script>
    // 引入 DatePicker
    import DatePicker from "vue2-datepicker";
    import "@/assets/scss/datepicker.scss";
    import "vue2-datepicker/locale/zh-tw";

    export default {
        name: "home",

        components: {
            DatePicker,
        },

        data() {
            return {
                searchRrequirement: {
                    newsKeyWord: "COVID-19", // 搜尋關鍵字
                    dateRangeStart: "", // 搜尋起始日期
                    dateRangeEnd: "", // 搜尋結束日期
                    sortBy: "publishedAt", // 排序方式
                    page: 1, // 目前所在頁數
                },
            }
        },

        computed: {
            allNewsData() {
                return this.$store.state.allNewsData;
            },
            totalPages() {
                return this.$store.state.totalPages;
            },
        },

        mounted() {
            this.$store.dispatch("getAllNews", this.searchRrequirement);
        },

        methods: {

            // 禁止選取 30 天以前，或是今天之後的日期 (因為免費 API 的搜尋日期有限定 30 天內)
            notAllowedDate(date) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date > today || date < new Date(today.getTime() - 30 * 24 * 3600 * 1000);
            },

            // 確保 dateRangeStart 為較早的日期
            checkDate() {
                const D1 = new Date(this.searchRrequirement.dateRangeStart).getTime();
                const D2 = new Date(this.searchRrequirement.dateRangeEnd).getTime();

                // 兩者都有值
                if (D1 && D2) {
                    if (D1 > D2) {
                        const oldDate = this.searchRrequirement.dateRangeEnd;
                        const newDate = this.searchRrequirement.dateRangeStart;
                        this.searchRrequirement.dateRangeStart = oldDate;
                        this.searchRrequirement.dateRangeEnd = newDate;
                    }
                }
            },

            // 套用新聞搜尋條件
            searchNewsByUser() {
                this.checkDate();
                this.$store.dispatch("getAllNews", this.searchRrequirement);
                // 依據不同寬度，滾動至不同位置
                if (document.body.clientWidth < 768) {
                    window.scrollTo({
                        top: 590, // md 以下
                        behavior: "smooth",
                    });
                }
                else {
                    window.scrollTo({
                        top: 500, // md 以上
                        behavior: "smooth",
                    });
                }
            },

            // 切換頁數
            changePage(way, page) {
                // 先調整頁碼
                if (way === "direct") {
                    this.searchRrequirement.page = page;
                }
                else if (way === "last") {
                    this.searchRrequirement.page -= 1;
                }
                else if (way === "next") {
                    this.searchRrequirement.page += 1;
                }

                // 再重新發 AJAX
                this.searchNewsByUser();
                if (document.body.clientWidth < 768) {
                    window.scrollTo({
                        top: 590, // md 以下
                        behavior: "smooth",
                    });
                }
                else {
                    window.scrollTo({
                        top: 500, // md 以上
                        behavior: "smooth",
                    });
                }
            }
        },
    }
</script>


<style scoped lang="scss">
    @import "@/assets/scss/home.scss";
</style>