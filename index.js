var request = require('request')
var webfinger = require('webfinger').webfinger

var FALLBACK = module.exports.FALLBACK = 'http://alpha.rel.is'

function send(message, cb) {
  getDestinationServer(message.to, function (e, server) {
    // console.log('dest server:', server)
    if (e) { return cb(e) }
    request({
      uri: server + '/messages',
      method: 'post',
      json: message
    }, function (e, res) {
      if (e) { return cb(e) }
      if (res.statusCode >= 400) {
        return cb(new Error(res.statusCode + ' ' + res.body))
      }
      cb()
    })
  })
}

function getDestinationServer(recipient, cb) {
  // console.trace(recipient)
  getRelEx(recipient, function (e, link) {
    if (e) { return cb(e) }
    if (!link || !link.href) {
      return cb(null, FALLBACK)
    }
    cb(null, link.href)
  })
}

function getRelEx(address, cb) {
  // console.trace(address)
  request({
    uri: 'http://indiefinger.org/.well-known/webfinger?resource='+encodeURIComponent(address),
    json: true
  }, function (e, res, jrd) {
    if (e) { return cb(e) }
    var rel = jrd.links.filter(function (link) {
      return link.rel === 'http://rel.is/0.1'
    })[0]
    cb(null, rel)
  })
}

send({
  "@context":"http://rel.is/0.1",
  to: 'http://jden.us',
  from: 'http://jden.us',
  rel: 'http://justyo.co'
}, function (e) {
  console.log(e ? e.stack : e)
})