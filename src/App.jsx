import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./page/auth/Register";

export default function App() {
    return <BrowserRouter>
    <Routes>
<Route path='/register' element={<Register/>} /> 
<Route path='*' element={<>Not Found 404</>} />
    </Routes>
    </BrowserRouter>;
}