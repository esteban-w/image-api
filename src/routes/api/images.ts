import express, {Router} from 'express';
import {constants, promises as fsPromises} from 'fs';
import path from "path";

const images = Router();
const absoluteAssetsPath = path.join(__dirname, '../../../assets/full/');

images.get('/:imageFile(\\w+\.(?:gif|png|jpe?g)$)', (req, res) => {
    (async () => {
        try {
            await fsPromises.access(`${absoluteAssetsPath}${req.params.imageFile}`, constants.F_OK)

            res.sendFile(`${absoluteAssetsPath}${req.params.imageFile}`, {maxAge: '2 days'}, err => {
                if (err) {
                    res.status(500).send('An error has occurred while sending the requested asset')
                }
            })
        } catch {
            res.status(404).send(`File: ${req.params.imageFile} , Not Found`)
        }
    })();
})

export default images;