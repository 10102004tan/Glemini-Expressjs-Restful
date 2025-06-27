
/**
 * @file template.model.ts
 * @description Mongoose schema for device management in the 
 * @author 10102004tan
 * @created 2025-06-08
 * @updated 2025-06-08
 */
import {model,Schema} from "mongoose"
const templateSchema = new Schema(
  {
    tem_name: {
      type: String,
      required: true,
    },
    tem_html: {
      type: String,
      required: true,
    },
    tem_status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true },
);

export default model('Template', templateSchema);
