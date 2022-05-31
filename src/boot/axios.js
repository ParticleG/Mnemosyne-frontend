import {boot} from 'quasar/wrappers'
import axios from 'axios'

const METHOD = Object.freeze({
  GET: 'get', POST: 'post', PUT: 'put', DELETE: 'delete'
})

const baseURL = process.env.DEV ? 'http://localhost:28081/mnemosyne' : '/mnemosyne';

const baseApi = axios.create({baseURL: `${baseURL}/api/v1`});

const genericHttp = (
  url,
  method = METHOD.GET,
  params = null,
  headers = null,
  data = null
) => {
  return new Promise((resolve, reject) => {
    baseApi({
      url: url,
      method: method,
      params: params,
      headers: headers,
      data: data,
    }).then(res => {
      // console.log(res.data);
      if (res.data.code >= 200 && res.data.code < 300) {
        resolve(res.data);
      } else {
        reject(res.data);
      }
    }).catch(err => {
      if (err.response) {
        reject(err.response);
      } else {
        reject(err);
      }
    });
  });
};

const useApi = {
  data: {
    post: (data) => genericHttp(
      '/data/post',
      METHOD.POST,
      null,
      null,
      data
    ),
    upload: (formData) => genericHttp(
      '/data/upload',
      METHOD.POST,
      null,
      {
        'Content-type': 'multipart/form-data'
      },
      formData
    ),
    fuzzy: (type, query, page, perPage, startTime, endTime) => genericHttp(
      '/data/fuzzy',
      METHOD.POST,
      null,
      null,
      {
        type: type,
        query: query,
        page: page,
        perPage: perPage,
        startTime: startTime,
        endTime: endTime,
      }
    ),
    search: (dataType, data, page, perPage, startTime, endTime) => {
      data["page"] = page;
      data["perPage"] = perPage;
      data["startTime"] = startTime;
      data["endTime"] = endTime;
      return genericHttp(
        '/data/fuzzy',
        METHOD.POST,
        {
          dataType: dataType,
        },
        null,
        data
      )
    },
  }
};

export default boot(({app}) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$http = genericHttp
  app.config.globalProperties.$api = useApi;
})

export {genericHttp, useApi}
