export function EmailValidation(email) {
    const emailRegex = /^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,}$/; // https://regex101.com/r/lHs2R3/1
    if (!email || !emailRegex.test(email)) {
        return true;
    } else {
        return false;
    }
}

// KESKENN...
export async function PasswordValidation(passwordFromUser) {
    const status = await validatePassword(getAuth(), passwordFromUser);
    if (!status.isValid) {
    // Password could not be validated. Use the status to show what
    // requirements are met and which are missing.

    // If a criterion is undefined, it is not required by policy. If the
    // criterion is defined but false, it is required but not fulfilled by
    // the given password. For example:
    const needsLowerCase = status.containsLowercaseLetter !== true;
    const needsUpperCase = status.containsUppercaseLetter !== true;
    }
}

export function WebsiteValidation(website) {
    if (!website || website.trim().length < 1) {
        return true;
    } else {
        return false;
    }
}