const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const user = express();
user.use(bodyParser.json());

const prisma = new PrismaClient();

user.get("/user", async (req, res) => {
  try {
    const users = await prisma.user.findMany({});
    res.json(users);
  } catch (e) {
    res.json(e);
  }
});

user.get("/user/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        posts: true,
      },
    });
    res.json(user);
  } catch (e) {
    res.json(e);
  }
});

user.post("/user", async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    res.json(user);
  } catch (e) {
    res.json(e);
  }
});

user.put("/user/:id", async (req, res) => {
  const { name, email } = req.body;
  const id = req.params.id;
  try {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name,
        email,
      },
    });
    res.json(user);
  } catch (e) {
    res.json(e);
  }
});

user.delete("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    res.json(user);
  } catch (e) {
    res.json(e);
  }
});

module.exports = user;
