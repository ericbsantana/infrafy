import fastify from "fastify";

const server = fastify();

server.get("/", async (request, reply) => {
  reply.code(200).header("Content-Type", "text/plain").send("OK");
});

server.listen({ host: "0.0.0.0", port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
