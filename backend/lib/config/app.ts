import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { TestRoutes } from "../routes/test_routes";
class App {
   public app: express.Application;
   private test_routes: TestRoutes = new TestRoutes();
   constructor() {
      this.app = express();
      this.config();
      this.test_routes.route(this.app);
   }
   private config(): void {
      // support application/json type post data
      this.app.use(bodyParser.json());
      //support application/x-www-form-urlencoded post data
      this.app.use(bodyParser.urlencoded({ extended: false }));
   }
}
const app = new App().app;



//mongoDB connection using mongoose
const mongoDB = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@real-estate.kqivc.mongodb.net/real-estate?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


export default app;