import express from "express";

import { Config } from "./config/config.mjs";
import { ConfigService } from "./services/config-service.mjs";

const configService = new ConfigService({ config: Config });

const http = express();

const httpPort = configService.get("General.Port");
// eslint-disable-next-line no-console
http.listen(httpPort, () => console.log(`Starting server on port ${httpPort}`));
