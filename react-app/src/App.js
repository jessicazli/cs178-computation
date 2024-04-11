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
 
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route
                    path="/sign-up"
                    element={<SignUp />}
                />
            </Routes>
        </Router>
    );
}
 
export default App;
