import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [submitted, setSubmitted] = useState(false); // State to track if data is submitted

  function handleSignup(e) {
    e.preventDefault(); 
    if (validateForm()) {
        // Store data in localStorage
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);

        
        const storedEmail = localStorage.getItem("email");
        const storedPassword = localStorage.getItem("password");
        
        // Log the retrieved data
        console.log(storedEmail);
        console.log(storedPassword);

        // Set submitted to true
        setSubmitted(true);
        navigate('/login');
        
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (name.trim()) {
      errorsCopy.name = '';
    } else {
      errorsCopy.name = 'Name is required';
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = '';
    } else {
      errorsCopy.email = 'Email is required';
      valid = false;
    }

    if (password.trim()) {
      errorsCopy.password = '';
    } else {
      errorsCopy.password = 'Password is required';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function login() {
    navigate('/login');
  }

  return (
    <div className="container">
        {submitted && <div className="alert alert-success mt-3" role="alert">Data sign-up successfully!</div>}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Sign Up</h2>
              <form onSubmit={handleSignup}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" className="form-control" id="name" aria-describedby="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                  {errors.name && <small className="text-danger">{errors.name}</small>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input type="email" className="form-control" id="email" aria-describedby="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  {errors.email && <small className="text-danger">{errors.email}</small>}
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
                  <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                  <button type="button" className="btn btn-primary mb-2" onClick={login}>Login</button>
                </div>
               
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
