import { getCurrentUser } from '../firebase/currentUser';
import { createSalt } from './CreateSalt';

const {
    scrypt,
    randomFill,
    createCipheriv,
} = require('node:crypto');
const algorithm = 'aes-192-cbc';

async function getSaltFromDatabase(user) {
    try {
        // Get user's unique salt from Realtime Database
        const snapshot = await get(ref(database, `users/${user.uid}/salt`));
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            await createSalt(user);
            // Call function again to get the new salt
            return getSaltFromDatabase(user);
        }
    } catch (err) {
        console.error('Error fetching salt: ', err);
        throw new Error('Error fetching salt');
    }
}

function createKey(password, salt, callback) {
    // Generate the key
    // Key length = 24 bytes, because using AES-192 algorithm
    scrypt(password, 'salt', 24, (err, key) => {
        if (err) {
            return callback(new Error('Error in generating key'));
        }
        callback(null, key);    // null = no errors
    });
}

function createIV(callback) {
    // Generate a random 16-byte initialization vector
    randomFill(new Uint8Array(16), (err, iv) => {
        if (err) {
            return callback(new Error('Error in generating random IV'));
        }
        callback(null, iv);
    });
}

function createCipher(password, salt, callback) {
    createKey(password, salt, (err, key) => {
        if (err) {
            return callback(err);
        }

        createIV((err, iv) => {
            if (err) {
                return callback(err);
            }

            // Create a cipher object using algorithm, the key and iv
            // Cipher is used to encrypt the plaintext password
            const cipher = createCipheriv(algorithm, key, iv);
            callback(null, cipher, iv);     // IV is unique for each encryption, so it is returned along with the cipher (for decryption later)
        });
    });
}

export async function encryptPassword(password) {
    try {
        const user = await getCurrentUser();
        const salt = await getSaltFromDatabase(user);

        createCipher(password, salt, (err, cipher, iv) => {
            if (err) {
                throw new Error('Error: ', err);
            }

            let encrypted = '';

            // Set the cipher's output encoding to hexadecimal for readability
            cipher.setEncoding('hex');

            // Listen for encrypted data chunks and append them to the encrypted string
            cipher.on('data', (chunk) => encrypted += chunk);
            cipher.on('end', () => console.log(encrypted));
        });

        cipher.write(password);    // Encrypt the plainext password
        cipher.end();   // Signal that no more data will be written; triggers the encryption process to finish
    } catch (err) {
        console.error('Error during encryption: ', err);
    }
}