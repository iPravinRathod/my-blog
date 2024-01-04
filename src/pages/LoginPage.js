import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const LogIn = async () => {
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate("/articles");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <h1>Log In</h1>
            {error && <p className="error">{error}</p>}
            <input
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Enter Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={LogIn}>Log In</button>
            <Link to="/create-account">
                Don't have an account?Create one here
            </Link>
        </>
    );
};

export default LoginPage;
