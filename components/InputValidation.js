export function EmailValidation(email) {
    const emailRegex = /^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,}$/; // https://regex101.com/r/lHs2R3/1
    if (!email || !emailRegex.test(email)) {
        return true;
    } else {
        return false;
    }
}

export function PasswordValidation(password) {
    if (!password || password.trim().length < 6) {
        return true;
    } else {
        return false;
    }
}

export function WebsiteValidation(website) {
    if (!website || website.trim().length < 1) {
        return true;
    } else {
        return false;
    }
}