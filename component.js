var path = require('path');
var fs = require('fs');
var browserify = require('browserify');
var tmp = require('temp').track();
var React = require('react');

module.exports = function component(comp, props, cb) {
  var filepath = path.join(process.cwd(), 'components', comp);
  var temp = tmp.openSync(comp.split('/').join('-'));
  var bundler = browserify(filepath, {
    bare: true,
    standalone: 'app', 
  });
  // bundler.external('react');
  var b = bundler.bundle();
  b.on('error', function (err) {
    console.error(err);
  });

  var wd = fs.createWriteStream(temp.path, {
    encoding: 'UTF-8',
    fd: temp.fd, 
  });

  wd.on('finish', function () {
    var Component = require(temp.path);
    var content = React.renderToString(React.createElement(Component, props));
    cb(content);
  });

  b.pipe(wd);

  
  return b;
}


