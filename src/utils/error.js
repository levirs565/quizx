class ClientError extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'ClientError';
    this.message = msg;
    this.stack = new Error().stack;
  }
}

exports.ClientError = ClientError;

exports.sendError = res => err => {
  if (!(err instanceof ClientError)) {
    res.status(500);
    console.error(err);
  }

  res.json({
    error: String(err)
  });
};
