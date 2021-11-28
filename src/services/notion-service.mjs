import { Client, LogLevel } from "@notionhq/client";

export class NotionService {
  #notionClient = null;

  #configService = null;

  constructor({ configService }) {
    this.#configService = configService;

    this.#notionClient = new Client({
      auth: configService.get("Notion.Token"),
      logLevel: LogLevel.DEBUG,
    });
  }

  async getDatabaseById(databaseId) {
    return this.#notionClient.databases.query({
      database_id: databaseId,
    });
  }

  async createPage(databaseId, { title }) {
    return this.#notionClient.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        Id: { number: 2 },
        Name: {
          title: [
            {
              text: {
                content: title,
              },
            },
          ],
        },
      },
      children: [
        {
          object: "block",
          type: "heading_2",
          heading_2: {
            text: [{ type: "text", text: { content: "Lacinato kale" } }],
          },
        },
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            text: [
              {
                type: "text",
                text: {
                  content:
                    "Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.",
                  link: { url: "https://en.wikipedia.org/wiki/Lacinato_kale" },
                },
              },
            ],
          },
        },
      ],
    });
  }
}
