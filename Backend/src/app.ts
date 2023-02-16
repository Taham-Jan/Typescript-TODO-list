import 'dotenv/config'
import express, { NextFunction, Request, Response } from "express";
import createHttpError ,{isHttpError} from 'http-errors';
import morgan from 'morgan';
import listRoute from './routes/ListRoutes'
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/todolist',listRoute);

app.use((req,res,next) => {
   next(createHttpError(404,"Endpoint Not Found !"))
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
   console.error(error);
   let errorMessage = 'An Unknown Error occured';
   let statuscode = 500;
   if(isHttpError(error)) {
      statuscode =error.status;
      errorMessage=error.message;
   }
   res.status(statuscode).json({ error: errorMessage })
}); 



export default app;