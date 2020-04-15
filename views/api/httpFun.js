import Axios from 'axios'
import Config from '~/config/config'
export const Http = {
  async Fetch(method, endPoint, data) {
    const config = new Config()
    return await Axios({
      method,
      url: `${config.BaseURL}${endPoint}`,
      data,
      withCredentials: true
    })
  }
}
