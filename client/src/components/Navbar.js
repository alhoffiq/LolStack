const Navbar = () => {
    // const { isLoggedIn, logout, getProfile } = useAuth();
    return (
        <div>
            <nav class="bg-indigo-700 shadow-lg">
                <div class="container mx-auto">
                    <div class="sm:flex justify-center">
                        <a href="/About" class="text-white text-3xl font-bold p-3">LoL stack</a>
                        <ul class="text-gray-400 sm:self-center text-xl border-t sm:border-none">
                            
                            <li class="sm:inline-block">
                                <a href="/Home" class="p-3 hover: text-white">Home</a>
                            </li>
                            
                            <li class="sm:inline-block">
                                <a href="/Summoner" class="p-3 hover: text-white">Summoner</a>
                            </li>
                            
                            <li class="sm:inline-block">
                                <a href="/Signup" class="p-3 hover: text-white">Signup</a>
                            </li>
                            
                            <li class="sm:inline-block">
                                <a href="/Login" class="p-3 hover: text-white">Login</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>


            {/* <h3>Navbar</h3>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to='/summoners'>Summoner</Link></li>
                {isLoggedIn() ?
                    <>
                        <li>Hello, {getProfile().email}</li>
                        <li><Link onClick={() => logout()} to='/'>Logout</Link></li>
                    </>
                    :
                    <>
                        <li><Link to="/signup">Signup</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                }

            </ul> */}
        </div>
    );
};

export default Navbar;