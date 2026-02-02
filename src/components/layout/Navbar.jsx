import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                MyApp
            </div>

            <ul className="navbar-links">
                <li>
                    <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/clients" className={({ isActive }) => isActive ? 'active' : ''}>
                        Clients
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/produits" className={({ isActive }) => isActive ? 'active' : ''}>
                        Produits
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/promo-codes" className={({ isActive }) => isActive ? 'active' : ''}>
                        PromoCodes
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
