import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Main from '../main/Main';
import './Layout.css';
import Login from '../../auth/login/Login';
import SignUp from '../../auth/signup/signup';
import AuthContext from '../../auth/auth/AuthContext';


export default function Layout() {

    const authContext = useContext(AuthContext);


    const isLoggedIn = !!authContext?.jwt;

    if (!isLoggedIn) {
        return (
            <div className='Layout'>
                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="*" element={<Login />} />
                </Routes>
            </div>
        );
    }

    return (
        <div className='Layout'>
            <header>
                <Header />
            </header>
            <main>
                <Main />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}
