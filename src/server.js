require("dotenv").config();
const app = require('./app');
const config = require('./app/config');
const connectDatabase = require('./app/utils/mongodb.util');
const http = require('http');

const createSocketIO = require('./app/config/socket');

const httpServer = http.createServer(app);

async function startServer() {
    try {
        await connectDatabase(config.db.uri);
        console.log('Connected to database');
        
        createSocketIO(httpServer);
        
        const PORT = config.app.port;
        httpServer.listen(PORT, () => {
            console.log(`listening on ${PORT}`);
        })
    } catch (err) {
        console.log('Cannot connect to dabatase');
        process.exit();
    }
}

startServer();