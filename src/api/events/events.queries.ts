export const EventsQueries = {
  GetEvents: `
    SELECT * FROM 
      events`,
  GetEventById: `
    SELECT * FROM 
      events 
    WHERE 
      event_id = ?`,
  AddEvent: `
    INSERT INTO 
      events(title, recurrence) 
    VALUES (? , ?) `,
  UpdateEvent: `
    UPDATE 
      events 
    SET 
      title = ?, 
      recurrence = ? 
    WHERE 
      event_id = ?
    `,
  DeleteEvent: `
    DELETE FROM 
      events
    WHERE 
      event_id = ?
  `,
};
