const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const post = express();
post.use(bodyParser.json());

const prisma = new PrismaClient();

post.get("/notes/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
    });
    res.json(posts);
  } catch (e) {
    res.json(e);
  }
});

post.post("/notes", async (req, res) => {
  const { title, body, authorId } = req.body;
  const slug = title.toLowerCase().replace(/ /g, "-");
  try {
    const post = await prisma.post.create({
      data: {
        slug,
        title,
        body,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    });
    res.json(post);
  } catch (e) {
    res.json(e);
  }
});

post.put("/notes/:id", async (req, res) => {
  const { title, body } = req.body;
  const slug = title.toLowerCase().replace(/ /g, "-");
  const id = req.params.id;
  try {
    const post = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        slug,
        title,
        body,
      },
    });
    res.json(post);
  } catch (e) {
    res.json(e);
  }
});

post.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.delete({
      where: {
        id: id,
      },
    });
    res.json(post);
  } catch (e) {
    res.json(e);
  }
});

module.exports = post;
