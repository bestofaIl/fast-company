const express = require("express");
const router = express.Router({mergeParams: true});
const auth = require("../middleware/auth.middleware");
const User = require("../models/User");

router.patch("/:userId",auth, async (req,res) => {
    try {
        const {userId} = req.params;

        if (userId === req.user._id) {
            const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true});
            res.send(updatedUser);
        } else {
            res.status(401).json({
                message: "Unauthorized"
            })
        }
    } catch (e) {
        res.status(500).json({
            message: "Error on server! Try later"
        })
    }
})

router.get("/", auth,async (req, res) => {
    try {
        const list = await User.find();
        res.status(200).send(list); // 200 as default
    } catch (e) {
        res.status(500).json({
            message: "Error on server! Try later"
        })
    }
})


module.exports = router;