# rel-send
handle routing and sending a [rel](http://rel.is) message

## usage
```js
var relSend = require('rel-send')

// a rel message
var message = {
  "@context":"http://rel.is/0.1",
  "to":"http://foo.com",
  "from":"http://bar.org",
  "rel":"http://gmpg.org/xfn/11/friend"
}

relsend(message, function (e) {
  if (e) { return console.log('could not send')}
})
```


## installation

    $ npm install rel-send


## running the tests

From package root:

    $ npm install
    $ npm test


## contributors

- jden <jason@denizac.org>


## license

ISC. (c) MMXIV jden <jason@denizac.org>. See LICENSE.md
