import Fastify from "fastify";
import { itemsRoutes } from "src/items/items.routes.ts";

const fastify = Fastify({
  logger: true,
});

await fastify.register((await import("@fastify/middie")).default);

// Искуственная задержка ответов, чтобы можно было протестировать состояния загрузки
fastify.use((_, __, next) =>
  new Promise((res) => setTimeout(res, 300 + Math.random() * 700)).then(next),
);

// Настройка CORS
fastify.options("/*", (_, reply) => {
  reply
    .header("Access-Control-Allow-Origin", "*")
    .header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS")
    .header("Access-Control-Allow-Headers", "Content-Type")
    .status(204)
    .send();
});

fastify.use((_, reply, next) => {
  reply.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

fastify.register(itemsRoutes);

const port = 8080;

fastify.listen({ port }, function (err, _address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  fastify.log.debug(`Server is listening on port ${port}`);
});
