import { BrowserRouter, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Test from "./pages/Test";
import { getUserAction } from "./modules/user";
function App() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userReducer);

    useEffect(() => {
        const GetAuth = async () => {
            if (!user) {
                try {
                    await dispatch(getUserAction());
                } catch (err) {
                    console.log(err);
                }
            }
        };
        GetAuth();
    }, []);
    return (
        <BrowserRouter>
            <Route path="/" component={Main} exact />
            <Route path="/login" component={Login} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/socket" component={Test} />
        </BrowserRouter>
    );
}

export default App;
