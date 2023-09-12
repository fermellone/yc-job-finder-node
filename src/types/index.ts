import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";

export interface Request extends ExpressRequest {}

export interface Response extends ExpressResponse {}

export interface Company {
  id: string;
  name: string;
  website: string;
  slug: string;
  description: string;
  primaryVertical: string;
  oneLiner: string;
  hiringDescription: string;
  techDescription: string;
}

export class HttpError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}
