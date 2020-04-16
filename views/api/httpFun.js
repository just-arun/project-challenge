/* eslint-disable require-await */
import Axios from 'axios'
import Config from '~/config/config'
export default class Http {
  static async get(endPoint) {
    return this.Fetch('GET', endPoint, null)
  }

  static async post(endPoint, data) {
    return this.Fetch('POST', endPoint, data)
  }

  static async put(endPoint, data) {
    return this.Fetch('PUT', endPoint, data)
  }

  static async patch(endPoint, data) {
    return this.Fetch('PATCH', endPoint, data)
  }

  static async delete(endPoint) {
    return this.Fetch('DELETE', endPoint)
  }

  static async Fetch(method, endPoint, data) {
    const config = new Config()
    return await Axios({
      method,
      url: `${config.BaseURL}${endPoint}`,
      data,
      // withCredentials: true,
      header: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
