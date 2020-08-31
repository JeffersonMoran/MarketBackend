module.exports = app => {
    const email_regex = (email) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }
    return { email_regex }
}