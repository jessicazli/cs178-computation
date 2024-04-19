
// Filename - "./components/Navbar.js
 
import React from "react";
import { Nav, NavLink, NavMenu } from "./index";
 
const Navbar = () => {
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
                    <NavLink to="/profile" activeStyle>
                        Profile
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;