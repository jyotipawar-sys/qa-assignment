import Order from "../models/order.model";

interface IOrderRepository {
  save(order: Order): Promise<Order>;
  retrieveAll(searchParams: {customerId: number}): Promise<Order[]>;
  retrieveById(order: number): Promise<Order | null>;
  update(order: Order): Promise<number>;
  delete(ordIder: number): Promise<number>; // delete single object
  deleteAll(): Promise<number>; // 
}

interface SearchCondition {
  [key: string]: any;
}

class OrderRepository implements IOrderRepository {
  async save(order: Order): Promise<Order> {
    try {
      return await Order.create({
        paymentMode: order.paymentMode,
        totalAmount: order.totalAmount,
        discountedAmount: order.discountedAmount,
        customerId: order.customerId
      });
    } catch (err) {
      throw new Error("Failed to create Orders!");
    }
  }

  async retrieveAll(searchParams: {customerId?: number,}): Promise<Order[]> {
    try {
      let condition: SearchCondition = {};


      if (searchParams?.customerId)
        condition.customerId = searchParams.customerId

      return await Order.findAll({ where: condition });
    } catch (error) {
      throw new Error("Failed to retrieve orders!");
    }
  }

  async retrieveById(orderId: number): Promise<Order | null> {
    try {
      return await Order.findByPk(orderId);
    } catch (error) {
      throw new Error("Failed to retrieve orders!");
    }
  }

  async update(order: Order): Promise<number> {
    const {
      id,
      paymentMode,
      totalAmount,
      discountedAmount,
      customerId
    } = order;

    try {
      const affectedRows = await Order.update(
        {
            paymentMode,
            totalAmount,
            discountedAmount,
            customerId
        },
        { where: { id: id } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update orders!");
    }
  }

  async delete(orderId: number): Promise<number> {
    try {
      const affectedRows = await Order.destroy({ where: { id: orderId } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete order!");
    }
  }

  async deleteAll(): Promise<number> {
    try {
      return Order.destroy({
        where: {},
        truncate: false
      });
    } catch (error) {
      throw new Error("Failed to delete order!");
    }
  }
}

export default new OrderRepository();