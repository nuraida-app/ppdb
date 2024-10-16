import pkg from "pg";

const { Client } = pkg;

// const config = {
//   user: "postgres",
//   password: "13090122",
//   host: "localhost",
//   database: "nuraida_ppdb",
//   port: 5432, // default port
// };

// Production
const config = {
  user: "postgres",
  password: "nibs2024*",
  host: "103.245.38.61",
  database: "nibs_ppdb",
  port: 5432,
};

const client = new Client(config);

const connect = async () => {
  try {
    await client.connect();
    const result = await client.query(`SELECT NOW() as current_time`);

    console.log(`Connected to ${result.rows[0].current_time}`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

export { client, connect };
