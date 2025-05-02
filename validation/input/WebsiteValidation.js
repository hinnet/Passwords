export default function WebsiteValidation(website) {
    if (!website || website.trim().length < 1) {
        return false;
    } else {
        return true;
    }
};