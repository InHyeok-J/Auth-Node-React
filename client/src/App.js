import { BrowserRouter, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Main} exact />
      <Route path="/login" component={Login} />
      <Route path="/SignUp" component={SignUp} />
    </BrowserRouter>
  );
}

export default App;
