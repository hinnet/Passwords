export function EmailValidation(email) {
    const emailRegex = /^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,}$/; // https://regex101.com/r/lHs2R3/1
    if (!email || !emailRegex.test(email)) {
        return true;
    } else {
        return false;
    }
}

export function PasswordValidation(password) {
    if (!password || password.length < 6) {
        return true;
    } else {
        return false;
    }
}