import { apiInstance } from "./index.js";

const api = apiInstance();

function getAttraction(content_id, success, fail) {
  api.get(`/article/${content_id}`).then(success).catch(fail);
}
