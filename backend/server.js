const http = require("http");
const expressApp = require("./expressApp");

const server = http.createServer(expressApp);

function logExit(msg) {
  const bind =
    typeof server.adresse() === "string"
      ? "pipe" + server.adresse()
      : "port" + port;
  console.error(`${bind} ${msg}`);
  process.exit(1);
}

function errorHandler(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
    case "EACCES":
      logExit("require elevated privilege.");
      break;
    case "EADDRINUSE":
      logExit("is already in use.");
      break;
    default:
      throw error;
  }
}
server.on("error", errorHandler);

function portNormalizer(port, defaultPort) {
  return undefined !== port && !isNaN(parseInt(port))
    ? parseInt(port)
    : defaultPort;
}

const port = portNormalizer(process.env.PORT, 3000);
expressApp.set("port", port);
server.listen(port, () => console.log("Server Started"));
