export default function LoginInput({ onSubmit }) {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input placeholder="ID" maxLength="10" />
        <input placeholder="PW" maxLength="15" />
        <button>제출</button>
      </form>
    </div>
  );
}
