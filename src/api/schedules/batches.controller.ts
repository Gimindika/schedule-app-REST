import { Request, RequestHandler, Response } from "express";
import {
  IAddBatchReq,
  IDeleteBatchReq,
  IUpdateBatchReq,
} from "./batches.model";
import * as BatchesService from "./batches.service";

/**
 * Get active batches records
 *
 * @param req Express Request
 * @param res Express Response
 */
export const getBatches: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const batches = await BatchesService.getBatches();

    res.status(200).json({
      batches,
    });
  } catch (error) {
    console.error(
      "[schedules.controller][getBatches][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when fetching batches",
    });
  }
};

/**
 * Inserts a new batch record based
 *
 * @param req Express IAddBatchReq
 * @param res Express Response
 */
export const addBatch: RequestHandler = async (
  req: IAddBatchReq,
  res: Response
) => {
  try {
    const result = await BatchesService.addBatch(req.body);
    res.status(200).json({
      result,
    });
  } catch (error) {
    console.error(
      "[schedule.controller][addBatch][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when adding new batch",
    });
  }
};

/**
 * Updates existing batch record
 *
 * @param req Express IUpdateBatchReq
 * @param res Express Response
 */
// @ts-ignore
export const updateBatchById: RequestHandler = async (
  req: IUpdateBatchReq,
  res: Response
) => {
  try {
    const result = await BatchesService.updateBatch({
      ...req.body,
      batch_id: req.params.batch_id,
    });

    res.status(200).json({
      result,
    });
  } catch (error) {
    console.error(
      "[schedule.controller][updateBatchById][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when updating batch",
    });
  }
};

/**
 * deletes a batch
 *
 * @param req Express IDeleteBatchReq
 * @param res Express Response
 */
// @ts-ignore
export const deleteBatchById: RequestHandler = async (
  req: IDeleteBatchReq,
  res: Response
) => {
  try {
    const result = await BatchesService.deleteBatch(req.params.batch_id);

    res.status(200).json({
      result,
    });
  } catch (error) {
    console.error(
      "[schedule.controller][deleteBatchById][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when deleting batch",
    });
  }
};
