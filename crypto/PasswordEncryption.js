import { getCurrentUser } from '../firebase/currentUser';
import { generateSalt } from './GenerateSalt';
import { ref, set, get } from 'firebase/database';
import { database } from '../firebase/firebaseConfig';
import CryptoJS from 'crypto-js';
import * as ExpoCrypto from 'expo-crypto';

async function getSaltFromDatabase(user) {
    try {
        // Get user's unique salt from Realtime Database
        const snapshot = await get(ref(database, `users/${user.uid}/salt`));
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            const user = await getCurrentUser();
            // If salt doesn't exist, generate and store it
            await generateSalt(user);
            // Call function again to get the generated salt
            return getSaltFromDatabase(user);
        }
    } catch (err) {
        console.error('Error fetching salt: ', err);
        throw new Error('Error fetching salt');
    }
}

export async function encryptPassword(generatedPassword) {
    try {
        const user = await getCurrentUser();
        const userSalt = await getSaltFromDatabase(user);
        const key = CryptoJS.PBKDF2(generatedPassword, userSalt, {
            keySize: 256 / 32,
            iterations: 1000,
        });

        // Using expo-crypto instead of CryptoJS to create random 16-byte value, because Expo does not support using native crypto module
        // to generate secure random numbers
        const ivBytes = await ExpoCrypto.getRandomBytesAsync(16);
        // Convert the bytes into Initialization Vector (In this case to CryptoJS WordArray used by AES)
        const iv = CryptoJS.lib.WordArray.create(ivBytes);

        const encryptedPassword = CryptoJS.AES.encrypt(generatedPassword, key, { iv: iv }).toString();
        return encryptedPassword;
    } catch (err) {
        console.error('Error during encryption: ', err);
        return;
    }
}