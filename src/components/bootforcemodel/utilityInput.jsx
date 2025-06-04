import '../../style/1.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const UtilityInput = () => {
    const navigate = useNavigate();
    const [utility, setUtility] = useState('');

    const clickHandler = async () => {
        try{
            if(!utility || isNaN(utility)){

                alert("Please enter a valid utility cost.");
                return;
            }


            const token = localStorage.getItem("token");
    
            const body = {
                "utility_cost" : parseFloat(utility)
            };
    
            const response = await fetch("http://localhost:6543/api/utility_budget",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
    
            if(!response.ok){
                const Data = await response.json();
                alert("Error Occured during api call" + data.message);
                
                return;
            }
    
            alert("Utility cost inserted successfully");
    
            setUtility('');
            navigate('/transportInput');
    
        }catch(err){
    
            alert("Internal server error" || err.message);
        }
        
    }

    return (
        <div>
            <div className="card">
                <div className="budget-header">
                    <h4>Approximate Utility Cost </h4>
                </div>
                <div className="budget-display">
                    <p>{utility}</p><p>BDT</p>
                </div>
            </div>
            <br /><br />
            <div>
                <TextField id="outlined-basic" label="Utility Cost" variant="outlined" value={utility} onChange={(e) => 
                    setUtility(e.target.value)
                }/>
            </div>
            <br /><br />
            <div>
                <Button variant="contained" color="primary" onClick={clickHandler}>Next</Button>
            </div>
        </div>
    )
}

export {UtilityInput};
