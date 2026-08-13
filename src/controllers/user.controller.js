import { ApiError } from "../utils/Apierror.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js"
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/Apiresponse.js";

const registerUser = asyncHandler(async (req, res) => {
//user ko enter krna ha is kiay step kya ho gy;
//get user detail from frontend
//validation-not empty
//check if user already exist  username,email
//check for image and check for avatar
//upload them to cloudnary,avatar
//creat user object-creat entry in db
//remove passsword and referesh tokenfiel from response
//check for user creation
//return response


const {fullName,email,username,password}=req.body
console.log("email",email);

if(
    [fullName,email,username,password].some((field)=>
        field?.trim()===""
    )
)
{
    throw new ApiError(400,"all field are required")
}



const existedUser=await User.findOne({
    $or:[{username},{email}]
})
if(existedUser){
    throw new ApiError(409,"email and username already exists")

}

const avatarLocalPath=req.files?.avatar[0]?.path;
const coverImageLocalPath=req.files?.coverImage[0]?.path;
if(!avatarLocalPath){
    throw new ApiError(400,"avatar file is required")
}
const avatar=await uploadCloudinary(avatarLocalPath)
const coverImage = coverImageLocalPath
    ? await uploadCloudinary(coverImageLocalPath)
    : null


if(!avatar){
    throw new ApiError(400,"avatar file is required")
}
const user=await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url||"",
    email,
    password,
    username:username.toLowerCase()
})
const createdUser=await User.findById(user._id).select("-password -refreshToken")

if(!createdUser){
    throw  new ApiError(500,"something went wrong while registering the user")
}

return res.status(201).json(
    new ApiResponse(200,createdUser,"user registered successfully")
)
})

const loginUser=asyncHandler(async(req,res)=>{
    //req body->data
    //username or email
    //find the user
    //password check
    //access and referesh token
    //send cookies

    

})

export {registerUser,
loginUser
}
