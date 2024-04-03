import fastify from "fastify";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const server = fastify();

server.get("/", async (_request, reply) => {
  reply.code(200).header("Content-Type", "text/plain").send("OK");
});

server.get("/reviews", async (_request, reply) => {
  const reviews = await prisma.review.findMany()
  reply.send(reviews)
})

server.post<{ Body: IReviewBody }>('/reviews', async (request, reply) => {
  const { text } = request.body

  const post = await prisma.review.create({
    data: {
      text
    },
  })

  reply.send(post)
})

server.listen({ host: "0.0.0.0", port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

interface IReviewBody { text: string }
