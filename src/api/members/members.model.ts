import { Request } from "express";

export interface IMember {
  id: number;
  name: string;
  profileColor: string;
}

export interface IGetMembersReq extends Request {}
export interface IGetMemberReq extends Request<{ id: IMember["id"] }> {}
export interface IAddMemberReq extends Request {}
export interface IUpdateMemberReq
  extends Request<{ id: IMember["id"] }, any, IMember> {}
export interface IDeleteMemberReq extends Request<{ id: IMember["id"] }> {}
