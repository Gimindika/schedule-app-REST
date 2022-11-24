import { Request } from "express";

export interface IMember {
  member_id: number;
  name: string;
  profile_color: string;
}

export interface IGetMemberReq extends Request<{ member_id: IMember["member_id"] }> {}
export interface IAddMemberReq extends Request {}
export interface IUpdateMemberReq
  extends Request<{ member_id: IMember["member_id"] }, any, IMember> {}
export interface IDeleteMemberReq
  extends Request<{ member_id: IMember["member_id"] }> {}
