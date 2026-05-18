export const sendResponse = (res, { statusCode = 200, message, data } = {}) =>
  res.status(statusCode).json({
    ...(message ? { message } : {}),
    ...(data !== undefined ? { data } : {})
  });

export const sendSuccess = (res, { statusCode = 200, data } = {}) =>
  sendResponse(res, { statusCode, data });
