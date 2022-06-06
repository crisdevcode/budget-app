import express from "express";
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import transactionRoutes from './routes/transaction.routes';
import config from './config/config';

const app = express();

 // Settings 
app.set('port', 4000);

// Middlewares
app.use(express.json());
app.use(cors());

if(config.NODE_ENV === 'development'){
    app.use(morgan('dev'));
};

if(config.NODE_ENV === 'production') {
    app.use(express.static('client/dist'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html')));
};

// Routes
app.use('/api/v1/transactions', transactionRoutes);

export default app;
