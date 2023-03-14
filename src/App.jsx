import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register, Login } from "./page/auth";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<>Not Found 404</>} />
      </Routes>
    </BrowserRouter>
  );
}
