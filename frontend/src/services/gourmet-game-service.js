import RequestFactory from '../factory/request-factory';
import * as qs from 'qs'

export default class GourmetGameService {
  constructor() {
    this.headers = {};
    this.baseUrl = `http://localhost:3001/`;
    this.axios = new RequestFactory({
      baseUrl: this.baseUrl,
    });
  }

  async defaultGetRequest(url, customHeaders = {}) {
    try {
      const result = await this.axios.get(url, {
        headers: { ...this.headers, ...customHeaders },
      });
      return result;
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async defaultPostRequest(url, body, customHeaders = {}) {
    try {
      const result = await this.axios.post(url, body, {
        headers: { ...this.headers, ...customHeaders },
      });
      return result;
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getFood(queryParameters = null) {
    const url = `gourmet-game/v1/food?${ queryParameters ? qs.stringify(queryParameters) : '' }`;
    console.log(url)
    return this.defaultGetRequest(url);
  }
  async getType(queryParameters = null) {
    const url = `gourmet-game/v1/type?${ queryParameters ? qs.stringify(queryParameters) : '' }`;
    console.log(url)
    return this.defaultGetRequest(url);
  }

  async postFood(body) {
    const url = `gourmet-game/v1/food`;
    console.log(url)
    return this.defaultPostRequest(url, body);
  }
};
