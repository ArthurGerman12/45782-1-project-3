import { BrowserRouter } from 'react-router-dom';
import Layout from '../layout/layout/Layout';
import './App.css';
import store from '../../redux/store';
import { Provider as Redux } from 'react-redux';
import Auth from '../auth/auth/Auth';
import UserProvider from '../../contexts/UserProvider';
// import SocketDispatcher from '../socket.io/SocketDispatcher';

function App() {

    return (
        <BrowserRouter>
            <Auth>
                <Redux store={store}>
                    <UserProvider>
                        <Layout />
                    </UserProvider>
                    
                </Redux>
            </Auth>
        </BrowserRouter>
    );
}

export default App;
