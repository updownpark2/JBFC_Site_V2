import Router from "./Router";
import { RecoilRoot } from "recoil";

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
