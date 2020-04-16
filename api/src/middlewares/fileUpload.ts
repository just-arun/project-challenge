import Config from '../config/config';
import multer, { diskStorage } from "multer";
import path from "path";
const config = new Config()

const storage = diskStorage({
  destination: `${config.uploadLocation}/public/uploads/`,
  filename: (req, file, cb) => {
    cb(
      null,
      `img-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});


const uploadImg = multer({
    storage
}).single('img');

export default uploadImg