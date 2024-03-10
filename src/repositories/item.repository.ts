import { Op } from "sequelize";
import Item from "../models/item.model";

interface IItemRepository {
  save(item: Item): Promise<Item>;
  retrieveAll(searchParams: {name: string}): Promise<Item[]>;
  retrieveById(itemId: number): Promise<Item | null>;
  update(item: Item): Promise<number>;
  delete(ItemId: number): Promise<number>; // delete single object
  deleteAll(): Promise<number>; //
  updateById(itemId: number, quantity: number): Promise<number>  
}

interface SearchCondition {
  [key: string]: any;
}

class ItemRepository implements IItemRepository {
  async save(item: Item): Promise<Item> {
    try {
      return await Item.create({
        name: item.name,
        purchasePrice: item.purchasePrice,
        sellingPrice: item.sellingPrice,
        unit:item.unit,
        HSNCode: item.HSNCode,
        SKUNumber:item.SKUNumber,
        reOrderPoint:item.reOrderPoint,
        openingStock: item.openingStock,
        inStock: item.inStock

      });
    } catch (err) {
      throw new Error("Failed to create items!");
    }
  }

  async retrieveAll(searchParams: {name?: string,}): Promise<Item[]> {
    try {
      let condition: SearchCondition = {inStock: {[Op.gt] : "0"}};


      if (searchParams?.name)
        condition.name = { [Op.iLike]: `%${searchParams.name}%` };

      return await Item.findAll({ where: condition });
    } catch (error) {
      throw new Error("Failed to retrieve items!");
    }
  }

  async retrieveById(itemId: number): Promise<Item | null> {
    try {
      return await Item.findByPk(itemId);
    } catch (error) {
      throw new Error("Failed to retrieve items!");
    }
  }

  async updateById(itemId: number | any, quantity: number | any): Promise<number> {
    try {
      const item = await this.retrieveById(itemId)
      const currentInStock = item?.inStock || 0
      const updatedinStock = +quantity +  +currentInStock

      const affectedRows = await Item.update({inStock:updatedinStock},{ where: { id: itemId } });
      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to retrieve items!");
    }
  }

  async update(item: Item): Promise<number> {
    const {
      id,
      name,
      sellingPrice,
      unit,
      HSNCode,
      SKUNumber,
      reOrderPoint,
      openingStock,
      inStock,
    } = item;

    try {
      const affectedRows = await Item.update(
        {
          name,
          sellingPrice,
          unit,
          HSNCode,
          SKUNumber,
          reOrderPoint,
          openingStock,
          inStock,
        },
        { where: { id: id } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update items!");
    }
  }

  async delete(itemId: number): Promise<number> {
    try {
      const affectedRows = await Item.destroy({ where: { id: itemId } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete items!");
    }
  }

  async deleteAll(): Promise<number> {
    try {
      return Item.destroy({
        where: {},
        truncate: false
      });
    } catch (error) {
      throw new Error("Failed to delete items!");
    }
  }
}

export default new ItemRepository();