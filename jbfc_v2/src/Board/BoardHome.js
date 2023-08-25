import BoardInput from "./BoardInput";

export default function BoardHome() {
  const submitPost = (event) => {
    event.preventDefault();
    console.dir(event.target);
  };
  return (
    <div>
      <h1>게시판!</h1>
      <BoardInput submitPost={submitPost} />
    </div>
  );
}
