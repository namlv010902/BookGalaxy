import { Router } from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import { deleteImage, updateImage, uploadImage } from '../controllers/upload.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = Router();
const storage = new CloudinaryStorage({
   cloudinary: cloudinary,
   params: {
      folder: 'react',
      format: []
   }
});
const upload = multer({
   storage: storage
});

router.post('/upload', upload.array('image', 3), uploadImage);
router.delete('/delete-image/:publicId', deleteImage);
router.patch('/update-image/:publicId', upload.single('image'), updateImage);

// còn phần update ảnh từ từ đã
export default router;
