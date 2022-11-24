export const BatchesQueries = {
  GetBatches: `
      SELECT * FROM 
        batches`,
  AddBatch: `
      INSERT INTO 
        batches(schedule_year, schedule_month)
      VALUES(?,?) `,
  UpdateBatch: `
      UPDATE 
        batches 
      SET 
        schedule_year = ?, 
        schedule_month = ? 
      WHERE 
        batch_id = ?`,
  DeleteBatch: `
      DELETE FROM
        batches
      WHERE
        batch_id = ?`,
};
