const { login } = require("../services/auth");

module.exports = {
  login: async (req, res, next) => {
    try {
      let { email, password } = req.body;
      try {
        let user = await login(email, password);

        if (!user) {
          return res.status(400).json({
            status: false,
            message: "Email tidak terdaftar",
            data: null,
          });
        }

        const token = generateToken();

        return res.status(200).json({
          status: true,
          message: "Users login berhasil",
          data: token,
        });
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: "Invalid email or password",
          data: null,
        });
      }
    } catch (err) {
      next(err);
    }
  },
};

function generateToken() {
  const tokenLength = 32;
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token = "";
  for (let i = 0; i < tokenLength; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}
