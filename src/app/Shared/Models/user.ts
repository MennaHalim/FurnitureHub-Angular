export class RegistrationUser {
  constructor(public firstName : string,
    public lastName: string,
    public email: string,
    public password: string,
    public confirmPassword: string
    ){}
}

export interface userInfo{
  firstName:string;
  lastName:string;
  email: string;
}