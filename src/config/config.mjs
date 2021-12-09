import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV === "production" ? "prod.env" : "local.env"
  ),
});

export const Config = {
  General: {
    Port: process.env.PORT,
  },
  Notion: {
    Token: process.env.NOTION_TOKEN,
    MaterialsDatabaseId: process.env.NOTION_MATERIALS_DATABASE_ID,
  },
  Git: {
    MaterialsRepository: process.env.GIT_MATERIALS_REPOSITORY,
    TempFolder: process.env.GIT_TEMP_FOLDER,
  },
};
