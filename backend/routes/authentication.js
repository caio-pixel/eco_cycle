const bcrypt = require("bcrypt");
const createError = require("http-errors");
const express = require("express");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const asyncHandler = require("../middlewares/asyncHandler");

const router = express.Router();
const prisma = new PrismaClient();

// user login
router.post("/login", async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload);

    // find the user by email
    const user = await prisma.user.findUnique({
      where: { email: payload.email } || { nome: payload.nome },
    });
    console.log(user);
    if (!user) {
      throw createError(401, "Invalid email or password.");
    }

    // compare passwords
    const isPasswordValid = await bcrypt.compare(payload.password, user.senha);

    if (!isPasswordValid) {
      throw createError(401, "Invalid email or password.");
    }

    // generate token
    const token = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET,

      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
      }
    );
    console.log(token);

    // send token as response
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Login successful.",
      token,
    });
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
});

// user logout
router.post(
  "/logout",
  asyncHandler(async (req, res) => {
    return res.sendStatus(204);
  })
);

module.exports = router;
