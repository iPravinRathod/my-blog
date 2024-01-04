import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const CreateAccountPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const createAccount = async () => {
        try {
            if (password !== confirmPassword) {
                setError("password and Confirm Password do not match");
                return;
            }
            await createUserWithEmailAndPassword(getAuth(), email, password);
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
                placeholder="Enter Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Re-Enter Your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={createAccount}>Create Account</button>
            <Link to="/login">Already have an account?Log In here</Link>
        </>
    );
};

export default CreateAccountPage;
