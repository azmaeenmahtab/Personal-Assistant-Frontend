import '../../style/1.css';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Comparison = () => {
  const [main_budget, setMainBudget] = useState(0);
  const [food_budget, setFoodBudget] = useState(0);
  const [seat_budget, setSeatBudget] = useState(0);
  const [utility_budget, setUtilityBudget] = useState(0);
  const [transport_budget, setTransportBudget] = useState(0);
  const [overMainBudget, setOverMainBudget] = useState(null);
  const [equalMainBudget, setEqualMainBudget] = useState(null);
  const [lessMainBudget, setLessMainBudget] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:6543/api/comparison_data", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch comparison data");
        }

        console.log(result.data);

        setMainBudget(result.data.main_budget);
        setFoodBudget(result.data.food_cost);
        setSeatBudget(result.data.seat_rent);
        setUtilityBudget(result.data.utility_cost);
        setTransportBudget(result.data.transport_cost);

      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error fetching data: " + error.message);
      }
    };

    fetchData();
  }, []);

  // Compare expenses with budget when values are updated
  const expenses = Number(seat_budget) + Number(food_budget) + Number(utility_budget) + Number(transport_budget);
  const budget = Number(main_budget);
useEffect(() => {
  

  setOverMainBudget(expenses > budget);
  setEqualMainBudget(expenses === budget);
  setLessMainBudget(expenses < budget);
}, [main_budget, food_budget, seat_budget, utility_budget, transport_budget]);


  return (
    <>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div className="card">
          <div className="budget-header">
            <h4>Estimated Monthly Budget</h4>
          </div>
          <div className="budget-display">
            <p>{main_budget}</p><p>BDT</p>
          </div>
        </div>
        <div className="card">
          <div className="budget-header">
            <h4>Approximate Seat Rental </h4>
          </div>
          <div className="budget-display">
            <p>{seat_budget}</p><p>BDT</p>
          </div>
        </div>
        <div className="card">
          <div className="budget-header">
            <h4>Approximate Food Cost </h4>
          </div>
          <div className="budget-display">
            <p>{food_budget}</p><p>BDT</p>
          </div>
        </div>
        <div className="card">
          <div className="budget-header">
            <h4>Approximate Utility Cost </h4>
          </div>
          <div className="budget-display">
            <p>{utility_budget}</p><p>BDT</p>
          </div>
        </div>
        <div className="card">
          <div className="budget-header">
            <h4>Approximate Transport Cost </h4>
          </div>
          <div className="budget-display">
            <p>{transport_budget}</p><p>BDT</p>
          </div>
        </div>
      </div>

      <div>
  {overMainBudget && (
    <div> 
      <h3 style={{color:"red"}}>You're over your MAIN budget !!</h3>
      <button>Get Optimal Plan for Whole Month !!</button>
    </div>
  )}

  {equalMainBudget && (
    <div>
      <h3>Your budget is exactly matched !!</h3>
      <button>Still want an optimized breakdown with saving ?</button>
    </div>
  )}

  {lessMainBudget && (
  <div>
    <h3>You're under your MAIN budget!!</h3>
    <p style={{ marginTop: '10px' }}>
      🎉 Great job! You’re spending wisely. Consider putting the remaining{' '}
      <strong>{main_budget - expenses} BDT</strong> into:
    </p>
    <ul style={{ marginTop: '5px', width:"400px", textAlign:"start" , margin:"0px auto"}}>
      <li>💰 Emergency savings fund</li>
      <li>📈 Investment or digital savings (bKash/Nagad/Bank)</li>
      <li>🎯 A goal — like a new gadget or future rent advance</li>
    </ul>
    <button style={{ marginTop: '10px' }}>
      Still want an optimized breakdown from me?
    </button>
  </div>
)}

</div>

    </>
  );
};

export default Comparison;
