import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register, Login } from "./page/auth";
import { Dashboard } from "./page/dashboard";
import { AuthProvider } from "./context/Auth";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route index element={<Dashboard />} />
          <Route path='*' element={<>Not Found 404</>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
