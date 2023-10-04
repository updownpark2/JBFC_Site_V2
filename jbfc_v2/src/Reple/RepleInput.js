export default function RepleInput({ onSubmitReple }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">댓글 input입니다.</h2>
      <form onSubmit={onSubmitReple}>
        <input
          placeholder="올바른 댓글문화가 필요해요"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-purple-500"
        />
        <button
          className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out"
          type="submit"
        >
          💬
        </button>
      </form>
    </div>
  );
}
