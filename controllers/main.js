const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

// check username, password in POST request to /login
// if exists >> create new JWT
// else >> please provide valid username and pw
// send back to front-end

// setup authentication so only the request with JWT present can access the dashbaord.

const login = async (req, res) => {
  // check username, password in POST request to /login
  const { username, password } = req.body;
  // if not valid / don't exist >> please provide valid username and pw
  if (!username || !password) {
    throw new CustomAPIError("Please provide valid email and password.", 400);
  }
  // if exists >> create new JWT
  // create dummy ID  (just for demo purpose! normally provided by DB.)

  const id = new Date().getDate();
  // try to keep payload small, better experience for user
  // jwt.sign({payload}, secretOrPrivateKey, options?:{})
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // send token as data.token
  res.status(200).json({ msg: "User created.", token });
};

const dashboard = async (req, res) => {
  // HEADER VALIDATION
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No token provided.", 401);
  }

  const token = authHeader.split(" ")[1];
  console.log("token: ", token);

  // TOKEN VERIFICATION
  // jwt.verify(token, secretOrPublickey, [options, callback])
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded: ", decoded);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello, ${decoded.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}.`,
    });
  } catch (error) {
    throw new CustomAPIError("Not authorized to access this route.", 401);
  }
};

module.exports = {
  login,
  dashboard,
};
