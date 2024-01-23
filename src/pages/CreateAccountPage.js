import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const CreateAccountPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const createAccount = async () => {
        try {
            if (password !== confirmpassword) {
                setError("Password and confirm password do not match");
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
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirm password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={createAccount}>Create Account</button>
            <Link to="/login">Already have an account? Log In here.</Link>
        </>
    );
};

export default CreateAccountPage;
