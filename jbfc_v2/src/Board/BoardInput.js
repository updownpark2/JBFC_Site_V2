export default function BoardInput({ submitPost }) {
  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
      <form onSubmit={submitPost}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-purple-500"
          />
        </div>
        <div className="mb-4">
          <textarea
            type="textarea"
            placeholder="본문"
            className="w-full p-2 border border-gray-300 rounded-md h-40 focus:outline-none focus:ring focus:border-purple-500"
          />
        </div>
        <button
          className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out"
          type="submit"
        >
          제출
        </button>
      </form>
    </div>
  );
}
