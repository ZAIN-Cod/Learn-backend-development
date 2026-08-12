import { ApiError } from "../utils/Apierror.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import  {User, user} from "../models/user.model.js"
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
    [fullName,email,username,password].some((field)=>{
        field?.trim()===""
    })
)
{
    throw new ApiError(400,"all field are required")
}



const existedUser=User.findOne({
    $or:[{username},{email}]
})
if(existedUser){
    throw new ApiError(409,"email and username already exists")

}

const avatarLocalPath=req.files?.avatar[0];
const coverImageLocalPath=req.files?.coverImage[0];
if(!avatarLocalPath){
    throw new ApiError(4300,"avatar file is required")
}
const avatar=await uploadCloudinary(avatarLocalPath)
const coverImage=await uploadCloudinary(coverImageLocalPath)

if(!avatar){
    throw new ApiError(4300,"avatar file is required")
}
User.create({
    fullName,
    avatar=avatar.url,
    coverImage=coverImage?.url||"",
    email,
    password,
    username=toLowerCase()
})
const createdUser=await User.findById(user._id).selec("-password -refereshToken")

if(!createdUser){
    throw  new ApiError(500,"something went wrong while registering the user")
}

return res.status(201).json(
    new ApiResponse(200,createdUser,"user registered successfully")
)
})

export {registerUser,}
