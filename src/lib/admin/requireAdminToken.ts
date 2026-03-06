export class AdminAuthError extends Error {
  status: number;

  constructor(message: string, status = 401) {
    super(message);
    this.name = 'AdminAuthError';
    this.status = status;
  }
}

export const requireAdminToken = (req: Request): void => {
  const expectedToken = process.env.ADMIN_API_TOKEN;

  if (!expectedToken) {
    throw new AdminAuthError('ADMIN_API_TOKEN is not configured on the server.', 500);
  }

  const providedToken = req.headers.get('x-admin-token');

  if (!providedToken) {
    throw new AdminAuthError('Missing x-admin-token header.', 401);
  }

  if (providedToken !== expectedToken) {
    throw new AdminAuthError('Invalid admin token.', 401);
  }
};
