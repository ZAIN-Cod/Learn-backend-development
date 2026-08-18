import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        console.log("File uploaded to Cloudinary successfully", response.url)

        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath)
        }

        return response

    } catch (error) {
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath)
        }

        console.log("Cloudinary upload error:", error)

        return null
    }
}

const deleteFromCloudinary = async (imageUrl) => {
    try {
        if (!imageUrl) return null

        const publicId = imageUrl.split("/").pop().split(".")[0]

        const response = await cloudinary.uploader.destroy(publicId)

        console.log("Deleted from Cloudinary:", response)

        return response

    } catch (error) {
        console.log("Error deleting from Cloudinary:", error)

        return null
    }
}

export {
    uploadOnCloudinary,
    deleteFromCloudinary
}