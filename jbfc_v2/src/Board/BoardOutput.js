export default function BoardOutput({ boardData }) {
  return (
    <div>
      {boardData.map((data, _) => (
        <div key={data._id}>
          <h3 key={data._id}>{data.title}</h3>
          <p>{data.text}</p>
          <span>{data.userId}</span>
          <hr />
        </div>
      ))}
    </div>
  );
}
