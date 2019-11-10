exports.throwNull = msg => val => {
  if (val == null) throw msg;

  return val;
};

exports.sendError = res => err => {
  res.json({
    error: String(err)
  });
};
