import Alert from "../models/alerts.js";

export const getAllAlerts = async (req, res, next) => {
  let alerts;
  try {
    alerts = await Alert.find();
  } catch (err) {
    console.log(err);
  }

  if (!alerts) {
    return res.status(404).json({ message: "no data found" });
  }
  return res.status(200).json({ alerts });
};

export const addAlert = async (req, res, next) => {
  const { group, headline, description, image, address, city, state, zip } =
    req.body;
  const alert = new Alert({
    group,
    headline,
    description,
    image,
    address,
    city,
    state,
    zip,
  });
  try {
    await alert.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ alert });
};

export const deleteAlert = async (req, res, next) => {
  const id = req.params.id;

  let alert;
  try {
    alert = await Alert.findByIdAndRemove(id);
  } catch (err) {
    return console.log(err);
  }
  if (!alert) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Successfully Deleted" });
};
