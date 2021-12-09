import { Id } from "../models/id.mjs";

export class UpdaterService {
  #configService = null;

  #notionService = null;

  #gitService = null;

  #filesService = null;

  constructor({ configService, gitService, notionService, filesService }) {
    this.#configService = configService;
    this.#notionService = notionService;
    this.#filesService = filesService;
    this.#gitService = gitService;
  }

  async updateDocumentation() {
    const tempFolderDist = this.#configService.get("Git.TempFolder");
    const tempFolderPath = this.#filesService.getFullPath(
      `${tempFolderDist}/${Id.generate()}`
    );
    await this.#filesService.createFolder(tempFolderPath);

    const repositoryUrl = this.#configService.get("Git.MaterialsRepository");
    await this.#gitService.clone(repositoryUrl, tempFolderPath);

    const mdFiles = await this.#filesService.getFolderFilesWithContent(
      tempFolderPath,
      (fileName) => fileName.split(".").slice(-1)[0] === "md"
    );

    for (const [fileName, fileContent] of mdFiles) {
      const lines = fileContent.split("\n").filter((l) => l.length > 0);
      const notionBlocks = lines.map((lc) =>
        this.#notionService.mdLine2notionBlock(lc)
      );
    }

    await this.#filesService.removeFolder(tempFolderPath);

    // const materialsDatabaseId = this.#configService.get("Notion.MaterialsDatabaseId");
    // const database = await notionService.getDatabaseById(materialsDatabaseId);
    // const page = await notionService.createPage(materialsDatabaseId, {
    //   title: "New Module",
    // });
  }
}
