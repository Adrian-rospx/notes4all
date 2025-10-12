import application from './src/app.js';
import { configDotenv } from 'dotenv';

configDotenv();

const PORT = process.env.PORT || 3000;

application.listen(PORT);