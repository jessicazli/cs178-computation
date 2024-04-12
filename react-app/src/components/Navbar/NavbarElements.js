
// Filename - "./components/Navbar.js
 
import React from "react";
import { Nav, NavLink, NavMenu } from "./index";
 
const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/cabinet" activeStyle>
                        My Cabinet
                    </NavLink>
                    <NavLink to="/recipe" activeStyle>
                        Find a Recipe
                    </NavLink>
                    <NavLink to="/saved" activeStyle>
                        Saved
                    </NavLink>
                    <NavLink to="/profile" activeStyle>
                        Profile
                    </NavLink>
                    <NavLink to="/sign-up" activeStyle>
                        Sign Up
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;