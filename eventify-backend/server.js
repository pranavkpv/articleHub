"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectDB_1 = require("./src/infrastructure/db/connectDB");
const authRoute_1 = require("./src/presentation/routes/authRoute");
const errorHandler_1 = require("./src/presentation/middleware/ErrorHandler/errorHandler");
const adminRoute_1 = require("./src/presentation/routes/adminRoute");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const userRoute_1 = require("./src/presentation/routes/userRoute");
const volunteerRoute_1 = require("./src/presentation/routes/volunteerRoute");
dotenv_1.default.config();
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.server = http_1.default.createServer(this.app);
        this.setMiddlewares();
        this.setAuthRoute();
        this.setAdminRoute();
        this.setUserRoute();
        this.setVolunteerRoute();
        this.setErrorHandler();
        this.database = new connectDB_1.connectMongo();
        this.database.connectDB();
    }
    setMiddlewares() {
        this.app.use((0, cors_1.default)({
            origin: ['http://localhost:5173'],
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            credentials: true
        }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, express_fileupload_1.default)({ useTempFiles: true }));
        this.app.use((0, express_session_1.default)({
            secret: process.env.SESSION_SECRET || 'your-secret-key',
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false,
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24
            }
        }));
    }
    setAuthRoute() {
        this.app.use('/api/auth', new authRoute_1.authRoute().authRoute);
    }
    setAdminRoute() {
        this.app.use('/api/admin', new adminRoute_1.adminRoute().adminRoute);
    }
    setUserRoute() {
        this.app.use('/api/user', new userRoute_1.userRoute().userRoute);
    }
    setVolunteerRoute() {
        this.app.use('/api/volunteer', new volunteerRoute_1.volunteerRoute().volunteerRoute);
    }
    setErrorHandler() {
        this.app.use(errorHandler_1.errorHandler);
    }
    listen() {
        const port = process.env.PORT;
        this.server.listen(port, () => console.log(`Server running on port ${port}`));
    }
}
exports.App = App;
const app = new App();
app.listen();
//# sourceMappingURL=server.js.map