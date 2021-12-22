import { IsString } from 'class-validator';

export interface UserState {
  user?: UserData;
}

export interface UserData {
  id: string;
  name: string;
  isAdmin: boolean;
}

export class LoginRequestBody {
  @IsString()
  id: string;
  @IsString()
  password: string;

  constructor(id: string, password: string) {
    this.id = id;
    this.password = password;
  }
}

export class SignupRequestBody extends LoginRequestBody {
  @IsString()
  name: string;

  constructor(id: string, password: string, name: string) {
    super(id, password);
    this.name = name;
  }
}
