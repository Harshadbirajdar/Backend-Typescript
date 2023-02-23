export interface IApiError extends Error {
  statusCode: number;
}
class ApiError extends Error implements IApiError {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default ApiError;
