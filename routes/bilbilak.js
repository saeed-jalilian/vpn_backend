let express = require('express');
let router = express.Router();

const domain = 'saeed-jalilian.lol'
const subdomain = 'jln'

router.get('/', function (req, res, next) {
  const {id, uuid, name} = req.query
  if (!id || !uuid) {
    return res.status(500).send('id & uuid is required!')
  }
  return res.redirect(`https://${subdomain}.${domain}/${id}/${uuid}/${name ? `#${name}` : ''}`)
});

module.exports = router;
