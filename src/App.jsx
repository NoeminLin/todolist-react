import './App.scss';
import { TodoPage, LoginPage, SignUpPage, HomePage } from './pages';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="signup" element={<SignUpPage />}></Route>
          <Route path="todo" element={<TodoPage />}></Route>
          <Route path="*" element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
