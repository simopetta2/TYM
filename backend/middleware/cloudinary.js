import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {

        const isRaw = file.mimetype.includes('sheet') ||
            file.mimetype.includes('excel')


        return {
            folder: 'tym',

            resource_type: 'auto',

            public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,

            format: file.originalname.split('.').pop(),
        };
    },
});

const parser = multer({ storage: storage });
export default parser;