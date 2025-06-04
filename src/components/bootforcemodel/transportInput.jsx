import '../../style/1.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const TransportInput = () => {
    const navigate = useNavigate();
    const [distance, setDistance] = useState('');
    const [flag, setFlag] = useState(null); // true = suggest walk, false = direct vehicle
    const [submitted, setSubmitted] = useState(false);

    const clickHandler = async () => {
        try {
            if (!distance || isNaN(distance)) {
                alert("Please enter a valid transport distance.");
                return;
            }

            const token = localStorage.getItem("token");

            const body = {
                distance: parseFloat(distance)
            };

            const response = await fetch("http://localhost:6543/api/transport_distance", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const Data = await response.json();
                alert("Error occurred during API call: " + Data.message);
                return;
            }

            alert("Transport distance inserted successfully");
//-------------------------------chatgpt start--------------------------
            const numericDistance = parseFloat(distance);
            setFlag(numericDistance <= 2.5);
            setSubmitted(true); // Hide submit button
        } catch (err) {
            alert("Internal server error: " + (err.message || "Unknown error"));
        }
    };

    const handleChooseVehicle = () => {
        navigate('/choose-vehicle'); // adjust your route
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h3>Your distance from Mess to University</h3>
            <br />
            <div>
                <TextField
                    id="outlined-basic"
                    label="Approximate Distance (km)"
                    variant="outlined"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                />
            </div>

            {!submitted && (
                <>
                    <br />
                    <Button variant="contained" color="primary" onClick={clickHandler}>Submit</Button>
                </>
            )}

            {submitted && (
                <div style={{ marginTop: '30px' }}>
                    {flag === true && (
                        <>
                            <p style={{ fontWeight: 'bold', color: 'green' }}>
                                Your distance is walkable (≤ 2.5 km). Walking is good for health and takes around 30 minutes.
                            </p>
                            <Button variant="outlined" onClick={handleChooseVehicle}>Choose Vehicle Anyway</Button>
                        </>
                    )}
                    {flag === false && (
                        <>
                            <Button variant="contained" color="secondary" onClick={handleChooseVehicle}>
                                Choose Vehicle
                            </Button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export { TransportInput };
