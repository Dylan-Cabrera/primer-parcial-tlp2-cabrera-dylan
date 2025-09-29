import { AssetModel } from "../models/mongoose/asset.model.js";
import { CategoryModel } from "../models/mongoose/category.model.js";

export const createCategory = async (req, res) => {
  const {name, description} = req.body;
  try {
    // TODO: crear category (solo admin)
    const newCategory = await CategoryModel.create({
      name: name,
      description: description
    })
    return res.status(201).json({ msg: "Categoría creada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllCategories = async (_req, res) => {
  try {
    // TODO: listar categories con sus assets (populate inverso) (solo admin)
    const categories = await CategoryModel.find()
    return res.status(200).json({ data: categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    // TODO: eliminar category (solo admin) y actualizar assets que referencian
    const category = await CategoryModel.findById(req.params.id);
    await AssetModel.updateMany({category: category._id}, {
       $pull: {category: category._id}
    })
 
      await category.deleteOne();
      
    return res.status(200).json({ msg: "Categoría eliminada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
