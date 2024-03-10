import { Request, Response } from "express";
import Item from "../models/item.model";
import itemRepository from "../repositories/item.repository";

/**
 * Purpose:
 * @param 
 */
export default class ItemsController {
  async create(req: Request, res: Response) {
    
    // validate input body ex.name, pasword should not be null
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const item: Item = req.body;

      const savedTutorial = await itemRepository.save(item);

      res.status(201).send(savedTutorial);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving items"
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const name = typeof req.query.name === "string" ? req.query.name : "";

    try {
      const items = await itemRepository.retrieveAll({ name });

      res.status(200).send(items);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving items."
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const item = await itemRepository.retrieveById(id);

      if (item) res.status(200).send(item);
      else
        res.status(404).send({
          message: `Cannot find items with id=${id}.`
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving items with id=${id}.`
      });
    }
  }

  async update(req: Request, res: Response) {
    let item: Item = req.body;
    item.id = parseInt(req.params.id);

    try {
      const num = await itemRepository.update(item);

      if (num == 1) {
        res.send({
          message: "items was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update items with id=${item.id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating items with id=${item.id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await itemRepository.delete(id);

      if (num == 1) {
        res.send({
          message: "items was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete items with id=${id}. Maybe items was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete items with id==${id}.`
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const num = await itemRepository.deleteAll();

      res.send({ message: `${num} items were deleted successfully!` });
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while removing all tutorials."
      });
    }
  }
}