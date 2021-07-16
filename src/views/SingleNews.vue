<template>
    <div class="container">
        <button type="button" class="btn btn-primary mt-3 mb-3" @click="toLastPage">回到上一頁</button>

        <img :src="singleNewsData.urlToImage" alt="新聞圖片">

        <h2 class="mt-3 mb-3">{{ singleNewsData.title }}</h2>

        <h6>來源名稱</h6>
        <p class="card-text">{{ singleNewsData.source.name }}</p>

        <h6>作者</h6>
        <p class="card-text">{{ singleNewsData.author }}</p>

        <h6>發布時間</h6>
        <p class="card-text">{{ singleNewsData.publishedAt }}</p>

        <h6>內容</h6>
        <p class="card-text">{{ singleNewsData.content }}</p>

        <a :href="singleNewsData.url" target="_blank" class="d-block mb-5">→ 前往原文網址閱讀</a>
    </div>
</template>

<script>
    export default {
        name: "singleNews",

        computed: {
            singleNewsData() {
                return this.$store.state.singleNewsData;
            },
        },

        mounted() {
            this.$store.dispatch("filterSingleNews", this.$route.query.newsUrl);
            window.scrollTo({
                top: 0,
            });
        },

        methods: {
            toLastPage() {
                this.$router.go(-1);
            },
        },
    }
</script>

<style scoped lang="scss">
    @import "@/assets/scss/singleNews.scss";
</style>