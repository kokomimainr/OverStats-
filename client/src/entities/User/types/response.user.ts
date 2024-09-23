import { User } from "./user";

export type responseUser = {
  message: string;
  user: User;
  accessToken: string;
};
