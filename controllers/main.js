const login = async (req, res) => {
  res.send("Fake Login / register /signup route");
};

const dashboard = async (req, res) => {
  const luckyNumber = Meth.floor(Math.random() * 100);
  res
    .status(200)
    .json({
      msg: "Hello, John Doe",
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}.`,
    });
};

module.exports = {
  login,
  dashboard,
};
