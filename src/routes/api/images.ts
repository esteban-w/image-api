import express, {Router} from 'express';
import imageProcessing from '../../imageProcessing';

const images = Router();

images.get('/:imageName(\\w+).:imageExt(gif|png|jpe?g)', (req, res) => {
    (async () => {
        const imageName = req.params.imageName;
        const imageExt = req.params.imageExt;

        try {
            const imageToSend = await imageProcessing(
                imageName,
                imageExt,
                typeof req.query.width === 'string' ? req.query.width : '',
                typeof req.query.height === 'string' ? req.query.height : ''
            );

            res.sendFile(imageToSend, {maxAge: '2 days'}, err => {
                if (err) {
                    res.status(500).send('An error has occurred while sending the requested asset')
                }
            })
        } catch {
            res.status(404).send(`Unable to find file: ${imageName}.${imageExt}`)
        }
    })();
})

export default images;