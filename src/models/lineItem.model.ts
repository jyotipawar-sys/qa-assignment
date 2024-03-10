import { Model, Table, Column, DataType, ForeignKey,BelongsTo } from "sequelize-typescript";
import User from "../models/user.model"
import Order from "../models/order.model"
import Item from "../models/item.model"


@Table({
  tableName: "lineItems",
})
export default class LineItem extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.DECIMAL,
    field: "totalAmount"
  })
  totalAmount?: number;

  @Column({
    type: DataType.DECIMAL,
    field: "discount"
  })
  discount?: number;

  @Column({
    type: DataType.INTEGER,
    field: "quantity"
  })
  quantity?: number;

  @ForeignKey(() => Item)
  @Column({
    type: DataType.INTEGER,
    field: "itemId"
  })
  itemId?: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: "customerId"
  })
  customerId?: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    field: "orderId"
  })
  orderId?: number;


  @BelongsTo(() => Item) // Define belongs to association
  item?: Item;

  @BelongsTo(() => Order) // Define belongs to association
  order?: Order;

  @BelongsTo(() => User) // Define belongs to association
  user?: User;
}