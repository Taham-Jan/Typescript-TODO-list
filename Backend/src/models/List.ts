import { InferSchemaType, model, Schema } from "mongoose";

const listSchema = new Schema ({
    title :
    {
        type:String,
        required:true,
    },
    todo : [],

},{timestamps:true});

type List = InferSchemaType<typeof listSchema>;

export default model<List>("Todo List", listSchema);
