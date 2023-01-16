import axios from 'axios';

export default class RequestFactory {
  constructor({ baseUrl, auth, headers, timeout } = {}) {
    this.axios = axios.create({
      baseURL: baseUrl || '',
      auth: auth || null,
      headers: headers || {},
      timeout: timeout || 10000,
    });
    this.resultError = {};
  }

  getInstance() {
    return this.axios;
  }

  post(
    url = null,
    data = null,
    config = { auth: null, headers: {}, timeout: this.timeout }
  ) {
    return this.axios.post(url, data, config)
      .then(result => result.data)
      .catch(err => this.errorHandler(err))
  }

  get(url = null, config = { auth: {}, headers: {} }) {
    return this.axios.get(url)
      .then(result => result.data)
      .catch(err => this.errorHandler(err))
  }

  put(url = null, data = null, config = { auth: {}, headers: {} }) {
    return this.axios.put(url, data, config)
      .then(result => result.data)
      .catch(err => this.errorHandler(err))
  }

  patch(url = null, data = null, config = { auth: {}, headers: {} }) {
    return this.axios.patch(url, data, config)
      .then(result => result.data);
  }

  delete(url = null, config = { auth: {}, headers: {} }) {
    return this.axios.delete(url, config)
      .then(result => result.data)
      .catch(err => this.errorHandler(err))
  }

  errorHandler(error) {
    console.log(error.code)
    if (error.code) {
      switch (error.code) {
        case 'ECONNABORTED':
          this.resultError = 'Timeout Error: Excedido o tempo limite de 10000 ms.';
          break;
        case 'ERR_BAD_REQUEST':
          this.resultError = error.response.data;
          break;
        default:
          this.resultError = 'Unknown Error: Erro desconhecido.';
          break;
      }
    } else if (error.response && error.response.status >= 500) {
      this.resultError = 'Backend Error: Erro Desconhecido'
    } else {
      this.resultError = error.response.data;
    }
    throw this.resultError;
  }
};
