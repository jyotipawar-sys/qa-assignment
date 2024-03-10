import { Op } from "sequelize";
import User from "../models/user.model";

// User Repository
interface IUserRepository {
  save(user: User): Promise<User>;
  retrieveAll(searchParams: {name: string}): Promise<User[]>;
  retrieveByEmail(username: string): Promise<User | null>;
  retrieveById(userId: number): Promise<User | null>;
  update(user: User): Promise<number>;
  delete(UserId: number): Promise<number>; // delete single object
  deleteAll(): Promise<number>; // 
}

interface SearchCondition {
  [key: string]: any;
}

class UserRepository implements IUserRepository {
  async save(user: User): Promise<User> {
    try {
      return await User.create({
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role
      });
    } catch (err) {
      throw new Error("Failed to save users");
    }
  }

  async retrieveAll(searchParams: {name?: string,}): Promise<User[]> {
    try {
      let condition: SearchCondition = {};


      if (searchParams?.name)
        condition.name = { [Op.iLike]: `%${searchParams.name}%` };

      return await User.findAll({ where: condition });
    } catch (error) {
      throw new Error("Failed to retrieve users!");
    }
  }

  async retrieveByEmail(username: string | undefined): Promise<User | null> {
    try {
      return await User.findOne({where: {email: username} });
    } catch (error) {
      throw new Error("Failed to retrieve users!");
    }
  }

  async retrieveById(userId: number): Promise<User | null> {
    try {
      return await User.findByPk(userId);
    } catch (error) {
      throw new Error("Failed to retrieve users!");
    }
  }

  async update(user: User): Promise<number> {
    const { id, name, email } = user;

    try {
      const affectedRows = await User.update(
        { name, email },
        { where: { id: id } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update users!");
    }
  }

  async delete(userId: number): Promise<number> {
    try {
      const affectedRows = await User.destroy({ where: { id: userId } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete users!");
    }
  }

  async deleteAll(): Promise<number> {
    try {
      return User.destroy({
        where: {},
        truncate: false
      });
    } catch (error) {
      throw new Error("Failed to delete users!");
    }
  }
}

export default new UserRepository();