import express from "express";

import { Config } from "./config/config.mjs";
import { ConfigService } from "./services/config-service.mjs";
import { NotionService } from "./services/notion-service.mjs";

const configService = new ConfigService({ config: Config });
const notionService = new NotionService({ configService });

const materialsDatabaseId = configService.get("Notion.MaterialsDatabaseId");
const database = await notionService.getDatabaseById(materialsDatabaseId);
const page = await notionService.createPage(materialsDatabaseId, {
  title: "New Module",
});

console.log(database, page);

const http = express();

const httpPort = configService.get("General.Port");
// eslint-disable-next-line no-console
http.listen(httpPort, () => console.log(`Starting server on port ${httpPort}`));
