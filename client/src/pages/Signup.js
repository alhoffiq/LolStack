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
        <body>
            <div className="card text-white mb-3">
                <div className="card-body"></div>
                <div className='row justify-content-center'>
                    <div className='col-4'>
                        <h2>
                            Sign-Up
                        </h2>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='col'>
                        <label htmlFor='email'>Email:</label>
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
                    <div className='col'>
                        <label htmlFor='name'>Summoner Name:</label>
                        <input
                            name='name'
                            type='text'
                            value={name}
                            onChange={event => setName(event.target.value)}
                        />
                        <button type='submit' className='btn btn-dark'>Signup</button>
                    </div>
                </form>
                <br />
                <div className='row'>
                    <div className='col'>
                        <label>Already have an Account?</label>
                        <button type='submit' className='btn btn-dark' onClick={() => toggleRedirect(true)}>Login</button>
                    </div>
                </div>
            </div>
        </body>
    );
};

export default Signup;