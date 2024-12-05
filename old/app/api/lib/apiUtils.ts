import bcrypt from "bcrypt";

export function hashPassword(raw: string) {
  if (!raw) {
    throw Error("Password is not present");
  }
  return bcrypt.hashSync(raw, bcrypt.genSaltSync(10));
}
