// App.js (React project running on localhost:3000)
import { useState } from 'react';
import './App.css';
const express = require('express');
const cors = require('cors');
const app = express();
// app.use(cors());
// app.use(express.json());

// Endpoint to handle incoming POST requests
// app.post('/receive', (req:any, res:any) => {
//     const { message } = req.body;
//     console.log('Received message:', message);

//     // You can process the message here or send a response back if needed.
//     res.json({ received: true });
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });

function App() {
    const [receivedMessage, setReceivedMessage] = useState('');

    return (
        <div className="App">
            <h1>React Project</h1>
            <p>Received Message: {receivedMessage}</p>
        </div>
    );
}

export default App;
