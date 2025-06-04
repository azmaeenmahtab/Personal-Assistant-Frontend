import '../../style/1.css';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Plan1 = () => {

    const [amount, setAmount] = useState();
    const navigate = useNavigate();

    const clickHandler = async () => {
        try{

            const token =  localStorage.getItem("token");

        const body = {
            "main_budget" : amount
        }

        const response = await fetch("http://localhost:6543/api/main_budget",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        if(!response.ok){
            const errorData = await response.json();
            alert(errorData.message || "Something went wrong in fetching");
            return;
        }
        setAmount("");
        alert("Data saved successfully");
        
        navigate('/plan2');
    }catch(error){
        alert(error.message || "Something went wrong in fetching");
    }
    }

    return (
    <div>
          <div style={{display:'flex', gap:'20px'}}>
                <div className="card">
                    <div className="budget-header">
                    <h4>Estimated Monthly Budget</h4>
                </div>
                <div className="budget-display">
                    <p>{amount}</p><p>BDT</p>
                </div>
                </div>
                <div className="card">
                <div className="budget-header">
                    <h4>Approximate Seat Rental </h4>
                </div>
                <div className="budget-display">
                    <p>0</p><p>BDT</p>
                </div>
                </div>
                <div className="card">
                <div className="budget-header">
                    <h4>Approximate Food Cost </h4>
                </div>
                <div className="budget-display">
                    <p>0</p><p>BDT</p>
                </div>
                </div>
                <div className="card">
                <div className="budget-header">
                    <h4>Approximate Utility Cost </h4>
                </div>
                <div className="budget-display">
                    <p>0</p><p>BDT</p>
                </div>
                 </div>
                <div className="card">
                <div className="budget-header">
                    <h4>Approximate Transport Cost </h4>
                </div>
                <div className="budget-display">
                    <p>0</p><p>BDT</p>
                </div>
                </div>
        </div>
<div>
    <h3>Help Me With Your Known Costs</h3>
</div>

        <br />
        <div>
             <TextField id="outlined-basic" label="Amount" variant="outlined" value={amount} onChange={(e) => setAmount(e.target.value)}/>
        </div>
        <br /><br />
        <div>
            <Button variant="contained" color="primary" onClick={clickHandler}>Next</Button>
        </div>
    </div>
    )
}

export {Plan1}
