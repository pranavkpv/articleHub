import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from "express-session";
import express, { Express } from "express";
import http from 'http';
import dotenv from "dotenv";
import { authRoute } from './src/presentation/routes/authRoute';
import { errorHandler } from './src/presentation/middleware/ErrorHandler/errorHandler';
import { adminRoute } from './src/presentation/routes/adminRoute';
import fileUpload from "express-fileupload";
import { userRoute } from './src/presentation/routes/userRoute';
import { volunteerRoute } from './src/presentation/routes/volunteerRoute';
import { connectMongo } from './src/infrastructure/db/connectDB';


dotenv.config();
const allowedOrigins = [
   'http://localhost:5173',
   'https://eventify-front.tastetrial.info',
   'https://www.eventify-front.tastetrial.info'
];
export class App {
   private app: Express;
   private server: http.Server;
   private database: connectMongo
   constructor() {
         this.app = express();
        this.app.set('trust proxy', 1);
      this.server = http.createServer(this.app);
      this.setMiddlewares();
      this.setAuthRoute()
      this.setAdminRoute()
      this.setUserRoute()
      this.setVolunteerRoute()
      this.setErrorHandler();
      this.database = new connectMongo()
      this.database.connectDB()
   }

   private setMiddlewares() {

    this.app.use(cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true); // allow non-browser requests (curl, Postman)
            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('CORS not allowed'));
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
    }));

    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(fileUpload({ useTempFiles: true }));

    this.app.use(session({
        secret: process.env.SESSION_SECRET || 'your-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: true,   // requires HTTPS
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24
        }
    }));
}

   private setAuthRoute() {
      this.app.use('/api/auth', new authRoute().authRoute)
   }
   private setAdminRoute() {
      this.app.use('/api/admin', new adminRoute().adminRoute)
   }
   private setUserRoute() {
      this.app.use('/api/user', new userRoute().userRoute)
   }
   private setVolunteerRoute() {
      this.app.use('/api/volunteer', new volunteerRoute().volunteerRoute)
   }
   private setErrorHandler() {
      this.app.use(errorHandler);
   }

   public listen() {
      const port = process.env.PORT
      this.server.listen(port, () => console.log(`Server running on port ${ port }`));
   }
}

const app = new App();
app.listen();
