export interface User{
  username: string;
  password: string;
}

export interface UserResponse{
  mesagge: string;
  token: string;


}
export interface registerOk{
}

export interface UserRegister{
  username:string,
  password:string,
  email: string
}
