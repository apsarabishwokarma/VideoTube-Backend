const unknownEndPoint = async (req, res, next) => {
  res.json({ message: "No such endpoints defined" });
  next();
};

export default unknownEndPoint;
