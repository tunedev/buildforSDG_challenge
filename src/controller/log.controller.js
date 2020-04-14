import path from 'path';
import fs from 'fs';

class Logs {
  /**
   * @description Fetch Logs
   * @static read
   * @param {object} request
   * @param {object} response
   * @returns {text} Log
   * @member Logs
   */
  static read(request, response) {
    try {
      const filePath = path.join(__dirname, '../../log.txt');
      const data = fs.readFileSync(filePath, { flag: 'a+', encoding: 'utf8' });
      response.status(200).contentType('text/plain').send(data);
    } catch (error) {
      throw new Error('Error reading the logs');
    }
  }
}

export default Logs;
