import { model, Schema } from "mongoose";

// TODO: completar relacion embebida y configurar el virtuals para el populate inverso con assets

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["secretary", "administrator"],
      default: "secretary",
    },
    deletedAt: { type: Date, default: null },
    profile: {
      first_name: {
        type: String,
        require: true,
        length: [2,50],
      },
      last_name: {
        type: String,
        require: true,
        length: [2,50],
      },
      emproyee_number: {
        type: String,
        unique: true,
        require: true
      },
      phone: {
        type: String
      }
    }
  },
  { timestamps: true }
);

// ! FALTA COMPLETAR ACA

export const UserModel = model("User", UserSchema);
