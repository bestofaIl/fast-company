const express = require("express");
const bcrypt = require("bcryptjs");
const {check, validationResult} = require("express-validator");
const User = require("../models/User");
const router = express.Router({mergeParams: true});
const tokenService = require("../services/token.service");
const {generateUserData} = require("../utils/helpers");

// /api/auth/signUp
// 1. get data from req (email, password ...)
// 2. check if user exists
// 3. hash password
// 4. create user
// 5. generate tokens

const signUpValidations = [
    check("email", "Check your email!").isEmail(),
    check("password", "Check your password!").isLength({min: 8})
]

router.post("/signUp", [
    check("email", "Check your email!").isEmail(),
    check("password", "Check your password!").isLength({min: 8}),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: "INVALID_DATA",
                        code: 400
                    }
                })
            }
            const {email, password} = req.body;
            const existingUser = await User.findOne({email});
            if (existingUser) {
                return res.status(400).json({
                    error: {
                        message: "EMAIL_EXISTS",
                        code: 400
                    }
                })
            }
            const hashedPassword = await bcrypt.hash(password, 12);

            const newUser = await User.create({
                ...generateUserData(),
                ...req.body,
                password: hashedPassword
            })

            const tokens = tokenService.generate({_id: newUser._id});
            await tokenService.save(newUser._id, tokens.refreshToken);

            res.status(201).send({
                ...tokens,
                userId: newUser._id
            })

        } catch (e) {
            res.status(500).json({
                message: "Error on server! Try later"
            })
        }
    }])

// 1. validate
// 2. find user
// 3. compare hashed password
// 4. generate tokens
// 5. return data
router.post("/signInWithPassword", [
    check("email", "Check your email!").normalizeEmail().isEmail(),
    check("password", "Check your password!").exists(),
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: {
                    message: "INVALID_DATA",
                    code: 400
                }
            })
        }
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).send({
                error: {
                    message: "EMAIL DOESN'T EXISTS",
                    code: 400
                }
            })
        }

        const isEqualPassword = await bcrypt.compare(password, existingUser.password);
        if (!isEqualPassword) {
            return res.status(400).send({
                error: {
                    message: "INVALID_PASSWORD",
                    code: 400
                }
            })
        }

        const tokens = tokenService.generate({ _id: existingUser._id });
        await tokenService.save(existingUser._id, tokens.refreshToken);

        res.status(200).send({
            ...tokens,
            userId: existingUser._id
        })

    } catch (e) {
        res.status(500).json({
            message: "Error on server! Try later"
        })
    }
    }])

function isTokenInvalid(data, dbToken) {
    return !data ||  !dbToken || data._id !== dbToken?.user?.toString();
}


router.post("/token", async (req, res) => {
    try {
        const {refresh_token: refreshToken} = req.body;
        const data = tokenService.validateRefresh(refreshToken);
        const dbToken = await tokenService.findToken(refreshToken);

        if (isTokenInvalid(data, dbToken)) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const tokens = tokenService.generate({
            _id: data._id
        })

        await tokenService.save(data._id, tokens.refreshToken)

        res.status(200).send({
            ...tokens,
            userId: data._id
        })


    } catch (e) {
        res.status(500).json({
            message: "Error on server! Try later"
        })
    }
})

module.exports = router;