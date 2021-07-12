<template>
    <div>
        <input type="text" v-model.trim.lazy="searchRrequirement.newsKeyWord">

        最早日期
        <input type="date" v-model.lazy="searchRrequirement.dateRangeStart">

        最晚日期
        <input type="date" v-model.lazy="searchRrequirement.dateRangeEnd">

        排序標準
        <div>
            <input type="radio" id="publishedAt" value="publishedAt" v-model="searchRrequirement.sortBy">
            <label for="publishedAt">publishedAt</label>
            <br>
            <input type="radio" id="relevancy" value="relevancy" v-model="searchRrequirement.sortBy">
            <label for="relevancy">relevancy</label>
            <br>
            <input type="radio" id="popularity" value="popularity" v-model="searchRrequirement.sortBy">
            <label for="popularity">popularity</label>
            <br>
            <span>Picked: {{ searchRrequirement.sortBy }}</span>
        </div>

        <!-- <br />
        <button type="button" @click="checkDate">checkDate</button> -->

        <br />
        <button type="button" @click="searchNewsByUser">searchNewsByUser</button>

        <br />
        https://newsapi.org/v2/everything

        ?q=apple

        &
        from=2021-07-11

        &
        to=2021-07-11

        &
        sortBy=popularity

        &
        apiKey=ac708e48dd7a41368f864020a2374115



        <div v-for="item in allNewsData" class="singleNews" :key="item.url">
            <!-- 新聞圖片： -->
            <img :src="item.urlToImage" alt="新聞圖片">

            <h3>新聞標題</h3>
            {{ item.title }}

            <h4>概述</h4>
            {{ item.description }}

            <h4>發布時間</h4>
            {{ item.publishedAt }}

            <h4>作者</h4>
            {{ item.author }}

            <router-link :to="{ path: '/singleNews', query: { newsUrl: item.url }}"> singleNews </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "home",

        data() {
            return {
                searchRrequirement: {
                    newsKeyWord: "COVID-19",
                    dateRangeStart: "",
                    dateRangeEnd: "",
                    sortBy: "publishedAt",
                    page: 1,
                },
            }
        },

        computed: {
            allNewsData() {
                return this.$store.state.allNewsData;
            },
        },

        mounted() {
            this.$store.dispatch("getAllNews", this.searchRrequirement);
        },

        methods: {
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

            searchNewsByUser() {
                this.checkDate();
                this.$store.dispatch("getAllNews", this.searchRrequirement);
            },
        },
    }
</script>

<style scoped lang="scss">
    @import "@/assets/scss/home.scss";
</style>