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
import Cabinet from "./pages/cabinet";
import Recipe from "./pages/recipe";
import Saved from "./pages/saved";
 
function PrivateRoute () {
    const user = sessionStorage.getItem('UserID');
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
                        path="/saved"
                        element={<Saved />}
                    />
                    <Route
                        path="/recipe"
                        element={<Recipe />}
                    />
                </Route>
                
            </Routes>
        </Router>
    );
}
 
export default App;
