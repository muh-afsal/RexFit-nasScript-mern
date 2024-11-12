import axios from 'axios';

const cloudinaryImageUpload = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'thrive_app_images'); 

  try {
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/djo6yu43t/image/upload',
      formData
    );
    return response.data.secure_url; 
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
};

export default cloudinaryImageUpload;
