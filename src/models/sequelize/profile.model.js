import { DataTypes } from "sequelize";
import { UserModel } from "../mongoose/user.model";

export const ProfileModel = sequelize.define("Profile", {
  employee_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  first_name: { type: DataTypes.STRING(50), allowNull: false },
  last_name: { type: DataTypes.STRING(50), allowNull: false },
  phone: { type: DataTypes.STRING(20), allowNull: true },
});


ProfileModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "user"
});

UserModel.hasOne(ProfileModel, {
  foreignKey: "user_id",
  as: "profile"
});
