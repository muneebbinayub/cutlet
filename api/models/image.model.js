import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
    filename:String,
    data:Buffer,
    contentType:String,
});

const Image = mongoose.model('imageData',imageSchema);

export default Image;