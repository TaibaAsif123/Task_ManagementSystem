// middleware/corsMiddleware.js
import cors from 'cors';

const corsOptions = {
  origin: '*', // frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
