import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const clickHandler = async () => {
        const body = {
            "email": email,
            "password": password
        }

        try {
            const response = await fetch("http://localhost:6543/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Something went wrong in fetching");
            }

            const data  = await response.json();
            const token = data.token;
            localStorage.setItem("token", token);

            alert("Login successful");
            setEmail("");
            setPassword("");
            navigate("/assistant");
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <TextField 
                    id="outlined-basic" 
                    label="Email" 
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField 
                    id="outlined-basic" 
                    label="Password" 
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <br /><br />
            <div>
                <Button variant="contained" onClick={clickHandler}>Login</Button>
            </div>
        </>
    );
}

export { Login }