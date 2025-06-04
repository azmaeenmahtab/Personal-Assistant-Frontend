import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Plan3 = () => {
    const [foodCost, setFoodCost] = useState('');

    const navigate = useNavigate();

    const clickHandler = async () => {
        try{
        const token = localStorage.getItem("token");

        const body = {
            "food_cost" : foodCost
        };

        const response = await fetch("http://localhost:6543/api/food_budget",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })

        if(!response.ok){
            const errorData = await response.json();
            alert("Error Occured during api call");
            
            return;
        }

        alert("Food cost inserted successfully");

        setFoodCost('');
        navigate('/utilityInput');

    }catch(err){

        alert("Internal server error" || err.message);
    }
}


    return (
        <div>
           <div className="card">
                <div className="budget-header">
                    <h4>Approximate Food Cost </h4>
                </div>
                <div className="budget-display">
                    <p>{foodCost}</p><p>BDT</p>
                </div>
            </div>
            <br /><br />
            <div>
                <TextField id="outlined-basic" label="Food Cost" variant="outlined" value={foodCost} onChange={(e) => setFoodCost(e.target.value)
                    
                }/>
            </div>
            <br /><br />
            <div>
                <Button variant="contained" color="primary" onClick={clickHandler}>Next</Button>
            </div>
        </div>
    )
}

export {Plan3};
