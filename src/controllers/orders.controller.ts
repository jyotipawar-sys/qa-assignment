import { Request, Response } from "express";
import Order from "../models/order.model";
import orderRepository from "../repositories/order.repository";
import lineItemRepository from "../repositories/lineItem.repository";

/**
 * Purpose:
 * @param 
 */
export default class OrdersController {
  async create(req: Request, res: Response) {
    
    // validate input body ex.name, pasword should not be null
    if (!req.body.customer) {
      res.status(400).send({
        message: "customer can not be empty!"
      });
      return;
    }

    try {
      const order: Order = req.body;
      const lineItems = req.body.lineItems

      const totalAmount = lineItems.reduce((partialSum: number, item: any) => partialSum + item.totalAmount, 0);
      const discountedAmount = lineItems.reduce((partialSum: number, item:any) => partialSum + item.discount, 0);

      order.totalAmount = totalAmount
      order.discountedAmount = discountedAmount
      const savedOrder = await orderRepository.save(order);

      // save line items
      await lineItemRepository.saveMany(lineItems, savedOrder.id)

      res.status(201).send(savedOrder);
    } catch (err) {
      res.status(500).send({
        message: `some error occurred while retrieving orders. crash :: ${err}`
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const customer = typeof req.query.customer === "number" ? req.query.customer : 0;

    try {
      const orders = await orderRepository.retrieveAll({ customer });

      res.status(200).send(orders);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving orders."
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const order = await orderRepository.retrieveById(id);

      if (order) res.status(200).send(order);
      else
        res.status(404).send({
          message: `Cannot find customer with id=${id}.`
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving customer with id=${id}.`
      });
    }
  }

  async update(req: Request, res: Response) {
    let order: Order = req.body;
    order.id = parseInt(req.params.id);

    try {
      const num = await orderRepository.update(order);

      if (num == 1) {
        res.send({
          message: "order was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update order with id=${order.id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating order with id=${order.id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await orderRepository.delete(id);

      if (num == 1) {
        res.send({
          message: "Order was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Order with id=${id}. Maybe Order was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete Order with id==${id}.`
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const num = await orderRepository.deleteAll();

      res.send({ message: `${num} Order were deleted successfully!` });
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while removing all tutorials."
      });
    }
  }


}