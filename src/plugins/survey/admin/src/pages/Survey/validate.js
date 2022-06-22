import * as yup from "yup";
import { translatedErrors } from "@strapi/helper-plugin";

const schemaResult = yup.object().shape({
  huyen: yup.number().required(translatedErrors.required),
});

export default schemaResult;
