const Yutai = require("../models/Yutai");

const getAllYutai = async (req, res) => {
    try {
        const allYutai = await Yutai.find({});
        res.status(200).json(allYutai);
    } catch (err) {
        res.status(500).json(err);
    }
};

const createYutai = async (req, res) => {
    try {
        const createYutai = await Yutai.create(req.body);
        res.status(200).json(createYutai);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getOneYutai = async (req, res) => {
    try {
        const oneYutai = await Yutai.findOne({_id: req.params.id});
        if (!oneYutai) {
            return res.status(404).json(`_id:${req.params.id}は存在しません`);
        }
        return res.status(200).json(oneYutai);
    } catch(err) {
        res.status(500).json(err);
    }
};

const updateYutai = async (req, res) => {
    try {
        const updateYutai = await Yutai.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
        if (!updateYutai) {
            return res.status(404).json(`_id: ${req.params.id}は存在しません`);
        }
        return res.status(200).json(updateYutai);
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteYutai = async (req, res) => {
    try {
        const deleteYutai = await Yutai.findOneAndDelete({_id: req.params.id});
        if (!deleteYutai) {
            return res.status(404).json(`_id:${req.params.id}は存在しません`);
        }
        return res.status(200).json(deleteYutai);
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports = {
    getAllYutai,
    createYutai,
    getOneYutai,
    updateYutai,
    deleteYutai,
};