import { Link } from 'react-router-dom';
import useAuth from '../hooks/auth';

const Navbar = () => {
    const { isLoggedIn, logout, getProfile } = useAuth();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid nv">
                <h1 className="navbar-brand top">LoLStack</h1>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav container row nv">
                        <div className='col-1'>
                            <li><Link to="/" className="nav-link text-center">Home</Link></li>
                        </div>
                        {isLoggedIn() ?
                            <>
                                <div className='col-1'>
                                    <li><Link to='/summoners' className="nav-link text-center">Summoner</Link></li>
                                </div>
                                <div className='col-1'>
                                    <li><Link onClick={() => logout()} to='/' className="nav-link text-center">Logout</Link></li>
                                </div>
                                <div className='col-9'>
                                    <li><h5 className='text-right' id="name">{getProfile().name}</h5></li>
                                </div>
                            </>
                            :
                            <>
                                <div className='col-1'>
                                    <li><Link to="/signup" className="nav-link text-center">Signup</Link></li>
                                </div>
                                <div className='col-1'>
                                    <li><Link to="/login" className="nav-link text-center">Login</Link></li>
                                </div>
                                <div className='col-9'></div>
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