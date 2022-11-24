import { Request } from "express";

export enum months {
  january = "january",
  february = "february",
  march = "march",
  april = "april",
  may = "may",
  june = "june",
  july = "july",
  august = "august",
  september = "september",
  october = "october",
  november = "november",
  december = "december",
}

export interface IBatch {
  batch_id: number;
  schedule_year: number;
  schedule_month: months;
}

export interface IAddBatchReq extends Request<{}, any, IBatch> {}
export interface IUpdateBatchReq
  extends Request<{ batch_id: IBatch["batch_id"] }, any, IBatch> {}
export interface IDeleteBatchReq
  extends Request<
    { batch_id: IBatch["batch_id"] },
    { batch_id: IBatch["batch_id"] }
  > {}
