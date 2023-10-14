import cloudinary from '../config/cloudinary';
import { getImageUrl } from "../config/cloudinary"
export const uploadImage = async (req, res) => {
   const files = req.files;
   if (!Array.isArray(files)) {
      return res.status(400).json({ error: 'No files were uploaded' });
   }
   try {
      const uploadPromises = files.map((file) => {
         return cloudinary.uploader.upload(file.path);
      });
      const results = await Promise.all(uploadPromises);
      const uploadedFiles = results.map((result) => ({
         url: result.secure_url,
         publicId: result.public_id
      }));
      return res.status(200).json({
         data: uploadedFiles
      });
   } catch (error) {
      console.log(error.message);
      return res.status(400).json({
         message: 'Something wrong!'
      });
   }
};

export const deleteImage = async (req, res) => {
   const publicId = req.params.publicId;
   try {
      const result = await cloudinary.uploader.destroy(publicId);
      return res.status(200).json({ message: 'Xóa ảnh thành công', result });
   } catch (error) {
      console.log(error.message);
      return res.status(400).json({
         message: 'Something wrong!'
      });
   }
};
export const updateImage = async (req, res) => {
  const { publicId } = req.params;
  const { file } = req;
  try {
   console.log("sp1: ", publicId);
    // Xóa ảnh cũ
    await cloudinary.uploader.destroy(publicId);

    // Tải lên ảnh mới
    const result = await cloudinary.uploader.upload(file.path);

    const updatedImageUrl = getImageUrl(result);
    // Tiến hành lưu trữ URL của ảnh mới vào cơ sở dữ liệu hoặc nơi lưu trữ khác

    return res.status(200).json({ message: 'Cập nhật ảnh thành công', updatedImageUrl ,
    publicId: result.public_id
   });
  } catch (error) {
    return res.status(400).json({ message:error.message  });
  }
};