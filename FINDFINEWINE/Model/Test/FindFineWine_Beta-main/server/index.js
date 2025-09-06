import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { spawn } from 'child_process'; // Import child_process

import connectDB from './mongodb/connect.js';
import wineRoutes from './routes/wine.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

// New route to handle form submission and run the Python script
app.post('/api/recommend', (req, res) => {
    const { Type, variety, gender, occasion } = req.body;
    // res.send(req.body)
    
    
    const python = spawn('python3', ['./trendwine.py', Type, variety, gender, occasion ]);

    let dataToSend = '';
    python.stdout.on('data', function (data) {
        dataToSend += data.toString();
    });

    python.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    python.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        
        // res.json(JSON.parse(dataToSend));
        
        res.setHeader('Content-Type', 'application/json');
        res.send(dataToSend);
    });
    
});

app.use('/api', wineRoutes);

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port http://localhost:${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

startServer();
