import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home.js";
import SignUpInput from "./SignUp/SignUpInput.js";
import LoginHome from "./Login/LoginHome.js";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginHome />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route Path="/signUp" element={<SignUpInput />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
