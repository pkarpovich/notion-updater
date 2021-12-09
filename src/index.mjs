import express from "express";

import { Config } from "./config/config.mjs";
import { ConfigService } from "./services/config-service.mjs";
import { NotionService } from "./services/notion-service.mjs";
import { FilesService } from "./services/files-service.mjs";
import { GitService } from "./services/git-service.mjs";
import { UpdaterService } from "./services/updater-service.mjs";

const configService = new ConfigService({ config: Config });
const filesService = new FilesService();
const notionService = new NotionService({ configService });
const gitService = new GitService();
const updaterService = new UpdaterService({
  configService,
  notionService,
  filesService,
  gitService,
});

await updaterService.updateDocumentation();

const http = express();
const httpPort = configService.get("General.Port");
// eslint-disable-next-line no-console
http.listen(httpPort, () => console.log(`Starting server on port ${httpPort}`));
