import {Response, Router} from 'express';
import imageProcessing from '../../imageProcessing';

const images = Router();
const fileHandler = async (res: Response, imageName: string, imageExt: string, imageWidth: string, imageHeight: string) => {
    try {
        const imageToSend = await imageProcessing(imageName, imageExt, imageWidth, imageHeight);

        res.sendFile(imageToSend, {maxAge: '2 days'}, err => {
            if (err) {
                res.status(500).send('An error has occurred while sending the requested asset')
            }
        })
    } catch {
        res.status(404).send(`Unable to find file: ${imageName}.${imageExt}`)
    }
}

images.get('/',  (req, res) => {
    const filename = req.query.filename;
    const filenameMatches = typeof filename === 'string'
        ? filename.match(/(\w+)\.(gif|png|jpe?g)$/) : null;

    if (filenameMatches) {
        fileHandler(
            res,
            filenameMatches[1],
            filenameMatches[2],
            typeof req.query.width === 'string' ? req.query.width : '',
            typeof req.query.height === 'string' ? req.query.height : ''
        );
    } else {
        res.send('No file was specified correctly')
    }
})

images.get('/:imageName(\\w+).:imageExt(gif|png|jpe?g)', async (req, res) => {
    fileHandler(
        res,
        req.params.imageName,
        req.params.imageExt,
        typeof req.query.width === 'string' ? req.query.width : '',
        typeof req.query.height === 'string' ? req.query.height : ''
    );
})

export default images;