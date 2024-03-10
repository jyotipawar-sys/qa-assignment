import { Model, Table, Column, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import Item from "./item.model";

@Table({
  tableName: "purchaseOrders",
})
export default class PurchaseOrder extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(255),
    field: "vendorName"
  })
  vendorName?: string;

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

  @BelongsTo(() => Item) // Define belongs to association
  item?: Item;
}