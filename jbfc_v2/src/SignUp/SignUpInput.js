export default function SignUpInput({ checkDuplicateID }) {
  const checkOnlyOne = (element) => {
    const checkboxes = document.getElementsByName("sex");

    checkboxes.forEach((cb) => {
      cb.checked = false;
    });

    element.target.checked = true;
  };

  return (
    <div>
      <form>
        <input placeholder="ID" />
        <input placeholder="PW" />
        <button onClick={checkDuplicateID}>중복검사</button>
        <br />
        <input type="checkbox" name="sex" value="남" onClick={checkOnlyOne} />남
        <input type="checkbox" name="sex" value="여" onClick={checkOnlyOne} />녀
      </form>
    </div>
  );
}
