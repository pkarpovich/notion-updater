import { nanoid } from "nanoid";

export class Id {
  static generate() {
    return nanoid();
  }
}
