import Tip from "../models/tip.js";

export const getAllTips = async (req, res, next) => {
  let tips;
  try {
    tips = await Tip.find();
  } catch (err) {
    console.log(err);
  }

  if (!tips) {
    return res.status(404).json({ message: "no data found" });
  }
  return res.status(200).json({ tips });
};

export const viewTip = async (req, res, next) => {
  const id = req.params.id;

  let tip;
  try {
    tip = await Tip.findByIdAndRemove(id);
  } catch (err) {
    return console.log(err);
  }
  if (!tip) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Successfully Deleted" });
};
