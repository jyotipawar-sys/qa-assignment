import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import User from "./user.model"

@Table({
  tableName: "orders",
})
export default class Order extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(255),
    field: "paymentMode"
  })
  paymentMode?: string;

  @Column({
    type: DataType.DECIMAL,
    field: "totalAmount"
  })
  totalAmount?: number;

  @Column({
    type: DataType.DECIMAL,
    field: "discountedAmount"
  })
  discountedAmount?: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: "customerId"
  })
  customerId?: number;

  @BelongsTo(() => User) // Define belongs to association
  user?: User;
}