import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function Dashboard () {

    const Navigate = useNavigate();

    const [name, setName] = useState('John');


    const clickHandler = () => {

        Navigate('/assistant');


}






return <div>

<h4 style={{display:'flex', justifyContent:'center', alignItems:'center', fontSize:'20px', fontWeight:'bold', gap:'10px'}}>Hello <p>{name}</p> ! </h4>
<br />
<Button variant="contained" color="primary" onClick={clickHandler}>Your Persoanl ASSISTANT </Button>
        
</div>
}

export {Dashboard};