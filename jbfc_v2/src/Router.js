import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home.js";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
