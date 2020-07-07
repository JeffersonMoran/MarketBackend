const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

module.exports = (app) => {
    const SALT_WORK_FACTOR = 10;

    const UserSchema = mongoose.Schema({
        name: { type: String, default: "" },
        image: { type: String, default: "" },
        email: { type: String, default: "", require: true, unique: true },
        password: { type: String, default: "" },
        type: { type: String, default: "user" },
        player_id: { type: String, default: "" },
        buy_list: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
    }, {
            timestamps: true
        });

    UserSchema.methods.makeJWT = async ({ _id }) => {
        const token = jwt.sign({ _id }, process.env.SECRET, {
            expiresIn: 86400 // expires in 1 hour
        });
        const refresh_token = jwt.sign({ _id }, process.env.SECRET, {
            expiresIn: 604800 // expires in 1 day
        });
        return { token, refresh_token }
    }

    UserSchema.pre('save', async function save(next) {
        if (!this.isModified("password")) { return next(); }
        try {
            const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
            this.password = await bcrypt.hash(this.password, salt);
            return next();
        } catch (err) {
            return next(err);
        }
    });

    UserSchema.methods.comparePassword = async (password, userPassword) => {
        return bcrypt.compareSync(password, userPassword);
    };

    return mongoose.model('User', UserSchema, "User")
}
