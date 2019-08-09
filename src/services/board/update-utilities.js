const extractEventLinkFromAttachments = attachments => {
  return (attachments.find(({ isFile }) => !isFile) || {});
};

const extractEventDescriptionFromBody = body => {
  return body.replace(/\[Link\]\((.*?)\)/, '').trim();
}

const extractEventTypeFromBody = body => {
  if (body.toLowerCase().includes('meetup')) return 'meetup';
  return null;
}

export const extractUpdatesFromBoard = board => {
  const updates = board.columns
    .filter(({ name }) => name.toLowerCase().includes("campus"))
    .map(({ cards }) => cards)
    .find(item => item);
  return (updates || [])
    .map(({
      id,
      name: title,
      body: description
    }) => ({
      id,
      title,
      description: description || null
    }));
}
