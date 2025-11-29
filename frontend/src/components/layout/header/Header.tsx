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
        <div className='Header'>
            <div>logo</div>
            <nav>
                <NavLink to="/feed">Feed</NavLink>
                {role === "admin" && <> | <NavLink to="/reports">Reports</NavLink> </>}
            </nav>
            <div>
                welcome {name} | <button onClick={logout}>logout</button>
            </div>
        </div>
    );
}