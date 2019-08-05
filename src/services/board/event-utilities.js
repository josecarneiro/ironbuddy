// const extractEventLinkFromBody = body => {
//   const capture = body.match(/\[Link\]\((?<url>.*?)\)/);
//   const { groups: { url } = {} } = capture || {};
//   return url;
// }

// const extractEventLinkFromAttachments = attachments => (attachments.find(({ bytes }) => !bytes) || {});
const extractEventLinkFromAttachments = attachments => {
  console.log(attachments);
  return (attachments.find(({ isFile }) => !isFile) || {});
};

const extractEventDescriptionFromBody = body => {
  return body.replace(/\[Link\]\((.*?)\)/, '').trim();
}

const extractEventTypeFromBody = body => {
  if (body.toLowerCase().includes('meetup')) return 'meetup';
  return null;
}

export const extractEventsFromBoard = board => {
  // debugger;
  const column = board.columns
    .filter(({ name }) => name.toLowerCase().includes("events"))
    .map(({ cards }) => cards)
    .find(item => item)
    .map(({ id, name, body, attachments, ...event }) => ({
      id,
      type: extractEventTypeFromBody(body),
      name,
      link: extractEventLinkFromAttachments(attachments),
      description: extractEventDescriptionFromBody(body),
      ...event
    }));
  if (!column) return [];
  const events = column;
  return events;
}
