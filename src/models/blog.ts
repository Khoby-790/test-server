import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
  DataTypes,
  CreationOptional,
} from "sequelize";

class Blog extends Model<InferAttributes<Blog>, InferCreationAttributes<Blog>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare banner: string;
  declare body: string;
  declare user_id: number;
  declare likes: CreationOptional<number>;
  declare dislikes: CreationOptional<number>;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // define association here
    this.belongsTo(models.User, {
      as: "author",
      foreignKey: "user_id",
    });
  }
}

export const initBlog = (sequelize: Sequelize) => {
  Blog.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      banner: DataTypes.STRING,
      body: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      likes: DataTypes.INTEGER,
      dislikes: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Blog",
      tableName: "payouts_prim",
      underscored: true,
    }
  );
};

export default Blog;
