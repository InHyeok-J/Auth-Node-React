import { BrowserRouter, Route } from "react-router-dom";
import KakaoRedirectHandler from "./components/KakaoRedirectHandler";
import LoginPage from "./pages/Login";
import MainPage from "./pages/Main";

function App() {
    return (
        <BrowserRouter>
            <Route path="/" component={MainPage} exact />
            <Route path="/login" component={LoginPage} exact />
            <Route
                path="/api/auth/kakao-callback"
                component={KakaoRedirectHandler}
            />
        </BrowserRouter>
    );
}

export default App;
