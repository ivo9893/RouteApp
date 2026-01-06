'use server'

import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function uploadToCloudinary(fromData){
    const files = fromData.getAll('file');

    if(!files || files.length === 0){
        throw new Error("No files found!");
    }

    const uploadPromise = files.map(async (file) =>{
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {folder: 'images-uploads'},
                (error, result) => {
                    if(error){
                        reject(error);
                    } else {
                        resolve(result.secure_url);
                    }
                }
            ).end(buffer);
        });
    });

    const result = await Promise.all(uploadPromise);

    return result;
}