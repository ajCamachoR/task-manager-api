export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  resetPasswordToken?: String;
  resetPasswordExpires?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
