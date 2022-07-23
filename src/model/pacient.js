import { Schema, model } from "mongoose";



const pacientSchema = new Schema(
  {
    ci:String,
    name: String,
    sintomas:[],
    diagnostico:String
  },
  {
    versionKey: false,
  }
);

export default model("pacient", pacientSchema);