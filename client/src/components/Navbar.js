import { Link } from 'react-router-dom';
import useAuth from '../hooks/auth';

const Navbar = () => {
    const { isLoggedIn, logout, getProfile } = useAuth();
    return (
        <div>
            <nav className="bg-indigo-700 shadow-lg">
                <div className="container mx-auto">
                    <div className="sm:flex justify-center">
                        <a href="/About" className="text-white text-3xl font-bold p-3">LoL stack</a>
                        <ul className="text-gray-400 sm:self-center text-xl border-t sm:border-none">

                            <li className="sm:inline-block"><Link to="/" className="p-3 hover: text-white">Home</Link></li>
                            <li className="sm:inline-block"><Link to='/summoners' className="p-3 hover: text-white">Summoner</Link></li>
                            {isLoggedIn() ?
                                <>
                                    <li className="sm:inline-block">Hello, {getProfile().name}</li>
                                    <li className="sm:inline-block"><Link onClick={() => logout()} to='/' className="p-3 hover: text-white">Logout</Link></li>
                                </>
                                :
                                <>
                                    <li className="sm:inline-block"><Link to="/signup" className="p-3 hover: text-white">Signup</Link></li>
                                    <li className="sm:inline-block"><Link to="/login" className="p-3 hover: text-white">Login</Link></li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;