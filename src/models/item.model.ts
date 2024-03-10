import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "items",
})
export default class Item extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(255),
    field: "name"
  })
  name?: string;

  @Column({
    type: DataType.DECIMAL,
    field: "sellingPrice"
  })
  sellingPrice?: number;

  @Column({
    type: DataType.DECIMAL,
    field: "purchasePrice"
  })
  purchasePrice?: number;

  @Column({
    type: DataType.STRING(255),
    field: "unit"
  })
  unit?: string;

  @Column({
    type: DataType.STRING(255),
    field: "HSNCode"
  })
  HSNCode?: string;

  @Column({
    type: DataType.STRING(255),
    field: "SKUNumber"
  })
  SKUNumber?: string;

  @Column({
    type: DataType.DECIMAL,
    field: "inStock"
  })
  inStock?: number;

  @Column({
    type: DataType.DECIMAL,
    field: "openingStock"
  })
  openingStock?: number;

  @Column({
    type: DataType.DECIMAL,
    field: "reOrderPoint"
  })
  reOrderPoint?: number;
}