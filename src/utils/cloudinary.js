import {v2 as cloudinary} from 'cloudinary'

import fs from 'fs'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})


const uploadCloudinary = async (localFilePath) => {
    try{
if(!localFilePath) return null

//upload file to cloudinary

const response=await cloudinary.uploader.upload(localFilePath,{
    resource_type: 'auto',
}) 
//file has been uploaded successfuly
console.log("file uploaded to cloudinary successfully", response.url);

fs.unlinkSync(localFilePath)
return response;
    }
    catch (error) {
        fs.unlinkSync(localFilePath)//remove the locallly saved temorary file
        //as the upload operation got falied
        return null

    }
}

const deleteFromCloudinary = async (imageUrl) => {
    try {
        if (!imageUrl) return null

        // URL se sirf "public_id" nikalna hai (Cloudinary ko yehi chahiye delete ke liye)
        const publicId = imageUrl.split("/").pop().split(".")[0]

        const response = await cloudinary.uploader.destroy(publicId)
        console.log("Deleted from Cloudinary:", response)
        return response

    } catch (error) {
        console.log("Error deleting from Cloudinary:", error)
        return null
    }
}

export { uploadOnCloudinary, deleteFromCloudinary }

