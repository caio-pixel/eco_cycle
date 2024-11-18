const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// POST login
router.post('/login', async (req, res, next) => {
  const { email, senha } = req.body;

  try {
    // Verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ error: 'Email ou senha incorretos.' });
    }

    // Comparar a senha
    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Email ou senha incorretos.' });
    }

    // Gerar o token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    // Enviar o token no response
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
