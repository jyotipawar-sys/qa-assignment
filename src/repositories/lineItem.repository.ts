import LineItem from "../models/lineItem.model";

interface ILineItemRepository {
  save(lineItem: LineItem): Promise<LineItem>;
  saveMany(lineItems: LineItem[], order: number|undefined): Promise<LineItem[]>;
  retrieveAll(searchParams: {order: number}): Promise<LineItem[]>;
  retrieveById(lineItemId: number): Promise<LineItem | null>;
  update(lineItem: LineItem): Promise<number>;
  delete(lineItemId: number): Promise<number>; // delete single object
  deleteAll(): Promise<number>; // 
}

interface SearchCondition {
  [key: string]: any;
}

class ILinetemRepository implements ILineItemRepository {
  async save(lineItem: LineItem): Promise<LineItem> {
    try {
      return await LineItem.create({
        totalAmount: lineItem.totalAmount,
        discount: lineItem.discount,
        quantity: lineItem.quantity,
        customerId: lineItem.customerId,
        order: lineItem.order,
        item: lineItem.item,
      });
    } catch (err) {
      throw new Error("Failed to create LineItems!");
    }
  }

  async saveMany(lineItems: LineItem[], order: number | undefined): Promise<LineItem[]> {
    try {
      return await LineItem.bulkCreate(
        lineItems.map((lineItem) => {
          return {
            totalAmount: lineItem.totalAmount,
            discount: lineItem.discount,
            quantity: lineItem.quantity,
            customerId: lineItem.customerId,
            order: order,
            item: lineItem.item,
          };
        })
      );
    } catch (err) {
      throw new Error("Failed to create lineItems!");
    }
  }

  async retrieveAll(searchParams: { order?: number }): Promise<LineItem[]> {
    try {
      let condition: SearchCondition = {};

      if (searchParams?.order) condition.order == searchParams.order;

      return await LineItem.findAll({ where: condition });
    } catch (error) {
      throw new Error("Failed to retrieve lineItems!");
    }
  }

  async retrieveById(lineItemId: number): Promise<LineItem | null> {
    try {
      return await LineItem.findByPk(lineItemId);
    } catch (error) {
      throw new Error("Failed to retrieve lineItems!");
    }
  }

  async update(lineItem: LineItem): Promise<number> {
    const { id, totalAmount, discount, quantity, customerId } = lineItem;

    try {
      const affectedRows = await LineItem.update(
        {
          totalAmount,
          discount,
          quantity,
          customerId,
        },
        { where: { id: id } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update lineItems!");
    }
  }

  async delete(lineItemId: number): Promise<number> {
    try {
      const affectedRows = await LineItem.destroy({
        where: { id: lineItemId },
      });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete lineItems!");
    }
  }

  async deleteAll(): Promise<number> {
    try {
      return LineItem.destroy({
        where: {},
        truncate: false,
      });
    } catch (error) {
      throw new Error("Failed to delete LineItems!");
    }
  }
}

export default new ILinetemRepository();