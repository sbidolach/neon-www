import axios from 'axios'

class Slack {
  constructor () {
    this.sendToSlack = this.sendToSlack.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
  }

  /**
 * Send payload to server
 * @method sendToSlack
 * @param  {Object} payload
 * @return {null}
 */
  sendToSlack (payload) {
    return axios.post('/api/slack/send', payload)
  }

  /**
 * Upload image to server
 * @method uploadImage
 * @param  {File} file
 * @return {null}
 */
  uploadImage (file) {
    var form = new FormData()
    form.append('image', file)
    return axios.post('/api/slack/upload', form)
  }
}

export default new Slack()
