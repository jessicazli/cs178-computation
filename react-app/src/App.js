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
import Cabinet from "./pages/cabinet";
import Recipe from "./pages/recipe";
 
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
                    path="/recipe"
                    element={<Recipe />}
                />
            </Routes>
        </Router>
    );
}
 
export default App;
