const express = require("express");
const app = express();
const https = require("https");
// PORTとTOKENは環境変数に設定しておき、そこから取得
const PORT = process.env.PORT || 3001
const TOKEN = process.env.LINE_ACCESS_TOKEN
//const PORT = 3001;
const yutaiRoute = require("./routes/yutai");
const connectDB = require("./db/connect");
require("dotenv").config();
app.use(express.json());
app.use(express.static("./public"));

app.use("/api/v1/yutai", yutaiRoute);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(PORT, console.log("サーバが起動しました"));
    } catch (err) {
        console.log(err);
    }
};

start();

// 「/webhook」にPOSTリクエストがあった場合の処理
app.post("/webhook", function(req, res) {
  res.send("HTTP POST request sent to the webhook URL!");
  // ユーザーがボットにメッセージを送った場合、返信メッセージを送る
  if (req.body.events[0].type === "message") {
    // 文字列化したメッセージデータ
    const dataString = JSON.stringify({
      replyToken: req.body.events[0].replyToken,
      messages: [
        {
          "type": "text",
          "text": "Hello, user"
        },
        {
          "type": "text",
          "text": "May I help you?"
        }
      ]
    });

    // リクエストヘッダー
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + TOKEN
    };

    // リクエストに渡すオプション
    const webhookOptions = {
      "hostname": "api.line.me",
      "path": "/v2/bot/message/reply",
      "method": "POST",
      "headers": headers,
      "body": dataString
    };

    // リクエストの定義
    const request = https.request(webhookOptions, (res) => {
      res.on("data", (d) => {
        process.stdout.write(d)
      });
    });

    // エラーをハンドル
    request.on("error", (err) => {
      console.error(err)
    });

    // データを送信
    request.write(dataString);
    request.end();
  }
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
});