import React from "react";
//import Navbar from "./components/Navbar";
import Navbar from "./components/Navbar/NavbarElements";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet
} from "react-router-dom";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Cabinet from "./pages/cabinet";
 
function AppLayout() {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
        
    )
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
                
                <Route element={<AppLayout />} >
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
