/* eslint-disable no-unused-vars */

enum httpStatus {
  ok = 200,
  created = 201,
  accepted = 202,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  methodNotAllowed = 405,
  conflict = 409,
  internalServerError = 500,
  serviceUnavailable = 503,
}

export default httpStatus;
