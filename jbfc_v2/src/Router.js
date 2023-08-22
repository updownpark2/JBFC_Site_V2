import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home.js";
import SignUpInput from "./SignUp/SignUpInput.js";
import LoginHome from "./Login/LoginHome.js";
import SignUpHome from "./SignUp/SignUpHome.js";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginHome />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/signUp" element={<SignUpHome />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
