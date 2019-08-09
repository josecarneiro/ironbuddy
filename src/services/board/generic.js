import axios from "axios";
import { makeQuery } from "./../../util/url";

const TRELLO_API_URL = 'https://api.trello.com/1';

const makeURL = ({ id }) =>
  `${ TRELLO_API_URL }/boards/${id}?${makeQuery({
    fields: [
      // "all",
      // "id",
      // "name",
      // "desc",
      // "descData",
      // "closed",
      // "idOrganization",
      // "pinned",
      // "shortUrl",
      // "shortUrl",
      // "prefs",
      // "labelNames",
      // "badges"
      // "shortLink",
      "dateLastActivity"
    ],
    lists: "open",
    list_fields: [
      "id",
      "name"
    ],
    cards: "visible",
    card_fields: [
      "id",
      "name",
      // "desc",
      "due",
      "labels",
      "idList",
      "manualCoverAttachment"
      // "shortLink"
    ],
    card_attachments: true,
    // card_attachment_fields: 'all'
    card_attachment_fields: [
      "id",
      'name',
      'url',
      "edgeColor",
      "previews",
      "bytes"
    ],
    // card_label_fields: [ "id", "name" ],
    // labels: "all",
    // label_fields: [ "id", "name" ]
  })}`;

const attachmentParser = attachments => attachments.map(({
  id,
  name,
  url,
  previews = [],
  bytes = 0
}) => ({
  id,
  name,
  url,
  preview: (previews.find(({ height }) => height === 600) || {}).url || null,
  previews: previews.map(({ width, height, url }) => ({ size: [ width, height ], url })),
  isFile: !!bytes
}));

const boardParser = ({ lists, cards }) => ({
  columns: lists.map(({ id, name }) => ({
    id,
    name,
    cards: cards
      .filter(({ idList: list }) => list === id)
      .map(({
        id,
        name,
        labels = [],
        desc: body,
        due,
        attachments = []
      }) => ({
        id,
        name,
        body,
        ...due && { date: new Date(due) },
        labels: labels.map(({ id, name, color }) => ({ id, name, color })),
        attachments: attachmentParser(attachments)
      }))
  }))
});

export default async ({ id }) => {
  const URL = makeURL({ id });
  try {
    const result = await axios.get(URL);
    const data = boardParser(result.data);
    return data;
  } catch (error) {
    console.log("Error loading board");
    console.error(error);
    throw error;
  }
};
