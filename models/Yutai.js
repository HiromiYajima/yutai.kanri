const mongoose = require("mongoose");

const YutaiSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "優待会社名を入れてください"],
        trim: true,
        maxlength: [20, "優待会社名は２０文字以内で入れてください"],
    },
    expireD: {
        type: Date,
        required: [true, "有効期限を入れてください"],
        trim: true,
    },
    used: {
        type: Boolean,
        default: false,
    },

});

module.exports = mongoose.model("Yutai", YutaiSchema);