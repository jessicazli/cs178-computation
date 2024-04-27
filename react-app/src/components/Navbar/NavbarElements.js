
// Filename - "./components/Navbar.js
 
import React from "react";
import { Nav, NavLink, NavMenu } from "./index";
import { useNavigate } from "react-router-dom";
import { auth } from '../../config/Firebase';
import { signOut } from "firebase/auth";


function Navbar() {

    let navigate = useNavigate();

    async function handleLogout() {
        signOut(auth).then(() => {
            // Sign-out successful.

            // Storing data in SessionStorage
            sessionStorage.setItem("UserID", "");
            // Redirect to another page
            navigate("/");
        }).catch((error) => {
            // An error happened.
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
        });
    }

    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/cabinet" activeStyle>
                        My Pantry
                    </NavLink>
                    <NavLink to="/recipe" activeStyle>
                        Find a Recipe
                    </NavLink>
                    <NavLink to="/saved" activeStyle>
                        My Cookbook
                    </NavLink>
                </NavMenu>
                <>
                    <button onClick={() => {
                        handleLogout(); alert("Logged Out!")
                    }}>
                        Log Out
                    </button>
                </>
            </Nav>
        </>
    );
};
// const Navbar = () => {
//     return (
//         <>
//             <Nav>
//                 <NavMenu>
//                     <NavLink to="/cabinet" activeStyle>
//                         My Pantry
//                     </NavLink>
//                     <NavLink to="/recipe" activeStyle>
//                         Find a Recipe
//                     </NavLink>
//                     <NavLink to="/saved" activeStyle>
//                         My Cookbook
//                     </NavLink>
//                 </NavMenu>
//                 <>
//                     <button>
//                         Log out
//                     </button>
//                 </>
//             </Nav>
//         </>
//     );
// };
 
export default Navbar;