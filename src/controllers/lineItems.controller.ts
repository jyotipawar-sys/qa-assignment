import { Request, Response } from "express";
import LineItem from "../models/lineItem.model";
import lineItemRepository from "../repositories/lineItem.repository";

/**
 * Purpose:
 * @param 
 */
export default class LineItemsController {
  async create(req: Request, res: Response) {
    
    // validate input body ex.name, pasword should not be null
    if (!req.body.order) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const lineItem: LineItem = req.body;

      const savedTutorial = await lineItemRepository.save(lineItem);

      res.status(201).send(savedTutorial);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving lineItems."
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const order = typeof req.query.order === "number" ? req.query.order : 0;

    try {
      const lineItems = await lineItemRepository.retrieveAll({ order });

      res.status(200).send(lineItems);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving lineItems."
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const lineItem = await lineItemRepository.retrieveById(id);

      if (lineItem) res.status(200).send(lineItem);
      else
        res.status(404).send({
          message: `Cannot find lineItems with id=${id}.`
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving lineItems with id=${id}.`
      });
    }
  }

  async update(req: Request, res: Response) {
    let lineItem: LineItem = req.body;
    lineItem.id = parseInt(req.params.id);

    try {
      const num = await lineItemRepository.update(lineItem);

      if (num == 1) {
        res.send({
          message: "lineItems was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update lineItems with id=${lineItem.id}. Maybe lineItems was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating lineItems with id=${lineItem.id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await lineItemRepository.delete(id);

      if (num == 1) {
        res.send({
          message: "lineItems was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete lineItems with id=${id}. Maybe lineItems was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete lineItems with id==${id}.`
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const num = await lineItemRepository.deleteAll();

      res.send({ message: `${num} lineItems were deleted successfully!` });
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while removing all lineItems."
      });
    }
  }


}