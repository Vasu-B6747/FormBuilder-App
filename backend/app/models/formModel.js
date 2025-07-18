import { Schema,model } from "mongoose";

const InputSchema = new Schema({
  type: String,
  label: String,
  placeholder: String,
});

const FormSchema = new Schema({
  title: String,
  inputs: [InputSchema],

});
const Form=model('Form',FormSchema)

export default Form
