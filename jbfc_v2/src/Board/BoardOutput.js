import { Link } from "react-router-dom";

export default function BoardOutput({ boardData }) {
  return boardData === [] ? (
    <div>데이터 가져오는중</div>
  ) : (
    <div>
      {boardData.map((data, _) => (
        <Link
          key={data._id}
          to={`/boardDetail`}
          state={data._id}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div>
            <h3 key={data._id}>{data.title}</h3>
            <span>{data.userId}</span>
            <hr />
          </div>
        </Link>
      ))}
    </div>
  );
}
