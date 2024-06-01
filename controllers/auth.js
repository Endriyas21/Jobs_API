const register = async (req, res) => {
  res.send("user register");
};

const login = async (req, res) => {
  res.send("login user");
};

module.exports = { register, login };
