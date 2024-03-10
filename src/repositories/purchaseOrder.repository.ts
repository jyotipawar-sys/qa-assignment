import { Op } from "sequelize";
import PurchaseOrder from "../models/purchaseOrder.model";

interface IPurchaseOrderRepository {
  save(item: PurchaseOrder): Promise<PurchaseOrder>;
  retrieveAll(searchParams: {vendorName: string}): Promise<PurchaseOrder[]>;
  retrieveById(purchaseOrderId: number): Promise<PurchaseOrder | null>;
  update(purchaseOrder: PurchaseOrder): Promise<number>;
  delete(PurchaseOrderId: number): Promise<number>; // delete single object
  deleteAll(): Promise<number>; // 
}

interface SearchCondition {
  [key: string]: any;
}

class PurchaseOrderRepositoryRepository implements IPurchaseOrderRepository {
  async save(purchaseOrder: PurchaseOrder): Promise<PurchaseOrder> {
    try {
      return await PurchaseOrder.create({
        vendorName: purchaseOrder.vendorName,
        quantity: purchaseOrder.quantity,
        itemId: purchaseOrder.itemId,
      });
    } catch (err) {
      throw new Error("Failed to create purchase order!");
    }
  }

  async retrieveAll(searchParams: {vendorName?: string,}): Promise<PurchaseOrder[]> {
    try {
      let condition: SearchCondition = {};


      if (searchParams?.vendorName)
        condition.vendorName = { [Op.iLike]: `%${searchParams.vendorName}%` };

      return await PurchaseOrder.findAll({ where: condition });
    } catch (error) {
      throw new Error("Failed to retrieve Purchase Orders!");
    }
  }

  async retrieveById(purchaseOrderId: number): Promise<PurchaseOrder | null> {
    try {
      return await PurchaseOrder.findByPk(purchaseOrderId);
    } catch (error) {
      throw new Error("Failed to retrieve Purchase order!");
    }
  }

  async update(purchaseOrder: PurchaseOrder): Promise<number> {
    const {
      id,
      vendorName,
      quantity,
      itemId
    } = purchaseOrder;

    try {
      const affectedRows = await PurchaseOrder.update(
        {
          vendorName,
          quantity,
          itemId
        },
        { where: { id: id } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update Purchase Order!");
    }
  }

  async delete(purchaseOrderId: number): Promise<number> {
    try {
      const affectedRows = await PurchaseOrder.destroy({ where: { id: purchaseOrderId } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete Purchase Order!");
    }
  }

  async deleteAll(): Promise<number> {
    try {
      return PurchaseOrder.destroy({
        where: {},
        truncate: false
      });
    } catch (error) {
      throw new Error("Failed to delete Purchase Orders!");
    }
  }
}

export default new PurchaseOrderRepositoryRepository();