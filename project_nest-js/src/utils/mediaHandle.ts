import { diskStorage } from "multer";

export const storage= diskStorage({
    destination: `./tmp`,
    filename: (req, file, cb) => {
        const extension =file.originalname.split('.').pop(); //todo png
        const filename= ` ${Date.now()}.${extension}`;//todo 1234567890.png
        cb(null, filename);
    }
});