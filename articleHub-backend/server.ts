import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from "express-session";
import express, { Express } from "express";
import http from 'http';
import dotenv from "dotenv";
import { authRoute } from './src/presentation/routes/authRoute';
import { errorHandler } from './src/presentation/middleware/ErrorHandler/errorHandler';
import fileUpload from "express-fileupload";
import { connectMongo } from './src/infrastructure/db/connectDB';
import { categoryDB } from './src/infrastructure/db/model/category';
import { articleRoute } from './src/presentation/routes/articleRoute';
import { userRoute } from './src/presentation/routes/userRoutes';
async function call() {
   const newCategory = new categoryDB({
      name: "sports"
   })
   await newCategory.save()
}
call()
dotenv.config();
const allowedOrigins = [
   'http://localhost:5173',
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
      this.setArticleRoute()
      this.setUserRoute()
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
            secure: true,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24
         }
      }));
   }

   private setAuthRoute() {
      this.app.use('/api/auth', new authRoute().authRoute)
   }
   private setArticleRoute() {
      this.app.use('/api/article', new articleRoute().articleRoute)
   }
   private setUserRoute() {
      this.app.use('/api/user', new userRoute().userRoute)
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
