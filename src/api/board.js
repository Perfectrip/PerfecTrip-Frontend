import { apiInstance } from "./index.js";

const api = apiInstance();

function listArticle(param, success, fail) {
  api.get(`/article`, { params: param }).then(success).catch(fail);
}

function writeArticle(article, success, fail) {
  api.post(`/article`, JSON.stringify(article)).then(success).catch(fail);
}

function getArticle(articleno, success, fail) {
  api.get(`/article/${articleno}`).then(success).catch(fail);
}

function getAttraction(content_id, success, fail) {
  api.get(`/attraction/${content_id}`).then(success).catch(fail);
}

function modifyArticle(article, success, fail) {
  api.put(`/article`, JSON.stringify(article)).then(success).catch(fail);
}

function deleteArticle(articleno, success, fail) {
  api.delete(`/article/${articleno}`).then(success).catch(fail);
}

export { listArticle, writeArticle, getArticle, getAttraction, modifyArticle, deleteArticle };
