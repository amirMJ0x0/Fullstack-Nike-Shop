const { generateTokens } = require("./generateTokens");

const finalizeAuth = async (res, user) => {
    const { accessToken, refreshToken } = generateTokens(user._id);

    // Update user with refresh token
    user.refreshToken = null
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none", // for allowing cross-site
        maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });


    res.status(200).json({
        success: true,
        message: 'Authentication finalized successfully',
        data: { id: user._id, username: user.username, email: user.email }
    });
};

module.exports = { finalizeAuth }