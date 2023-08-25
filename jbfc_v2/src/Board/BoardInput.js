export default function BoardInput({ submitPost }) {
  return (
    <div>
      <form onSubmit={submitPost}>
        <input type="text" placeholder="제목을 입력해주세요" />
        <textarea type="textarea" placeholder="본문" />
        <button>제출</button>
      </form>
    </div>
  );
}
