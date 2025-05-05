/*
  generateSalt() is used to generate a unique salt value for each user. 
  This ensures that even if two users have the same password, their encrypted passwords will be different.
  The salt helps prevent the use of rainbow tables or precomputed hashes to crack passwords.
*/

import { ref, set } from "firebase/database";
import { database } from "../firebase/firebaseConfig";
import * as Crypto from "expo-crypto";

export async function generateSalt(user) {
  try {
    const saltBytes = await Crypto.getRandomBytesAsync(16);
    const saltHex = bytesToHex(saltBytes);

    await set(ref(database, `users/${user.uid}/salt`), saltHex);
  } catch (error) {
    console.error("Error generating salt: ", error);
    throw new Error("Error generating salt");
  }
}

/*
This function converts a byte array into hexadecimal string. 
Generated using Ghat.gpt.
*/
function bytesToHex(saltBytes) {
  return Array.from(saltBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
