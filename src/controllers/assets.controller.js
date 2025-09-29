import { AssetModel } from "../models/mongoose/asset.model.js";

export const createAsset = async (req, res) => {
   const {inventoryNumber, brand, model, status,acquisitionDate, acquisitionValue, description, category}= req.body
  try {
    const newAsst = await AssetModel.create({
      inventoryNumber: inventoryNumber,
      brand: brand,
      model: model,
      status: status,
      acquisitionDate: acquisitionDate,
      acquisitionValue: acquisitionValue,
      responsible: req.user.id,
      description: description,
      category: category
    })

    return res.status(201).json({ msg: "Asset creado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllAssets = async (_req, res) => {
  try {
    // TODO: listar assets con el responsible y sus categories (populate) (solo admin)
    const assets = await AssetModel.find().populate([{path: "responsible", selct: "-_id -password"}])
    return res.status(200).json({ data: assets });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getMyAssets = async (req, res) => {
  try {
    // TODO: assets con sus categories (populate) del usuario logueado (solo si el usuario logueado es responsible de assets)
    const myAssets = await AssetModel.find({responsible: req.user.id}).populate([{path: "category", selct: "-_id"}])
    return res.status(200).json({ data: myAssets });
  } catch (error) {
       console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteAsset = async (req, res) => {
  const id = req.params.id
  try {

    const asset = await AssetModel.findById(id);
    
    if(asset.responsible == req.user.id){
      await asset.deleteOne();
    }

    return res.status(200).json({ msg: "Asset eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
