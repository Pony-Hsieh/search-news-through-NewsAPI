import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        totalPages: 1,
        nowPage: 1,
        allNewsData: [],
        singleNewsData: {},
    },

    mutations: {
        ALL_NEWS_DATA(state, payload) {
            state.allNewsData = payload;
        },
        SINGLE_NEWS_DATA(state, payload) {
            state.singleNewsData = payload;
        },
        TOTAL_PAGES(state, payload) {
            state.totalPages = payload;
        }
    },

    actions: { // AJAX 行為放這裡

        getAllNews(context, payload) {
            // console.log("payload", payload);
            const APIKEY = "ac708e48dd7a41368f864020a2374115";
            let API = `https://newsapi.org/v2/everything?q=${payload.newsKeyWord}`;
            if (payload.dateRangeStart) {
                API += `&from=${payload.dateRangeStart}`;
            }
            if (payload.dateRangeEnd) {
                API += `&to=${payload.dateRangeEnd}`;
            }
            if (payload.sortBy !== "publishedAt") {
                API += `&sortBy=${payload.sortBy}`;
            }
            if (payload.page !== 1) {
                API += `&page=${payload.page}`;
            }
            API += `&apiKey=${APIKEY}`;
            // console.log("API", API);

            const req = new Request(API);

            fetch(req).then(res => {
                return res.json();
            }).then(result => {
                const rawArticles = result.articles;

                rawArticles.forEach((item) => {
                    item.publishedAt = item.publishedAt.slice(0, -1).replace("T", " ");
                });

                // console.log("rawArticles", rawArticles);
                let totalPages = Math.ceil(result.totalResults / 20);
                if (totalPages > 5) {
                    totalPages = 5;
                }

                // context.commit 第一個參數是，你要傳資料給 mutations 中的哪個函式
                // context.commit 第二個參數是，你要傳哪些資料過去
                context.commit("ALL_NEWS_DATA", rawArticles);
                context.commit("TOTAL_PAGES", totalPages);
            });
        },

        filterSingleNews(context, payload) {
            let singleNewsData;
            // 此處的 payload 代表 newsUrl
            for (let i = 0; i < this.state.allNewsData.length; i++) {
                if (this.state.allNewsData[i].url === payload) {
                    singleNewsData = this.state.allNewsData[i];
                    break;
                }
            }
            context.commit("SINGLE_NEWS_DATA", singleNewsData);
        }
    }
});
