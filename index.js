const server = require("./api/server");

const localHost = "127.0.0.1";
const port = 5000;

server.listen(port, () => {
  console.log(`server listening on ${localHost}:${port}`);
});
