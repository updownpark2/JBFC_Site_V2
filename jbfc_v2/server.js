const express = require("express");
const app = express();

const cors = require(`cors`);
app.use(cors({ origin: "http://localhost:3000" }));
const bodyParser = require(`body-parser`);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const MongoClient = require(`mongodb`).MongoClient;
app.use(express.urlencoded({ extended: true }));
let db;

MongoClient.connect(
  `mongodb+srv://tkdgk1996:EIVzImLmTJ39AY7f@cluster0.tj8yoah.mongodb.net/?retryWrites=true&w=majority`
).then((client) => {
  db = client.db("JBV2");
});

app.get(`/test`, (req, res) => res.send(`서버연결성공`));

app.listen(8080, () => {
  console.log("연결");
});
// 8080 포트로 접근하면 연결해줘라

const findIdInMongoDB = async (candidateID) => {
  const idExist = await db
    .collection(`userInfo`)
    .findOne({ userId: candidateID });
  return idExist === null ? false : true;
};

app.post(`/isDuplicateID`, async (req, res) => {
  const idExist = await findIdInMongoDB(req.body.userId);

  res.send(idExist);
});
