import React from "react";
//import Navbar from "./components/Navbar";
import Navbar from "./components/Navbar/NavbarElements";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Cabinet from "./pages/cabinet";
 
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route
                    path="/cabinet"
                    element={<Cabinet />}
                />
                <Route
                    path="/sign-up"
                    element={<SignUp />}
                />
                <Route
                    path="/profile"
                    element={<Profile />}
                />
            </Routes>
        </Router>
    );
}
 
global.UserID = "";
export default App;
