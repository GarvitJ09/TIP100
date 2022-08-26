import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Auth from "./Components/Auth";
import Home from "./Components/Home";
import Tippers from "./Components/Tippers";
import Tips from "./Components/Tips";
import CreateAlert from "./Components/CreateAlert";
import Sidebar from "./Components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./Components/store";
import { useEffect } from "react";
import Alerts from "./Components/Alerts";
import { AlertDetails } from "./Components/AlertDetails";
import { TipDetails } from "./Components/TipDetails";
import { TipperDetails } from "./Components/TipperDetails";
function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <div className="App">
      {!isLoggedIn && <Auth />}
      <main>
        <Routes>
          {isLoggedIn && (
            <>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/auth" element={<Auth />}></Route>
              <Route exact path="/tippers" element={<Tippers />}></Route>
              <Route exact path="/tips" element={<Tips />}></Route>
              <Route exact path="/alerts" element={<Alerts />}></Route>
              <Route
                exact
                path="/alerts/:id"
                element={<AlertDetails />}
              ></Route>
              <Route exact path="/tips/:id" element={<TipDetails />}></Route>
              <Route
                exact
                path="/createalert"
                element={<CreateAlert />}
              ></Route>
              <Route
                exact
                path="/tippers/:id"
                element={<TipperDetails />}
              ></Route>
            </>
          )}
        </Routes>
      </main>
    </div>
  );
}

export default App;
