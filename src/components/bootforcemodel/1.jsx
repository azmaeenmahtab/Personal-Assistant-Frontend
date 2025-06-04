import '../../style/1.css';
import Button from '@mui/material/Button';
import { Plan1 } from './plan1';
import { useNavigate } from 'react-router-dom';


const Assistant = () => {
    const navigate = useNavigate();


    const clickHandler = () => {

        navigate('/plan1');
    }


    return (
        <div>
            <div style={{display:'flex', gap:'20px'}}>
                <div className="card">
                    <div className="budget-header">
                    <h4>Estimated Monthly Budget</h4>
                </div>
                <div className="budget-display">
                    <p>0</p><p>BDT</p>
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
        <br /><br />
        <div>
                <Button variant="contained" style={{backgroundColor:'#1A57FF', color:'white'}} onClick={clickHandler}>
                    Get Plan for Full Month
                </Button>
        </div>
    </div>
    )

}
export {Assistant};