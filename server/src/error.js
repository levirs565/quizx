class EError extends Error {
  constructor(code, msg) {
    super(msg);
    this.name = 'EError';
    this.message = msg;
    this.code = code;
    this.stack = new Error().stack;
  }
}

exports.EError = EError;

exports.E = {
  E201_SOAL_PAKET_NOT_FOUND: [201, 'Paket not found'],
  E202_SOAL_NOT_FOUND: [202, 'Soal not found'],
  E301_USER_ALREADY_REGISTERED: [301, 'User already registered'],
  E302_USER_NOT_REGISTERED: [302, 'User not registered'],
  E303_USER_LOGGED_IN: [303, 'User Logged in'],
  E304_USER_NOT_LOGGED_IN: [304, 'User not logged in'],
  E305_USER_PASSWORD_NOT_MATCH: [305, 'Password not match'],
  E306_USER_IS_NOT_ADMIN: [306, 'Access denied. User is not admin'],
  E401_PERMAINAN_NOT_STARTED: [401, 'Permainan not started'],
  E402_PERMAINAN_NOT_FINISHED: [402, 'Permainan not finished '],
  E403_PERMAINAN_SOAL_NOT_FOUND: [403, 'Soal not found']
};
