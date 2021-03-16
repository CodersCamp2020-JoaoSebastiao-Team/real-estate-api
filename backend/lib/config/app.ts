import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import environment from "../environment";
import { Registration } from "../routes/registration";
import { TestRoutes } from "../routes/test_routes";
import { Reservation } from "../routes/reservations";
import { Office } from "../routes/offices";
import { CommonRoutes } from "../routes/common_routes";
import {Listing} from "../routes/listings";
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();

class App {
   public app: express.Application;
   //'mongodb+srv://test:test@cluster0.6z8gs.mongodb.net/Cluster0
   public mongoUrl: string = 'mongodb+srv://test:test@cluster0.6z8gs.mongodb.net/' + environment.getDBName();

   private test_routes: TestRoutes = new TestRoutes();
   private reservation: Reservation = new Reservation();
   private office: Office = new Office();
   private listing: Listing = new Listing();
   private common_routes: CommonRoutes = new CommonRoutes();
   private registration: Registration = new Registration();

   constructor() {
      this.app = express();
      this.config();
      this.mongoSetup();
      this.registration.route(this.app);
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
      this.app.use(express.json());
      this.app.use(cors());
   }
   private mongoSetup(): void {
      mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
   }
}
const app = new App().app;

export default app;