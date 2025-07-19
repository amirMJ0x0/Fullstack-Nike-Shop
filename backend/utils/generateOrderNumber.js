const generateOrderNumber = async () => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    return `NSO-${randomNum}`;
};

module.exports = { generateOrderNumber }
