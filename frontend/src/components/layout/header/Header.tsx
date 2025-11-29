import { NavLink } from 'react-router-dom';
import './Header.css';
import { useContext } from 'react';
import AuthContext from '../../auth/auth/AuthContext';
import useUserName from '../../hooks/use-username';
import useUserRole from '../../hooks/use-user-role';





export default function Header() {
    const authContext = useContext(AuthContext);
    const name = useUserName();
    
    function logout() {
        authContext?.newJwt('');
    }
    
    const role = useUserRole();

    return (
        <header className='Header'>
            <div className="brand">
                <span className="brand-logo">VACATION!</span>
                <span className="brand-tagline">Escape the ordinary</span>
            </div>

            <nav className="nav-links">
                <NavLink to="/feed">Feed</NavLink>
                {role === "admin" && (
                    <>
                        <NavLink to="/reports">Reports</NavLink>
                        <NavLink to="/new-vacation">New Vacation</NavLink>
                    </>
                )}
            </nav>

            <div className="user-controls">
                <span className="user-greeting">Welcome, {name}</span>
                <button className="logout-btn" onClick={logout}>Logout</button>
            </div>
        </header>
    );
}
