import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register, Login } from "./page/auth";
import { Dashboard } from "./page/dashboard";
import { AuthProvider } from "./context/Auth";
import { ThemeProvider } from "./context/Theme";
import { AddTodo } from "./page/addTodo";
import EditTodo from "./page/editTodo/editTodo";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route index element={<Dashboard />} />
            <Route path='/add' element={<AddTodo />} />
            <Route path='/edit/:id' element={<EditTodo />} />
            <Route path='*' element={<>Not Found 404</>} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
