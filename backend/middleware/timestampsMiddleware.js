function updateTimestamp(schema) {
    // Middleware برای به‌روزرسانی updatedAt
    schema.pre("save", function (next) {
        this.updatedAt = Date.now();
        next();
    });
}

module.exports = updateTimestamp;
