export class EError extends Error {
  code: number

  constructor(code: number, msg: string) {
    super(msg);
    this.name = 'EError';
    this.message = msg;
    this.code = code;
    this.stack = new Error().stack;
  }
}

type EErrorArgs = [number, string]

export const E = {
  E201_SOAL_PAKET_NOT_FOUND: [201, 'Paket not found'] as EErrorArgs,
  E202_SOAL_NOT_FOUND: [202, 'Soal not found'] as EErrorArgs,
  E301_USER_ALREADY_REGISTERED: [301, 'User already registered'] as EErrorArgs,
  E302_USER_NOT_REGISTERED: [302, 'User not registered'] as EErrorArgs,
  E303_USER_LOGGED_IN: [303, 'User Logged in'] as EErrorArgs,
  E304_USER_NOT_LOGGED_IN: [304, 'User not logged in'] as EErrorArgs,
  E305_USER_PASSWORD_NOT_MATCH: [305, 'Password not match'] as EErrorArgs,
  E306_USER_IS_NOT_ADMIN: [306, 'Access denied. User is not admin'] as EErrorArgs,
  E307_ACCESS_DENIED: [307, 'Access denied'] as EErrorArgs,
  E401_PERMAINAN_NOT_STARTED: [401, 'Permainan not started'] as EErrorArgs,
  E402_PERMAINAN_NOT_FINISHED: [402, 'Permainan not finished '] as EErrorArgs,
  E403_PERMAINAN_SOAL_NOT_FOUND: [403, 'Soal not found'] as EErrorArgs,
  E404_GAME_NOT_FOUND: [404, 'Game not found'] as EErrorArgs
};
