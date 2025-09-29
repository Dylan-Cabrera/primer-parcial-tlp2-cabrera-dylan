import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { signToken } from "../helpers/jwt.helper.js";
import { UserModel } from "../models/mongoose/user.model.js";

export const register = async (req, res) => {
  const { username, email, password, role, profile} = req.body;
  try {

    const hashedPassword = await hashPassword(password);

    const newUser = await UserModel.create({
      username: username,
      email: email,
      role: role,
      password: hashedPassword,
      profile: profile
    })


    return res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  const {email, password} = req.body;
  try {

    const user = await UserModel.findOne({email: email});
    if(!user) {
      return res.status(404).json({
        msg: "Usurio no encontrado"
      })
    };

    const verifyPassword = await comparePassword(password, user.password);
    if(!verifyPassword) {
      return res.status(401).json({
        msg: "Credenciales incorrectas" 
      })
    };

    const token = await signToken({
      id: user._id,
      username: user.username,
      role: user.role
    })

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000*60*60
    })

    return res.status(200).json({ msg: "Usuario logueado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);

    return res.status(200).json({ data: user.profile });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ msg: "Sesión cerrada correctamente" });
};
