import { Request } from "express";

export interface IBatch {
  batch_id: number;
  schedule_year: number;
  schedule_month: string;
}

export interface IAddBatchReq extends Request<{}, IBatch, any> {}
export interface IUpdateBatchReq
  extends Request<{ batch_id: IBatch["batch_id"] }, any, IBatch> {}
export interface IDeleteBatchReq
  extends Request<
    { batch_id: IBatch["batch_id"] },
    { batch_id: IBatch["batch_id"] }
  > {}
