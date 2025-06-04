import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../../style/1.css';

const Vehicles = () => {
    const navigate = useNavigate();

    //states
    const [flag , setFlag] = useState(null);
    const [bikeFare , setbikeFare] = useState(0);
    const [carFare , setcarFare] = useState(0);
    const [busFare , setbusFare] = useState(0);
    const [rickshawFare , setrickshawFare] = useState(0);
    const [minFare, setminfare] = useState(0);
    const [cheapestVehicle, setCheapestVehicle] = useState('');


    const handleClickBike = async () =>{

        const token = localStorage.getItem("token");

        const response = await fetch('http://localhost:6543/api/get_distance', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if(!response.ok){
            alert("Cant get distance from db !!");
            return;
        };

        const result = await response.json();

        const distance = result.data.distance;

        setFlag(true);


        const bike = distance * 15 * 30;
        const bus = distance * 2.5 * 30;
        const car = distance * 25 * 30;
        const rickshaw = distance * 5 * 30;
        setbikeFare(bike);
        setbusFare(bus);
        setcarFare(car);
        setrickshawFare(rickshaw);
        
        const fareInfo = [
            {name: "Bike", fare:bike },
            {name: "Bus", fare:bus },
            {name: "Car", fare:car },
            {name: "Rickshaw", fare:rickshaw },
        ];

        const minObject = fareInfo.reduce((min, current) => {
            return current.fare < min.fare ? current : min;
        });

        

        console.log(minFare, cheapestVehicle)

        setCheapestVehicle(minObject.name);
        setminfare(minObject.fare);







    }

    const handleClickCar = () =>{
        
    }

    const handleClickBus = () =>{
        
    }

    const handleClickRick = () =>{
        
    }

    const handleClickPersonal = () =>{
        
    }





    return(<>
        <h4>Choose Your Preffered Vehicle !</h4>
        <br />
        <div style={{display:"flex", gap:"20px"}}>
        <button onClick={handleClickBike}>Uber Bike</button>
        <button onClick={handleClickCar}>Uber Car</button>
        <button onClick={handleClickBus}>Public Bus</button>
        <button onClick={handleClickRick}>Autorickshaw</button>
        <button onClick={handleClickPersonal}>Personal Vehicle</button>
        
        </div>
        <br />
        {flag && (
        <div style={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        <div className="card">
                <div className="budget-header">
                    <h4>Approximate Monthly Transport Cost in Bike</h4>
                </div>
                <div className="budget-display">
                    <p>{bikeFare}</p><p>BDT</p>
                </div>
        </div>
        <div>
            <h4>Other Options</h4>
            <label style={{display:'flex', gap:"20px"}}>
                <h4>Approximate Monthly Fare for Bus - {busFare}</h4>
                <button>Choose Bus</button>
            </label><br />
            <label  style={{display:'flex', gap:"20px"}}>
                <h4>Approximate Monthly Fare for Car - {carFare}</h4>
                <button>Choose Car</button> 
            </label><br />
            <label style={{display:'flex', gap:"20px"}}>
                <h4>Approximate Monthly Fare for Rickshaw - {rickshawFare}</h4>
                <button>Choose Rickshaw</button>
            </label>
        </div>
        <br /><br />
        <div>
            <button>Prioritize My Choice</button>
        </div>
        </div>
        
)}
        </>
    )
}

export default Vehicles;