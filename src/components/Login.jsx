import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });
    const [loginSuccess, setLoginSuccess] = useState(false); // State to track login success

    function validateForm() {
        let valid = true;
        const errorsCopy = { email: '', password: '' };

        if (!email.trim()) {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        if (!password.trim()) {
            errorsCopy.password = 'Password is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function handleLogin(e) {
        e.preventDefault(); 
        if (validateForm()) {
            const storedEmail = localStorage.getItem("email");
            const storedPassword = localStorage.getItem("password");
        
            if (email === storedEmail && password === storedPassword) {
                setLoginSuccess(true); // Set login success to true
                navigate('/login'); // Navigate to home page or any other page after successful login
            } else {
                alert('Incorrect email or password. Please try again.');
            }
        }
    }

    function handleSignup() {
        navigate('/'); // Navigate to signup page
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Login</h2>
                            {loginSuccess && (
                                <div className="alert alert-success" role="alert">
                                    Login successful!
                                </div>
                            )}
                            <form onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input type="email" className="form-control" id="email" aria-describedby="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    {errors.email && <small className="text-danger">{errors.email}</small>}
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    {errors.password && <small className="text-danger">{errors.password}</small>}
                                </div>
                                <div className="form-group form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                                    <button type='button' className="btn btn-primary mb-2" onClick={handleSignup}>Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
