import { Request, RequestHandler, Response } from "express";
import {
  IAddMemberReq,
  IDeleteMemberReq,
  IGetMemberReq,
  IUpdateMemberReq,
} from "./members.model";
import * as MembersService from "./members.service";
/**
 * Get active member records
 *
 * @param req Express Request
 * @param res Express Response
 */
export const getMembers: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const members = await MembersService.getMembers();

    res.status(200).json({
      members,
    });
  } catch (error) {
    console.error(
      "[members.controller][getMembers][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when fetching members",
    });
  }
};

/**
 * Get Member record based on member_id provided
 *
 * @param req Express IGetMemberReq
 * @param res Express Response
 */
// @ts-ignore
export const getMemberById: RequestHandler = async (
  req: IGetMemberReq,
  res: Response
) => {
  try {
    const Member = await MembersService.getMemberById(req.params.member_id);

    res.status(200).json({
      Member,
    });
  } catch (error) {
    console.error(
      "[Members.controller][getMemberById][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when fetching Member",
    });
  }
};

/**
 * Inserts a new Member record based
 *
 * @param req Express IAddMemberReq
 * @param res Express Response
 */
export const addMember: RequestHandler = async (
  req: IAddMemberReq,
  res: Response
) => {
  try {
    const result = await MembersService.insertMember(req.body);
    res.status(200).json({
      result,
    });
  } catch (error) {
    console.error(
      "[Members.controller][addMember][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when adding new Member",
    });
  }
};

/**
 * Updates existing Member record
 *
 * @param req Express IUpdateMemberReq
 * @param res Express Response
 */
// @ts-ignore
export const updateMemberById: RequestHandler = async (
  req: IUpdateMemberReq,
  res: Response
) => {
  try {
    const result = await MembersService.updateMember({
      ...req.body,
      member_id: req.params.member_id,
    });

    res.status(200).json({
      result,
    });
  } catch (error) {
    console.error(
      "[Members.controller][updateMemberById][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when updating Member",
    });
  }
};

/**
 * deletes a Member
 *
 * @param req Express IDeleteMemberReq
 * @param res Express Response
 */
// @ts-ignore
export const deleteMemberById: RequestHandler = async (
  req: IDeleteMemberReq,
  res: Response
) => {
  try {
    const result = await MembersService.deleteMember(req.params.member_id);

    res.status(200).json({
      result,
    });
  } catch (error) {
    console.error(
      "[Members.controller][deleteMemberById][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when deleting Member",
    });
  }
};
