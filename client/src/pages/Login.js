import { useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../hooks/auth';

const Login = () => {
    const { login, isLoggedIn } = useAuth();
    // History and location are hooks we can use to manipulate our page's history!
    const history = useHistory();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // For our redirector
    const [redirectToSignup, toggleRedirect] = useState(false);
    // This is the key part to our redirector. We can pull the prior location out here, if it exists
    const { from } = location.state || { from: { pathname: '/' } };

    const handleSubmit = event => {
        event.preventDefault();
        login(email, password).then(res => {
            history.replace(from);
        });
    };

    if (isLoggedIn()) {
        return <Redirect to={location.state || '/'} />;
    }

    if (redirectToSignup) {
        return <Redirect to={{
            // If someone goes to signup, this transfers the redirect
            pathname: '/signup',
            state: { from: from }
        }}
        />;
    }

    return (
        <div className="card text-white mb-3">
            <div className="card-body"></div>
            <div className='row justify-content-center'>
                <div className='col-4'>
                    <h2>Welcome to LolStack!</h2>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='col'>
                    <label htmlFor='email'>Email: </label>
                    <input
                        name='email'
                        type='email'
                        autoComplete='username'
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                </div>
                <br />
                <div className='col'>
                    <label htmlFor='password'>Password:</label>
                    <input
                        name='password'
                        type='password'
                        autoComplete='password'
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </div>
                <br />
                <button type='submit' className='btn btn-dark'>Login</button>
            </form>
            <br />
            <div className='row'>
                <div className='col'>
                    <p>
                        Need an account? <button type='submit' className='btn btn-dark' onClick={() => toggleRedirect(true)}>Signup here</button>
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Login;