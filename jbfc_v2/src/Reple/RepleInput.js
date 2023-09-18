export default function RepleInput({ onSubmitReple }) {
  return (
    <div>
      <h2>Reple input입니다.</h2>
      <form onSubmit={onSubmitReple}>
        <input placeholder="올바른 댓글문화가 필요해요" />
        <button>💬</button>
      </form>
    </div>
  );
}
