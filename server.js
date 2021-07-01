const dotenv = require("dotenv");

/**
 * @param {string} process.env.DATABASE
 * @param {string} process.env.DATABASE_PASSWORD
 * @param {string} process.env.DATABASE_NAME
 * @param {string} process.env.PORT
 */
process.on("uncaughtException", (err) => {
  // eslint-disable-next-line no-console
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  // eslint-disable-next-line no-console
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./.env" });
const app = require('./app');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  // eslint-disable-next-line no-console
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  // eslint-disable-next-line no-console
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1); 
  });
});
