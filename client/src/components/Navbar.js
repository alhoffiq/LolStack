import { Link } from 'react-router-dom';
import useAuth from '../hooks/auth';

const Navbar = () => {
    const { isLoggedIn, logout, getProfile } = useAuth();
    return (
        <div>
            <nav class="bg-indigo-700 shadow-lg">
                <div class="container mx-auto">
                    <div class="sm:flex justify-center">
                        <a href="/About" class="text-white text-3xl font-bold p-3">LoL stack</a>
                        <ul class="text-gray-400 sm:self-center text-xl border-t sm:border-none">

                            <li class="sm:inline-block"><Link to="/" class="p-3 hover: text-white">Home</Link></li>
                            <li class="sm:inline-block"><Link to='/summoners' class="p-3 hover: text-white">Summoner</Link></li>
                            {isLoggedIn() ?
                                <>
                                    <li class="sm:inline-block">Hello, {getProfile().email}</li>
                                    <li class="sm:inline-block"><Link onClick={() => logout()} to='/' class="p-3 hover: text-white">Logout</Link></li>
                                </>
                                :
                                <>
                                    <li class="sm:inline-block"><Link to="/signup" class="p-3 hover: text-white">Signup</Link></li>
                                    <li class="sm:inline-block"><Link to="/login" class="p-3 hover: text-white">Login</Link></li>
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