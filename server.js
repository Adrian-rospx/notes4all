import { configDotenv } from 'dotenv';

import application from './src/app.js';

configDotenv();

const PORT = process.env.PORT || 3000;

application.listen(PORT);