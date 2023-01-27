import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
  DataTypes,
  CreationOptional,
} from "sequelize";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { JWT_SECRET } from "../constants";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare phone: CreationOptional<string>;
  declare first_name: string;
  declare last_name: string;
  declare hash: string;

  public async isPasswordRight(password: string): Promise<Boolean> {
    const isRight = await compare(password, this.hash);
    return isRight;
  }

  public getAuthToken(): string {
    const token = jwt.sign({ id: this.id }, JWT_SECRET);
    return token;
  }

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // define association here
    this.hasMany(models.Blog, {
      as: "blogs",
      foreignKey: "user_id",
      sourceKey: "id",
    });
  }
}

export const initUser = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      hash: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true,
    }
  );
};

export default User;
