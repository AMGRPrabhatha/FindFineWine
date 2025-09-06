import mongoose from "mongoose";

const wineSchema = new mongoose.Schema({
    Title : { type: String, required: true },
    Description : { type: String, required: true },
    Price : { type: String, required: true },
    Grape : { type: String, required: true },
    Country : { type: String, required: true },
    Type : { type: String, required: true },
    ABV : { type: String, required: true },
    Gender : { type: String, required: true },
    IMG_URl : { type: String, required: true },
});

const Wine = mongoose.model("Wine", wineSchema);

export default Wine;
