import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const pathCsvStorage = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: pathCsvStorage,
  storage: multer.diskStorage({
    destination: pathCsvStorage,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;
      return callback(null, filename);
    },
  }),
};
