import { useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../hooks/auth';

const Signup = () => {
    const { signup, isLoggedIn } = useAuth();
    // History and location are hooks we can use to manipulate our page's history!
    const history = useHistory();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    // For our redirector
    const [redirectToLogin, toggleRedirect] = useState(false);
    // This is the key part to our redirector. We can pull the prior location out here, if it exists
    const { from } = location.state || { from: { pathname: '/' } };

    const handleSubmit = event => {
        event.preventDefault();
        signup(email, password, name).then(res => {
            // Go back to whence you came!
            history.replace(from);
        });
    };

    if (isLoggedIn()) {
        return <Redirect to={location.state || '/'} />;
    }

    if (redirectToLogin) {
        // If someone goes to login, this transfers the redirect
        return <Redirect to={{
            pathname: '/login',
            state: { from: from }
        }}
        />;
    }

    return (
        <div className='container box'>
            <div className="card text-white mb-3">
                <div className="card-body"></div>
                <div className='row justify-content-center'>
                    <div>
                        <h2>Sign-Up</h2>
                    </div>
                </div>
                <div className='row justify-content-center'>
                    <form onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col'>
                                <div className='row justify-content-center'>
                                    <div>
                                        <label htmlFor='email'>Email:</label>
                                    </div>
                                </div>
                                <div className='row justify-content-center'>
                                    <div>
                                        <input
                                            className='form-control'
                                            name='email'
                                            type='email'
                                            autoComplete='username'
                                            value={email}
                                            onChange={event => setEmail(event.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className='row'>
                            <div className='col'>
                                <div className='row justify-content-center'>
                                    <div>
                                        <label htmlFor='password'>Password:</label>
                                    </div>
                                </div>
                                <div className='row justify-content-center'>
                                    <div>
                                        <input
                                            className='form-control'
                                            name='password'
                                            type='password'
                                            autoComplete='password'
                                            value={password}
                                            onChange={event => setPassword(event.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className='row'>
                            <div className='col'>
                                <div className='row justify-content-center'>
                                    <div>
                                        <label htmlFor='summoner'>Summoner Name:</label>
                                    </div>
                                </div>
                                <div className='row justify-content-center'>
                                    <div>
                                        <input
                                            className='form-control'
                                            name='summoner'
                                            type='text'
                                            value={name}
                                            onChange={event => setName(event.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row justify-content-center'>
                            <button type='submit' className='btn btn-dark'>Signup</button>
                        </div>
                    </form>
                </div>
                <br />
                <div className='row justify-content-center'>
                    <div>
                        <label>Already have an Account?</label>
                        <button type='submit' className='btn btn-dark' onClick={() => toggleRedirect(true)}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;