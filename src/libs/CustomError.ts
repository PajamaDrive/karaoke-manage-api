import { Status } from 'oak';

export class CustomError extends Error {
  statusCode: Status;

  constructor(statusCode: Status, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
