import { execute } from './../utils/mysql.connector';

import { EventsQueries } from './events.queries';
import { IEvent } from './events.model';

/**
 * gets active Events
 */
export const getEvents = async () => {
	return execute<IEvent[]>(EventsQueries.GetEvents, []);
};

/**
 * gets a Event based on id provided
 */
export const getEventById = async (id: IEvent['event_id']) => {
	return execute<IEvent>(EventsQueries.GetEventById, [id]);
};

/**
 * adds a new active Event record
 */
export const insertEvent = async (event: IEvent) => {
	const result = await execute<{ insertId: number }>(EventsQueries.AddEvent, [
		event.title,
		event.recurrence,
	]);
	return result.insertId;
};

/**
 * updates Event information based on the id provided
 */
export const updateEvent = async (event: IEvent) => {
	const result = await execute<{ affectedRows: number }>(
		EventsQueries.UpdateEvent,
		[event.title, event.recurrence, event.event_id]
	);
	return result.affectedRows > 0;
};

/**
 * updates Event information based on the id provided
 */
export const deleteEvent = async (id: IEvent['event_id']) => {
	const result = await execute<{ affectedRows: number }>(
		EventsQueries.DeleteEvent,
		[id]
	);
	return result.affectedRows > 0;
};
