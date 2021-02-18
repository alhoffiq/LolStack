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
                                    <li><Link to='/search' className="nav-link text-center">Search</Link></li>
                                </div>
                                <div className='col-1'>
                                    <li><Link onClick={() => logout()} to='/' className="nav-link text-center">Logout</Link></li>
                                </div>
                                <div className='col-8'>
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
};
export default Navbar;