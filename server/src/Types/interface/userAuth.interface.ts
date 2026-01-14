export interface IUserAuthJWt {
  id: string;
  email: string;
  role: "user" | "admin";
}
