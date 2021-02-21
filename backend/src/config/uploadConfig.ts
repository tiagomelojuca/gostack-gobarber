import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const uploadDir = path.resolve(__dirname, '..', '..', 'uploads');

export default {
  directory: uploadDir,
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;
      return callback(null, fileName);
    },
  }),
};
