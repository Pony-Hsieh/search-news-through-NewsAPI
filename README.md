## 簡介
這份專案是串 [news API](https://newsapi.org/docs/endpoints/everything)，Endpoints 是選用 Everything

<br/>

## 限制
免費版的 news API 有以下限制：

1. 時間區間選擇最多能到一個月前，因此無法選擇一個月前的時間

2. 同一個搜尋 request，上限是撈 100 筆資料

3. 只有在 localhost 才有辦法解除 CORS 限制

<br/>


## 網頁啟用方式：
1. 下載 或是 clone 本專案

2. 透過 Ctrl + ` (通常在 tab 鍵上方) 開啟終端機

3. 透過終端機指令 $ npm install 安裝相關的必要套件

4. 透過終端機指令 $ npm run serve 運行服務，並選擇使用 localhost 開啟網頁

<br/>

## 網頁功能：
1. 可以透過 
   - 關鍵字 (預設為 "COVID-19")、
   - 時間區間 (最多限制到近一個月) 

   搜尋新聞結果

2. 時間區間的選擇具備防呆功能；
   <br/>
   即使最早和最晚的日期選相反，也會自動調整

3. 可以依據以下方式排序
   - 發布時間 (預設選用) 
   - 相關度
   - 人氣 
   
   <br/>

4. 每頁顯示 20 筆新聞

5. 992px 以下，新聞為單欄式排版；
   <br/>
   992px 以上，新聞為雙欄式排版；

6. 切換第 n 頁、套用不同搜尋條件時，頁面會自動滾至第一則新聞
