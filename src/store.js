import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // allNewsData: [],
        singleNewsData: {},
        allNewsData: [
            // "status": "ok",
            // "totalResults": 269252,
            // "articles":
            {
                "source": { "id": "wired", "name": "Wired" },
                "author": "Maryn McKenna",
                "title": "The Challenge of Covid-19 Vaccines for the Immunosuppressed",
                "description": "Recent studies find transplant patients and immune-suppressed people who get the shot don’t make many antibodies. But that research is just beginning.",
                "url": "https://www.wired.com/story/the-challenge-of-covid-19-vaccines-for-the-immunosuppressed/",
                "urlToImage": "https://media.wired.com/photos/60c8e8683082cb0dcce32a9a/191:100/w_1280,c_limit/Science_breakthroughinfections_GettyImages-1179761018.jpg",
                "publishedAt": "2021-06-16T11:00:00Z",
                "content": "In March, the group published the first data from those sign-ups: Among 436 transplant recipients, only 17 percent showed detectable antibodies after one dose of the Pfizer or Moderna vaccines. That … [+4154 chars]"
            },

            {
                "source": { "id": "the-verge", "name": "The Verge" },
                "author": "Nicole Wetsman",
                "title": "Amazon’s COVID-19 test is now available to consumers",
                "description": "Amazon’s FDA-authorized COVID-19 test kit, which was originally used for its own employees, is now available to consumers. People swab their nose and then send the sample to a lab.",
                "url": "https://www.theverge.com/2021/6/15/22535453/amazon-covid-test-consumers-available",
                "urlToImage": "https://cdn.vox-cdn.com/thumbor/8DBlOqtSpsCjicvIQR9EhqKfzFU=/0x108:1500x893/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/22660652/amazon_covid_19_test_3_2.jpg",
                "publishedAt": "2021-06-15T19:07:19Z",
                "content": "The test was originally used for Amazon employees\r\nIf you buy something from a Verge link, Vox Media may earn a commission. See our ethics statement.\r\nAmazon is selling its own COVID-19 test kit dire… [+1428 chars]"
            },
        ]
    },

    mutations: {
        ALL_NEWS_DATA(state, payload) {
            state.allNewsData = payload;
        },
        SINGLE_NEWS_DATA(state, payload) {
            state.singleNewsData = payload;
        },
    },

    actions: { // AJAX 行為放這裡

        getAllNews(context, payload) {
            /*
                在元件中的 methods 的指定函式中，使用 this.$store.dispatch("getAllRoom", payload);
                第二個參數 payload 不一定要寫
            */
            console.log("payload", payload);
            const APIKEY = "ac708e48dd7a41368f864020a2374115";

            if (this.state.allNewsData.length === 0) {

                let API = `https://newsapi.org/v2/everything?q=${payload.newsKeyWord}`;

                if (payload.dateRangeStart) {
                    API += `&from=${payload.dateRangeStart}`;
                    console.log("from date API", API);
                }

                if (payload.dateRangeEnd) {
                    API += `&to=${payload.dateRangeEnd}`;
                    // console.log("to date API", API);
                }

                if (payload.sortBy !== "publishedAt") {
                    API += `&sortBy=${payload.sortBy}`;
                    // console.log("to date API", API);
                }

                // 這裡還要再多一個 page 的判斷
                if (payload.page === 1) {
                    API += `&page=${payload.page}`;
                    // console.log("to date API", API);
                }
                /*
                */

                console.log(APIKEY);
                API += `&apiKey=${APIKEY}`;


                console.log(API);


                /*
                const req = new Request(API);
 
                fetch(req).then(res => {
                    return res.json();
                }).then(result => {
                    const rawArticles = result.articles;
 
                    rawArticles.forEach((item) => {
                        item.publishedAt = item.publishedAt.slice(0, -1).replace("T", " ");
                    });
 
                    console.log("rawArticles", rawArticles);
 
                    // context.commit 第一個參數是，你要傳資料給 mutations 中的哪個函式
                    // context.commit 第二個參數是，你要傳哪些資料過去
                    context.commit("ALL_NEWS_DATA", rawArticles);
                });
 
                */



                ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////



                /*
                    axios.get("https://challenge.thef2e.com/api/thef2e2019/stage6/rooms", this.state.axiosHeaders)
                        .then((resolveRes) => {
                            // console.log(resolveRes);
                            // console.log("resolveRes.data.items", resolveRes.data.items);
                            context.commit("ALL_ROOM_DATA", resolveRes.data.items);
                            context.commit("LOADING_STATUS", false);
                        })
                        .catch((rejectRes) => {
                            // console.log(rejectRes);
                            // context.commit("LOADING_STATUS", false);
                            this.dispatch("getAllRoom");
                        });
                */


            }
        },

        filterSingleNews(context, payload) {
            // 之後要想一下，如果一開始就進到這個頁面，但目前還沒撈資料，要怎麼辦？
            // if (this.state.allNewsData.length === 0) {
            //     this.getAllNews();
            // }

            // 我們先處理，已經有所有新聞資料的狀況。

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
