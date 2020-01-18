import React, {Component} from 'react';
import { Link } from "@reach/router"

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;