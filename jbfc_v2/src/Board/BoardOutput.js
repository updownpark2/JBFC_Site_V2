import { Link } from "react-router-dom";

export default function BoardOutput({ boardData }) {
  return (
    <div className="bg-purple-300 p-4">
      {boardData.length === 0 ? (
        <div className="text-center text-purple-600 text-lg">
          데이터 가져오는 중
        </div>
      ) : (
        <div>
          {boardData.map((data) => (
            <Link
              key={data._id}
              to={`/boardDetail`}
              state={{ boardId: data._id }}
              style={{ textDecoration: "none", color: "black" }}
              className="block p-4 m-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
            >
              <div>
                <h3 className="text-2xl font-semibold mb-2">{data.title}</h3>
                <span className="text-purple-700">{data.userId}</span>
                <hr className="my-2" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
