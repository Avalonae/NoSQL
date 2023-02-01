const AlbumModel = require("../models/AlbumModel");
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");


// Zwracanie wszystkich albumów # GET #
router.get("/all_albums", async (req, res) =>
{
    const album = await AlbumModel.find({});
    res.json(album);
});

// Zwracanie pojedynczego albumu po id # GET #
router.get("/get_album/:id", async (req, res) =>
{
    const {id} = req.params; // Wysyłanie ID
    const album = await AlbumModel.findById(id);

    if(!album) // Jeżeli Album nie istnieje
    {
        res.json({ message: "Nie istnieje taki album", status: 0});
        return;
    }

    res.json(album); // Zwracanie albumu jeżeli istnieje
});

router.get("/get_user_albums/:id", async (req, res) =>
{
    const {id} = req.params;
    const havedAlbum = await AlbumModel.find({}); 
});

module.exports = router;
