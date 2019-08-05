import loadBoard from "./generic";
import { boardId as BOARD_ID } from "./../../config";

import { extractScheduleFromBoard } from './schedule-utilities';
import { extractEventsFromBoard } from './event-utilities';

export default async () => {
  try {
    const board = await loadBoard({ id: BOARD_ID });
    const schedule = extractScheduleFromBoard(board);
    const events = extractEventsFromBoard(board);
    const resources = {};
    return { schedule, events, resources };
  } catch (error) {
    console.log("Error extracting board data");
    console.error(error);
    throw error;
  }
};
