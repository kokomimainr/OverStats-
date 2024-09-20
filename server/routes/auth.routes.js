const UserServices = require("../services/User.services");
const bcrypt = require("bcrypt");
const generateTokens = require("../utils/authUtils");
const router = require("express").Router();

router.post("/reg", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (name.trim() === '' || email.trim() === ''  || password.trim() === '' || role.trim() === '' ) {
      res.status(400).json({ message: "Empty" });
      return;
    }
    const user = await UserServices.getUser(email);
    if (!user) {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await UserServices.createUser({
        name,
        email,
        password: hashPassword,
        role,
      });

      delete user.password;   

      res.locals.user = user      

      const { accessToken, refreshToken } = generateTokens({ user });

      res
        .status(201)
        .cookie("refreshToken", refreshToken, {
            maxAge: 1000 * 60 * 60 * 12,
            httpOnly: true,
        })
        .json({ message: "success", user, accessToken });
      return;
    }
    res.status(400).json({ message: "User already exists" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/authorization", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email.trim() === '' || password.trim() === '') {
        res.status(400).json({ message: "Пустоты" });
        return
    }

    const user = await UserServices.getUser(email);
    const match = await bcrypt.compare(password, user.password)

    if (user && match) {
        delete user.password
        console.log(user);
      const { accessToken, refreshToken } = generateTokens({user});
      res
        .status(200)
        .cookie("refreshToken", refreshToken, {
            maxAge: 1000 * 60 * 60 * 12,
            httpOnly: true,
        })
        .json({ message: "success", user, accessToken });
        return
    }

    res.status(400).json({ message: "User not found" });
    return
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/logout", (req, res) => {
  try {
    res.locals.user = undefined
    res.clearCookie("refreshToken").status(200).json({ message: "success" });
  } catch ({message}) {
    res.status(500).json({ message });
  }
})

module.exports = router;
