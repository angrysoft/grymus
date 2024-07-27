import { createHmac } from "crypto";

export function hashPassword(raw: string, salt: string |undefined) {
  if (! salt) {
    throw Error("Salt is not present")
  }
  const hash = createHmac("bcrypt", salt).update(raw).digest("hex");
  return hash;
}
