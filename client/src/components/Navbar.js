import { Link } from 'react-router-dom';
import useAuth from '../hooks/auth';
const Navbar = () => {
    const { isLoggedIn, logout, getProfile } = useAuth();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <h1 className="navbar-brand">LOL Stack</h1>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <li><Link to="/" className="nav-link">Home</Link></li>
                        <li><Link to='/summoners' className="nav-link">Summoner</Link></li>
                        {isLoggedIn() ?
                            <>
                                <li>Hello, {getProfile().name}</li>
                                <li><Link onClick={() => logout()} to='/' className="nav-link">Logout</Link></li>
                            </>
                            :
                            <>
                                <li><Link to="/signup" className="nav-link">Signup</Link></li>
                                <li><Link to="/login" className="nav-link">Login</Link></li>
                            </>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
    //     <div>
    //         <nav className="bg-indigo-700 shadow-lg">
    //             <div className="container mx-auto">
    //                 <div className="sm:flex justify-center">
    //                     <a href="/About" className="text-white text-3xl font-bold p-3">LoL stack</a>
    //                     <ul className="text-gray-400 sm:self-center text-xl border-t sm:border-none">

    //                         <li className="sm:inline-block"><Link to="/" className="p-3 hover: text-white">Home</Link></li>
    //                         <li className="sm:inline-block"><Link to='/summoners' className="p-3 hover: text-white">Summoner</Link></li>
    //                         {isLoggedIn() ?
    //                             <>
    //                                 <li className="sm:inline-block">Hello, {getProfile().name}</li>
    //                                 <li className="sm:inline-block"><Link onClick={() => logout()} to='/' className="p-3 hover: text-white">Logout</Link></li>
    //                             </>
    //                             :
    //                             <>
    //                                 <li className="sm:inline-block"><Link to="/signup" className="p-3 hover: text-white">Signup</Link></li>
    //                                 <li className="sm:inline-block"><Link to="/login" className="p-3 hover: text-white">Login</Link></li>
    //                             </>
    //                         }
    //                     </ul>
    //                 </div>
    //             </div>
    //         </nav>
    //     </div>
    // );
};
export default Navbar;