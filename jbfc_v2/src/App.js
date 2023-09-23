import Router from "./Router";
import { RecoilRoot } from "recoil";
import "./style.css";
function App() {
  return (
    <>
      <RecoilRoot>
        <Router></Router>
      </RecoilRoot>
    </>
  );
}

export default App;
