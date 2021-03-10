import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import environment from "../environment";
import { TestRoutes } from "../routes/test_routes";
import { Reservation } from "../routes/reservations";
import { Office } from "../routes/offices";
import { CommonRoutes } from "../routes/common_routes";
import {Listing} from "../routes/listings"
class App {
   public app: express.Application;
   //'mongodb+srv://test:test@cluster0.6z8gs.mongodb.net/Cluster0
   public mongoUrl: string = 'mongodb+srv://test:test@cluster0.6z8gs.mongodb.net/' + environment.getDBName();

   private test_routes: TestRoutes = new TestRoutes();
   private reservation: Reservation = new Reservation();
   private office: Office = new Office();
   private listing: Listing = new Listing();
   private common_routes: CommonRoutes = new CommonRoutes();

   constructor() {
      this.app = express();
      this.config();
      this.mongoSetup();
      this.test_routes.route(this.app);
      this.reservation.route(this.app);
      this.office.route(this.app);
      this.listing.route(this.app)
      this.common_routes.route(this.app);
   }
   private config(): void {
      // support application/json type post data
      this.app.use(bodyParser.json());
      //support application/x-www-form-urlencoded post data
      this.app.use(bodyParser.urlencoded({ extended: false }));
   }
   private mongoSetup(): void {
      mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
   }
}
const app = new App().app;



// //mongoDB connection using mongoose
// const mongoDB = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@real-estate.kqivc.mongodb.net/real-estate?retryWrites=true&w=majority`;
// mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

// let db = mongoose.connection;

// //Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));


export default app;