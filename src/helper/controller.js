exports.throwNull = msg => val => {
  if (!val) throw msg;

  return val;
};

exports.sendError = res => err => {
  res.json({
    error: String(err)
  });
};
