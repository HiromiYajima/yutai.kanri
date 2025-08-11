const express = require("express");
const router = express.Router();

const {
    getAllYutai,
    createYutai,
    getOneYutai,
    updateYutai,
    deleteYutai,    
} = require("../controllers/yutai.js");

// 一覧表示
router.get("/", getAllYutai);

// １つ表示
router.get("/:id", getOneYutai);

// 追加
router.post("/", createYutai);

// 更新
router.patch("/:id", updateYutai);

// 削除
router.delete("/:id", deleteYutai);

module.exports = router;