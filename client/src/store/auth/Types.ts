export interface LoginCreds {
  email: string;
  password: string;
}
export interface SignUpCreds {
  name:string;
  email: string;
  password: string;
}

export interface UserType {
  id: number;
  name: string;
  email: string;
  verified: boolean;
}
