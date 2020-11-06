module.exports = app => {
    const { Rating } = app.models;

    const listUserRatings = async (user_id) => {
        return await Rating.find({ user: user_id });
    }

    const makeRate = async (user_id, rating) => {
        return {}
    }

    return { listUserRatings, makeRate }
}