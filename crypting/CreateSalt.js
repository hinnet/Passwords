import { ref, set } from 'firebase/database';
import { database } from '../firebase/firebaseConfig';
const crypto = require('node:crypto');;

export async function createSalt(user) {
    try {
        const salt = crypto.randomBytes(16).toString('hex');
        await set(ref(database, `users/${user.uid}/salt`), salt);
    } catch (error) {
        console.error('Error creating salt: ', error);
        throw new Error('Error creating salt');
    }
}