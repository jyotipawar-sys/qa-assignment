import { Application } from "express";
import ItemsRoutes from "./items.routes";
import OrdersRoutes from "./orders.routes";
import UsersRoutes from "./users.routes";
import LineItemsRoutes from "./lineItems.routes"
import PurchaseOrderRoutes from "./purchaseOrder.routes";
import jwt from 'jsonwebtoken';
import { config } from "../config/db.config";

import { verifyToken } from '../middlewares/authMiddlewares';
import { checkRole } from '../middlewares/roleCheckMiddleware';
import usersRoutes from "./users.routes";

export default class Routes {
  constructor(app: Application) {

    app.use("/api/v1/register", usersRoutes)
    
    app.post('/api/login', (req, res) => {
      const { username, password } = req.body;
      const token = jwt.sign({ username, password }, config.secretKey);
      res.json({ token });
    });

    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    app.use("/api/v1/orders", verifyToken,checkRole('customer'), OrdersRoutes);
    app.use("/api/v1/items",verifyToken, checkRole('customer'), ItemsRoutes);
    app.use("/api/v1/users", verifyToken, checkRole('customer'), UsersRoutes);
    app.use("/api/v1/lineItems", verifyToken,checkRole('customer'), LineItemsRoutes)
    app.use("/api/v1/purchaseOrders",verifyToken, checkRole('admin'), PurchaseOrderRoutes)
  }
}