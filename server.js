import { configDotenv } from 'dotenv';

import application from './src/app.js';

configDotenv({quiet: true});

const PORT = process.env.PORT || 3000;

application.listen(PORT, () => {
    // start logs
    const date = new Date().toLocaleString();
    const timeZone = new Date().getTimezoneOffset() / 60;

    console.log(`Server running at: http://localhost:${PORT}`);
    console.log(`Started at: ${date} GMT${timeZone}:00`);
});