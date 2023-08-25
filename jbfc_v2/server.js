const express = require("express");
const app = express();

const MongoClient = require("mongodb").MongoClient;

let db;

MongoClient.connect(
  `mongodb+srv://tkdgk1996:EIVzImLmTJ39AY7f@cluster0.tj8yoah.mongodb.net/?retryWrites=true&w=majority`,
  function (error, client) {
    //DB연결되면 이곳 함수가 실행된다.
    if (error) {
      console.log(error);
    }
    //JBV2의 database에 연결
    db = client.db("JBV2");

    db.collection(`UserInfo`).insertOne(
      { name: "상하", age: 28 },
      (error, result) => {
        console.log("저장완료");
      }
    );

    //DB연결되면 이곳 함수가 실행된다.

    // 이 서버에 8080포트로 들어오면 연결하겠다. 8080포트는 http 포트
    app.listen(8080, () => {
      console.log("연결");
    });
  }
);

app.get("/test", (req, res) => res.send(`서버연결성공`));
