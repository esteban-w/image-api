import { Request, Response, Router } from 'express';
import imageProcessing from '../../imageProcessing';

const images = Router();
const fileHandler = async (
    res: Response,
    imageName: string,
    imageExt: string,
    imageWidth: string,
    imageHeight: string
): Promise<void> => {
    try {
        const imagePath = await imageProcessing(
            imageName,
            imageExt,
            imageWidth,
            imageHeight
        );

        res.sendFile(imagePath, { maxAge: '2 days' }, (err) => {
            if (err) {
                res.status(500).send(
                    'An error has occurred while sending the requested asset'
                );
            }
        });
    } catch (e) {
        if (e.code === 'ENOENT') {
            res.status(404).send(
                `Unable to find file: ${imageName}.${imageExt}`
            );
        } else {
            res.status(500).send(e.toString());
        }
    }
};

images.get('/', (req: Request, res: Response): void => {
    const filename = req.query.filename;
    const filenameMatch =
        typeof filename === 'string'
            ? filename.match(/(\w+)\.(png|jpe?g)$/)
            : null;

    if (filenameMatch) {
        fileHandler(
            res,
            filenameMatch[1],
            filenameMatch[2],
            typeof req.query.width === 'string' ? req.query.width : '',
            typeof req.query.height === 'string' ? req.query.height : ''
        );
    } else {
        res.send('No file was specified correctly');
    }
});

images.get(
    '/:imageName(\\w+).:imageExt(png|jpe?g)',
    (req: Request, res: Response): void => {
        fileHandler(
            res,
            req.params.imageName,
            req.params.imageExt,
            typeof req.query.width === 'string' ? req.query.width : '',
            typeof req.query.height === 'string' ? req.query.height : ''
        );
    }
);

export default images;
