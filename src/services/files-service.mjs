import { mkdir, rmdir, readFile, readdir } from "fs/promises";
import { resolve } from "path";

export class FilesService {
  getFullPath(path) {
    return resolve(path);
  }

  async createFolder(path, options = { recursive: true }) {
    return mkdir(path, options);
  }

  async removeFolder(path, options = { recursive: true, force: true }) {
    return rmdir(path, options);
  }

  async getFolderFilesWithContent(path, filesFilter = () => true) {
    const files = await readdir(path);
    const filteredFiles = files.filter(filesFilter);
    const filesWithContent = new Map();

    for (const file of filteredFiles) {
      const contentBuffer = await this.readFile(`${path}/${file}`);
      const content = contentBuffer.toString();

      filesWithContent.set(file, content);
    }

    return filesWithContent;
  }

  async readFile(path) {
    return readFile(path);
  }
}
