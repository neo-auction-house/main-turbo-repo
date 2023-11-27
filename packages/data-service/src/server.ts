import { createYoga, createSchema } from "graphql-yoga";
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import resolvers from "./resolvers";
import { DataSource, LocalDataSource } from "./dataSource";

const typeDefs = readFileSync("./src/schema.graphql", "utf8");
// console.log("resolvers: ", resolvers);
const schema = createSchema({ typeDefs, resolvers });
const dataSource: DataSource = new LocalDataSource();
const yoga = createYoga({ schema, context: { dataSource } });
const server = createServer(yoga);

// Start the server and you're done!
server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});