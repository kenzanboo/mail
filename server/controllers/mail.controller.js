import rp from 'request-promise';
import htmlToText from 'html-to-text';
import { format as urlFormat } from 'url';

import mailConfig from '../../config/mail.js';

/**
 * Send a new email
 * @property {string} req.body.to
 * @property {string} req.body.to_name
 * @property {string} req.body.from
 * @property {string} req.body.from_name
 * @property {string} req.body.subject
 * @property {string} req.body.body
 * @returns
 */
function send(req, res) {
  const b = req.body;

  const uriOptions = {
    protocol: 'https',
    auth: mailConfig.auth,
    hostname: mailConfig.hostname,
    query: {
      from: `${b.from_name} <${b.from}>`,
      to: `${b.to_name} <${b.to}>`,
      subject: b.subject,
      text: htmlToText.fromString(b.body)
    }
  };
  const requestOptions = {
    method: 'POST',
    uri: urlFormat(uriOptions),
    json: true
  };

  return rp(requestOptions)
      .then((parsedBody) => {
        res.json(parsedBody);
      })
      .catch((err) => {
        res.json({
          'Mail controller error from email vendor': err
        });
      });
}


export default { send };
