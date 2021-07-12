<template>
    <div>
        ● 返回列表頁的按鈕(例如原本在第二頁，那就還是要維持在第二頁)
        <button type="button" @click="toLastPage">上一頁</button>

        ○ 新聞圖片 urlToImage
        <!-- {{ singleNewsData.urlToImage }} -->
        <img :src="singleNewsData.urlToImage" alt="新聞圖片">

        <h3>新聞標題</h3>
        {{ singleNewsData.title }}

        <h4>發布時間</h4>
        {{ singleNewsData.publishedAt }}

        <h4>作者</h4>
        {{ singleNewsData.author }}

        <h4>內容</h4>
        {{ singleNewsData.content }}
        <a :href="singleNewsData.url" target="_blank">→ 前往原文網址閱讀</a>

        <h4>來源名稱</h4>
        {{ singleNewsData.source.name }}

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