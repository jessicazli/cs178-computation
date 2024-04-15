import React from "react";
//import Navbar from "./components/Navbar";
import Navbar from "./components/Navbar/NavbarElements";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
    Navigate
} from "react-router-dom";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Cabinet from "./pages/cabinet";
 
function PrivateRoute () {
    const user = global.UserID;
    return user ? <div>
        <Navbar />
        <Outlet />
    </div> : <Navigate to="/" replace />;
}

function App() {
    return (
        <Router>
            
            <Routes>


                <Route exact path="/" element={<Login />} /> 
                
                <Route
                    path="/sign-up"
                    element={<SignUp />}
                />
                
                <Route element={<PrivateRoute />} >
                    <Route
                        path="/cabinet"
                        element={<Cabinet />}
                    />
                    <Route
                        path="/profile"
                        element={<Profile />}
                    />
                </Route>
                
            </Routes>
        </Router>
    );
}
 
global.UserID = "";
export default App;
