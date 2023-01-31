export const generateBadRequestResponse = (args) => generateResponseError({ ...args, status: 400 });
export const generateNotFoundRequestResponse = (args) => generateResponseError({ ...args, status: 404 });
export const generateServerErrorResponse = (args) => generateResponseError({ ...args, status: 500 });

export const generateResponseError = ({ res, ctx, status, message }) => res(ctx.status(status), ctx.json({ status, message }));

export const verifyAuthorization = (req, res, ctx) => {
  if (!req?.headers?.get("authorization")) {
    return () => res(ctx.status(401), ctx.json({ status: 401, message: "Unauthorized!" }));
  }

  return (fn) => fn?.(req, res, ctx);
};

export function setTokenInStorage(token) {
  try {
    localStorage.setItem(import.meta.env.REACT_APP_TOKEN_KEY, JSON.stringify(token));
  } catch (error) {
    return null;
  }
}
