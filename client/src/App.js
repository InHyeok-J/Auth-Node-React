import { BrowserRouter, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Channel from "./pages/Channel";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { userCheckAction } from "./modules/user";
function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userCheckAction());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Route path="/" component={Main} exact />
            <Route path="/login" component={Login} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/channel" component={Channel} />
        </BrowserRouter>
    );
}

export default App;
