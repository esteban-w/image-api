import sharp from 'sharp';
import path from 'path';
import { constants, promises as fsPromises } from 'fs';

const imageProcessing = async (
    imageName: string,
    imageExt: string,
    imageWidth: string,
    imageHeight: string
): Promise<string> => {
    const assetsPath = path.join(__dirname, '../assets/full/');
    const assetsThumbsPath = path.join(__dirname, '../assets/thumbs/');
    const imageFullPath = `${assetsPath}${imageName}.${imageExt}`;

    // check if image requested does in fact exist
    await fsPromises.access(imageFullPath, constants.F_OK);
    console.log('full size image requested has been found');

    // make sure both width and height are truthy values and they are number values
    if (
        imageWidth &&
        imageHeight &&
        !isNaN(parseInt(imageWidth)) &&
        !isNaN(parseInt(imageHeight))
    ) {
        const resizedImagePath = `${assetsThumbsPath}${imageName}${imageWidth}x${imageHeight}.${imageExt}`;

        // check if resized image already exists, otherwise create it
        try {
            await fsPromises.access(resizedImagePath, constants.F_OK);
            console.log(
                'resized image requested already exists and will be returned'
            );
        } catch {
            await sharp(imageFullPath)
                .resize(parseInt(imageWidth), parseInt(imageHeight))
                .toFile(resizedImagePath);
            console.log(
                'resized image requested has been created and will be returned'
            );
        }

        return new Promise((resolve) => {
            resolve(resizedImagePath);
        });
    } else if (
        imageWidth &&
        imageHeight &&
        (isNaN(parseInt(imageWidth)) || isNaN(parseInt(imageHeight)))
    ) {
        throw Error('Values for width and height must be numbers');
    }

    return new Promise((resolve) => {
        resolve(imageFullPath);
    });
};

export default imageProcessing;
