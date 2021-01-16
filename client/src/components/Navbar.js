import { Link } from 'react-router-dom';
import useAuth from '../hooks/auth';

const Navbar = () => {
    const { isLoggedIn, logout, getProfile } = useAuth();
    console.log(getProfile());
    return (
        <div>
            <h3>Navbar</h3>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to='/summoners'>Summoner</Link></li>
                {isLoggedIn() ?
                    <>
                        <li>Hello, {getProfile().name}</li>
                        <li><Link onClick={() => logout()} to='/'>Logout</Link></li>
                    </>
                    :
                    <>
                        <li><Link to="/signup">Signup</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                }

            </ul>
        </div>
    );
};

export default Navbar;