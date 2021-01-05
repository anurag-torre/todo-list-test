const http = require("http");
const app = require("./src/app.js");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.on("listening", () => {
  console.log(`Server started on Port : ${port}`);
});

server.listen(port);
