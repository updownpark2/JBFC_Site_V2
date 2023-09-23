const express = require("express");
const cors = require(`cors`);
const passport = require(`passport`);
const LocalStrategy = require(`passport-local`).Strategy;
const session = require(`express-session`);
const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
// app.use를 사용하면 클라이언트-서버 사이에 이 코드가 동작함
// 미들웨어 라고한다.

const bodyParser = require(`body-parser`);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//session 방식 login 구현하기
app.use(
  session({ secret: `비밀코드`, resave: true, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

// 세팅끝
let db;

const connectMongoDB = async () => {
  const MongoClient = require(`mongodb`).MongoClient;
  app.use(express.urlencoded({ extended: true }));

  await MongoClient.connect(
    `mongodb+srv://tkdgk1996:Tznk2F57VolxQbYk@cluster0.tj8yoah.mongodb.net/?retryWrites=true&w=majority`,
    //db접속되면 여기 아래 함수 실행시켜줘
    { useUnifiedTopology: true }
  ).then((client) => {
    db = client.db(`JBV2`);
    app.listen(8080, () => console.log("연결"));
  });
};
connectMongoDB();

// 8080 포트로 접근하면 연결해줘라

const ObjectId = require("mongodb").ObjectId;

// DB에 해당 ID가 있는지 check하고 없다면 false를 있다면 true를 return하는함수
const findIdInMongoDB = async (candidateID) => {
  const idExist = await db
    .collection(`userInfo`)
    .findOne({ userId: candidateID });
  return idExist === null ? false : true;
};

//isDiplicatID로 post 요청이 들어오면 해당 ID가 DB에 존재하는지 확인 후 return
app.post(`/isDuplicateID`, async (req, res) => {
  const idExist = await findIdInMongoDB(req.body.userId);

  res.send(idExist);
});

// ID,PW,Name을 DB에 저장함
const insertIdInMongoDB = (userId, userPw, userName) => {
  db.collection(`userInfo`).insertOne(
    {
      userId: userId,
      userPw: userPw,
      userName: userName,
    },
    (error, req) => console.log("저장")
  );
};

//insertUserInfo로 post요청이 들어오면 DB에 저장하는 함수를 호출
app.post(`/insertUserInfo`, (req, res) => {
  const userId = req.body.userId;
  const userPw = req.body.userPw;
  const userName = req.body.userName;
  insertIdInMongoDB(userId, userPw, userName);
});

const findIdPwInMongoDB = async (userId, userPw) => {
  const isExistIdPw = await db
    .collection("userInfo")
    .findOne({ userId: userId, userPw: userPw });
  return isExistIdPw === null ? false : true;
};

app.post(`/isExistIdPw`, async (req, res) => {
  const userId = req.body.userId;
  const userPw = req.body.userPw;

  const isExistIdPw = await findIdPwInMongoDB(userId, userPw);
  res.send(isExistIdPw);
});

app.post(
  `/login`,
  passport.authenticate("local", {
    failureRedirect: "/fail",
    successRedirect: "/success",
  }),
  (req, res) => {
    res.redirect(`/success`);
  }
);

app.get(`/fail`, (req, res) => {
  console.log("실패");
  res.send(false);
});
app.get(`/success`, (req, res) => {
  console.log("성공");
  res.send(true);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "userId",
      passwordField: "userPw",
      session: true,
      passReqToCallback: true,
    },

    async function (req, userId, passwordField, done) {
      //console.log(입력한아이디, 입력한비번);
      const ExistId = await db
        .collection("userInfo")
        .findOne({ userId: req.body.userId });
      if (ExistId === null) {
        return done(null, false, { message: "존재하지않는 아이디" });
      }
      if (req.body.userPw === ExistId.userPw) {
        return done(null, ExistId);
      } else {
        return done(null, false, { message: "비번틀렸어요" });
      }
    }
  )
);

passport.serializeUser((userInfo, done) => {
  done(null, userInfo.userId);
  // userId를 이용해 session을 생성한다 (통상적으로)
  // 씨리얼 라이즈한다
});
passport.deserializeUser((userId, done) => {
  done(null, userInfo.userId);
});

// 나중에 userId대신 userNickName 으로 또 프로필사진까지
const insertBoardInMongoDB = async (title, text, month, day, userId) => {
  await db.collection(`board`).insertOne(
    {
      title: title,
      text: text,
      month: month,
      day: day,
      userId: userId,
      likeThis: [],
      hateThis: [],
    },
    (error, req) => console.log("저장")
  );
};

app.post(`/insertBoard`, async (req, res) => {
  const title = req.body.title;
  const text = req.body.text;
  const month = req.body.month;
  const day = req.body.day;
  const userId = req.body.userId;

  await insertBoardInMongoDB(title, text, month, day, userId);
  res.send(`저장끝`);
});

const getBoardData = async () => {
  const boardData = await db.collection(`board`).find({}).toArray();
  return boardData;
};

app.get(`/getBoardData`, async (req, res) => {
  const boardData = await getBoardData();
  boardData === null ? res.send([]) : res.send(boardData);
});

app.post(`/getBoardDetail`, async (req, res) => {
  const boardId = req.body.boardId;

  const boardDetail = await db
    .collection(`board`)
    .findOne({ _id: ObjectId(boardId) });

  res.send(boardDetail);
});

app.post(`/pushLikeThis`, async (req, res) => {
  const boardId = req.body.boardId;
  const userId = req.body.userId;

  await db
    .collection("board")
    .updateOne({ _id: ObjectId(boardId) }, { $push: { likeThis: userId } });
  res.send("성공");
});

app.post(`/pushHateThis`, async (req, res) => {
  const boardId = req.body.boardId;
  const userId = req.body.userId;

  await db
    .collection("board")
    .updateOne({ _id: ObjectId(boardId) }, { $push: { hateThis: userId } });
  res.send("성공");
});

app.post(`/popLikeThis`, async (req, res) => {
  const boardId = req.body.boardId;
  const userId = req.body.userId;

  await db
    .collection("board")
    .updateOne({ _id: ObjectId(boardId) }, { $pull: { likeThis: userId } });
  res.send("성공");
});

app.post(`/popHateThis`, async (req, res) => {
  const boardId = req.body.boardId;
  const userId = req.body.userId;

  await db
    .collection("board")
    .updateOne({ _id: ObjectId(boardId) }, { $pull: { hateThis: userId } });
  res.send("성공");
});

app.post(`/insertVoteData`, (req, res) => {
  const votedDate = req.body.voteDate;
  const voteTitle = req.body.voteTitle;
  const voteTextBoxArr = req.body.voteTextBoxArr;
  const voteCheckBoxArr = req.body.voteCheckBoxArr;

  db.collection(`vote`).insertOne({
    votedDate: votedDate,
    voteTitle: voteTitle,
    voteTextBoxArr: voteTextBoxArr,
    voteCheckBoxArr: voteCheckBoxArr,
  });
  res.send(`성공`);
});

// voteData전부를 가져와주는 함수
app.get(`/getVoteData`, async (req, res) => {
  const voteData = await db.collection(`vote`).find({}).toArray();

  res.send(voteData);
});

// detail한 voteData를 가져와주는 함수
app.post(`/getDetailVoteData`, async (req, res) => {
  const detailVoteData = await db
    .collection(`vote`)
    .findOne({ _id: ObjectId(req.body._id) });

  res.send(detailVoteData);
});

const insertVoteDetailData = async (
  userId,
  detailVoteId,
  checkedData,
  isAnonymous
) => {
  const detailData = await db.collection(`voteDetail`).findOne({
    detailVoteId: detailVoteId,
  });

  if (detailData === null) {
    // 만약 해당 데이터가 저장된게 없다면?
    const checkData = checkedData.map((item) => (item ? [userId] : []));
    await db.collection(`voteDetail`).insertOne({
      detailVoteId: detailVoteId,
      checkedData: checkData,
      isAnonymous: isAnonymous,
    });
    // 새롭게 데이터를 추가해준다 이때 checkedData에 userId를 넣어준다.
  } else if (detailData !== null) {
    // 만약 해당 데이터가 저장된게 있다면?
    for (let i = 0; i < checkedData.length; i++) {
      if (checkedData[i]) {
        //만약 true를 반환했다면?
        detailData.checkedData[i].push(userId);
      }
    }

    await db.collection(`voteDetail`).updateOne(
      {
        detailVoteId: detailVoteId,
      },
      { $set: { checkedData: detailData.checkedData } }
    );
    // 기존의 배열에 해당 UserId를 추가해서 업데이트해준다.
  }
};

app.post(`/insertVoteDetailData`, async (req, res) => {
  const userId = req.body.userId;
  //이게 한 사람만 되도록 이름 그냥 넣기
  const detailVoteId = req.body.detailVoteId;
  const checkedData = req.body.checkedData;
  const isAnonymous = req.body.isAnonymous;

  try {
    await insertVoteDetailData(userId, detailVoteId, checkedData, isAnonymous);
    res.send("성공");
  } catch (error) {
    throw new Error(error);
  }
});

app.post(`/getVoteRecord`, async (req, res) => {
  const voteId = req.body._id;
  const voteRecord = await db
    .collection(`voteDetail`)
    .findOne({ detailVoteId: voteId });

  res.send(voteRecord);

  //처음 만든경우 아무것도 찾지못하니까 null에 대한 처리를 해주어야한다.
});

app.post(`/cancelVote`, async (req, res) => {
  const detailVoteId = req.body.detailVoteId;
  const userId = req.body.userId;

  const voteDetail = await db
    .collection("voteDetail")
    .findOne({ detailVoteId: detailVoteId });
  const voteResult = await voteDetail.checkedData;
  for (let i = 0; i < voteResult.length; i++) {
    if (voteResult[i].indexOf(userId) !== undefined) {
      //만약있으면
      voteResult[i].splice(voteResult[i].indexOf(userId), 1);
    }
  }
  await db
    .collection(`voteDetail`)
    .updateOne(
      { detailVoteId: detailVoteId },
      { $set: { checkedData: voteResult } }
    );
});

app.post(`/getUserDetailInfo`, async (req, res) => {
  const userId = req.body.userId;

  const haveUserDetailInfo = await db
    .collection("userDetailInfo")
    .findOne({ userId: userId });
  //있으면 true 없으면 false를 반환

  haveUserDetailInfo === null ? res.send(false) : res.send(true);
});

app.post(`/insertUserDetailInfo`, async (req, res) => {
  const nickName = req.body.nickName;
  const backNum = req.body.backNum;
  const positionNum = req.body.positionNum;
  const userId = req.body.userId;

  try {
    await db.collection("userDetailInfo").insertOne({
      userId: userId,
      nickName: nickName,
      backNum: backNum,
      positionNum: positionNum,
    });

    res.send("성공");
  } catch (error) {
    throw new Error("데이터 전송에 실패하였습니다.");
  }
});

app.post(`/insertBoardRepleValue`, async (req, res) => {
  const userId = req.body.userId;
  const componentId = req.body.componentId;
  const repleValue = req.body.repleValue;
  const currentTime = req.body.currentTime;
  await db.collection(`boardReple`).insertOne({
    userId: userId,
    componentId: componentId,
    repleValue: repleValue,
    currentTime: currentTime,
  });
  res.send(`성공`);
});

app.post(`/getBoardRepleValue`, async (req, res) => {
  const componentId = req.body.componentId;

  const repleValueArr = await db
    .collection(`boardReple`)
    .find({ componentId: componentId })
    .toArray();

  res.send(repleValueArr);
});

app.post(`/insertVoteRepleValue`, async (req, res) => {
  const userId = req.body.userId;
  const componentId = req.body.componentId;
  const repleValue = req.body.repleValue;
  const currentTime = req.body.currentTime;
  await db.collection(`boardReple`).insertOne({
    userId: userId,
    componentId: componentId,
    repleValue: repleValue,
    currentTime: currentTime,
  });
  res.send(`성공`);
});

app.post(`/getVoteRepleValue`, async (req, res) => {
  const componentId = req.body.componentId;

  const repleValueArr = await db
    .collection(`boardReple`)
    .find({ componentId: componentId })
    .toArray();

  res.send(repleValueArr);
});
