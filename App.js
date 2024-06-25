import React, { useState } from 'react';
import './App.css'; 

function App() {
  const [username, setUsername] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [registeredPassword, setRegisteredPassword] = useState(''); 
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(false); 
  const [passwordValid, setPasswordValid] = useState(true);
  const [signupSuccess, setSignupSuccess] = useState(false); 
  const [loginSuccess, setLoginSuccess] = useState(false);

  const validatePassword = () => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/;
    return regex.test(password);
  };

  const handleLogin = () => {
   
    if (username && password) {
      if (password === registeredPassword) {
        setLoggedIn(true);
        setLoginSuccess(true);
        setSignupSuccess(false); 
      } else {
        alert('Incorrect password.');
      }
    } else {
      alert('Please enter username and password.');
    }
  };

  const handleSignup = () => {
  
    if (!validatePassword()) {
      setPasswordValid(false);
      return;
    }
 
    setRegisteredPassword(password); 
    setSignupSuccess(true);
    setLoginSuccess(false); 
    
    setUsername('');
    setMobileNumber('');
    setGender('');
    setPassword('');
  
    setIsLoginForm(true);
  };

  return (
    <div className={`App ${loggedIn ? 'logged-in' : ''}`}>
      <div className="container">
        {loggedIn ? (
          <div>
            <h2>Welcome, {username}!</h2>
            <p>Username: {username}</p>
            <button onClick={() => setLoggedIn(false)}>Logout</button>
          </div>
        ) : (
          <div>
            <h1>Recruitment Portal</h1>
            {signupSuccess && <p className="success-message">Account created successfully! Redirecting to login page...</p>}
            {loginSuccess && <p className="success-message">Logged in successfully!</p>}
            {!isLoginForm ? (
              <>
                <h2>Signup</h2>
                <input
                  type="text"
                  placeholder="Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Mobile Number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!passwordValid && (
                  <p className="error-message">Password must include at least one uppercase letter, one lowercase letter, one numeric digit, one special character (!@#$%^&*), and have a minimum length of 8 characters.</p>
                )}
                <button onClick={handleSignup}>Signup</button>
                <button onClick={() => setIsLoginForm(true)}>Switch to Login</button>
              </>
            ) : (
              <>
                <h2>Login</h2>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
                <button onClick={() => setIsLoginForm(false)}>Switch to Signup</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
