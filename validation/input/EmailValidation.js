export default function EmailValidation(email) {
    const emailRegex = /^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,}$/; // https://regex101.com/r/lHs2R3/1
    if (!email || !emailRegex.test(email)) {
        return false;
    } else {
        return true;
    }
};