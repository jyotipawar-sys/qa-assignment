import { Request, Response } from "express";
import PurchaseOrder from "../models/purchaseOrder.model";
import purchaseOrderRepository from "../repositories/purchaseOrder.repository";
import itemRepository from "../repositories/item.repository";

/**
 * Purpose:
 * @param 
 */
export default class PurchaseOrdersController {
  async create(req: Request, res: Response) {
    
    // validate input body ex.name, pasword should not be null
    if (!req.body.vendorName) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const purchaseOrder: PurchaseOrder = req.body;

      const po = await purchaseOrderRepository.save(purchaseOrder);
      const itemId = po.item 

      // Update the Item stock
      await itemRepository.updateById(itemId, po.quantity);

      res.status(201).send(po);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving purchase Orders."
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const vendorName = typeof req.query.vendorName === "string" ? req.query.vendorName : "";

    try {
      const purchaseOrders = await purchaseOrderRepository.retrieveAll({ vendorName });

      res.status(200).send(purchaseOrders);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving purchase orders."
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const purchaseOrder = await purchaseOrderRepository.retrieveById(id);

      if (purchaseOrder) res.status(200).send(purchaseOrder);
      else
        res.status(404).send({
          message: `Cannot find purchase order with id=${id}.`
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving purchase order with id=${id}.`
      });
    }
  }

  async update(req: Request, res: Response) {
    let purchaseOrder: PurchaseOrder = req.body;
    purchaseOrder.id = parseInt(req.params.id);

    try {
      const num = await purchaseOrderRepository.update(purchaseOrder);

      if (num == 1) {
        res.send({
          message: "user was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update user with id=${purchaseOrder.id}. Maybe purchase order was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating purchase order with id=${purchaseOrder.id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await purchaseOrderRepository.delete(id);

      if (num == 1) {
        res.send({
          message: "purchase order was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete purchase order with id=${id}. Maybe User was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete User with id==${id}.`
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const num = await purchaseOrderRepository.deleteAll();

      res.send({ message: `${num} purchase order  were deleted successfully!` });
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while removing all tutorials."
      });
    }
  }


}