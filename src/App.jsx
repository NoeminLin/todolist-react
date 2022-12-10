import './App.scss';
import { TodoPage, LoginPage, SignUpPage, HomePage } from './pages';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from 'contexts/AuthContext';

const basename = process.env.PUBLIC_URL;

function App() {
  return (
    <div className="app">
      <BrowserRouter basename={basename}>
        <AuthProvider>
          <Routes>
            <Route path="login" element={<LoginPage />}></Route>
            <Route path="signup" element={<SignUpPage />}></Route>
            <Route path="todos" element={<TodoPage />}></Route>
            <Route path="*" element={<HomePage />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;