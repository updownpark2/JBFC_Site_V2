export default function LoginInput({ onSubmit }) {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input placeholder="ID" />
        <input placeholder="PW" />
        <button>제출</button>
      </form>
    </div>
  );
}
