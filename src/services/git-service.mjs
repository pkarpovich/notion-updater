import clone from "git-clone/promise.js";

export class GitService {
  clone(repo, distPath) {
    return clone(repo, distPath);
  }
}
