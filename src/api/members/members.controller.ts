import { Request, RequestHandler, Response } from "express";
import * as MembersService from "./members.service";
/**
 * Get active team records
 *
 * @param req Express Request
 * @param res Express Response
 */
export const getMembers: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const teams = await MembersService.getMembers();

    res.status(200).json({
      teams,
    });
  } catch (error) {
    console.error(
      "[teams.controller][getTeams][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when fetching teams",
    });
  }
};
