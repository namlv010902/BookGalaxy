import {v2 as cloudinary} from "cloudinary";

 cloudinary.config({
    cloud_name:"dgqvtbr4n",
    api_key:"335541795944436",
    api_secret:"Qb9YTdMpThQ8zligwdAU8rFuEVQ"
})
export default cloudinary
export const getImageUrl = (result) => {
    // Định dạng và trả về URL của ảnh từ kết quả trả về từ Cloudinary
    if (result.secure_url) {
      return result.secure_url;
    } else {
      return result.url;
    }
  };