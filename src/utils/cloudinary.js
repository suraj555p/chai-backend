import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

const deleteImageToCloudinary = async (cloudinaryFilePath) => {
    try {
        if (!cloudinaryFilePath) return null;

        const filePath = cloudinaryFilePath.split("/");
        const fileName = filePath[filePath.length - 1].split(".")[0];

        return await cloudinary.uploader.destroy(
            fileName,
            { resource_type: "image" },
            (err, _) => {
                if (err) {
                    console.error("Error deleting file:", err);
                }
            }
        );
    } catch (e) {
        console.log("Error deleting cloudinary file: " + e.message);
    }
};

const deleteVideoToCloudinary = async (cloudinaryFilePath) => {
    try {
        if (!cloudinaryFilePath) return null;

        const filePath = cloudinaryFilePath.split("/");
        const fileName = filePath[filePath.length - 1].split(".")[0];

        return await cloudinary.uploader.destroy(
            fileName,
            { resource_type: "video" },
            (err, _) => {
                if (err) {
                    console.error("Error deleting file:", err);
                }
            }
        );
    } catch (e) {
        console.log("Error deleting cloudinary file: " + e.message);
    }
};



export {uploadOnCloudinary,deleteImageToCloudinary, deleteVideoToCloudinary}