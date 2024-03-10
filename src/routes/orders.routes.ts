import { Router } from "express";
import OrdersController from "../controllers/orders.controller";

class OrdersRoutes {
  router = Router();
  controller = new OrdersController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new user
    this.router.post("/", this.controller.create);

    // Retrieve all users
    this.router.get("/", this.controller.findAll);


    // Retrieve a single user with id
    this.router.get("/:id", this.controller.findOne);

    // Update a user with id
    this.router.put("/:id", this.controller.update);

    // Delete a user with id
    this.router.delete("/:id", this.controller.delete);

    // Delete all users
    this.router.delete("/", this.controller.deleteAll);
  }
}

export default new OrdersRoutes().router;