import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Assistant } from './bootforcemodel/1';

function Register () {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const clickHandler = async () => {

    if(password !== confirmPassword){
        alert("Password and Confirm Password do not match");
        return;
    }

const body = {
    "name": name,
    "email": email,
    "phone": phone,
    "password": password

}

const response = await fetch("http://localhost:6543/api/register",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body: JSON.stringify(body)
});

if(!response.ok){

    const error = await response.json();
    throw Error(error.message || "something went wrong in fetching");
    
}

const data = await response.json();
console.log(data);
alert("Signup successfully");

setName("");
setEmail("");
setPhone("");
setPassword("");
setConfirmPassword("");

Navigate('/login');

}

    return <div>
<div style={{display:'flex' , flexDirection:'column', gap:'10px'}}>
<TextField id="outlined-basic" label="Name" value={name} onChange={(e) => setName(e.target.value)} variant="outlined" />
<TextField id="outlined-basic" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} variant="outlined" />
<TextField id="outlined-basic" label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} variant="outlined" />
<TextField id="outlined-basic" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} variant="outlined" />
<TextField id="outlined-basic" label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} variant="outlined" />


</div>
<Button variant="contained" color="primary" onClick={clickHandler}>Register</Button>
    </div>
}

export {Register};