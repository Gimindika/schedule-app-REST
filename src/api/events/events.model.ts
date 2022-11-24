import { Request } from "express";

export enum days {
  monday = "monday",
  tuesday = "tuesday",
  wednesday = "wednesday",
  thursday = "thursday",
  friday = "friday",
  saturday = "saturday",
  sunday = "sunday",
}

export interface IEvent {
  event_id: number;
  title: string;
  recurrence: days;
}

export interface IGetEventReq
  extends Request<{ event_id: IEvent["event_id"] }> {}
export interface IAddEventReq extends Request {}
export interface IUpdateEventReq
  extends Request<{ event_id: IEvent["event_id"] }, any, IEvent> {}
export interface IDeleteEventReq
  extends Request<{ event_id: IEvent["event_id"] }> {}
