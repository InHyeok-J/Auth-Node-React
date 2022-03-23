import { BrowserRouter, Route } from "react-router-dom";
import KakaoRedirectHandler from "./components/KakaoRedirectHandler";
import LoginPage from "./pages/Login";
import LoginKakaoPage from "./pages/LoginKakao";
import MainPage from "./pages/Main";

function App() {
    return (
        <BrowserRouter>
            <Route path="/" component={MainPage} exact />
            <Route path="/login" component={LoginPage} exact />
            <Route path="/login-kakao" component={LoginKakaoPage} exact />
            <Route path="/oauth/redirect" component={KakaoRedirectHandler} />
        </BrowserRouter>
    );
}

export default App;
