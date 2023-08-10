import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register, Login } from "./page/auth";
import { Dashboard } from "./page/dashboard";
import { AuthProvider } from "./context/Auth";
import { ThemeProvider } from "./context/Theme";
import { AddTodo } from "./page/addTodo";
import { EditTodo } from "./page/editTodo";
import Layout from "./page/layout/Layout";
import { FilterProvider } from "./context/Filter";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <FilterProvider>
            <Routes>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/' element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path='add' element={<AddTodo />} />
                <Route path='/edit/:id' element={<EditTodo />} />
              </Route>
              <Route path='*' element={<>Not Found 404</>} />
            </Routes>
          </FilterProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
