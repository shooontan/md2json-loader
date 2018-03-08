const loaderUtils = require('loader-utils');
const yaml = require('yaml-front-matter');
const md = require('markdown-it')();
const hljs = require('highlight.js');

module.exports = function(source) {
  this.cacheable();

  const options = loaderUtils.getOptions(this);

  if (options.highlight) {
    options.highlight = function(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre class="hljs"><code>' +
            hljs.highlight(lang, str, true).value +
            '</code></pre>'
          );
        } catch (__) {}
      }

      return (
        '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
      );
    };
  }

  const obj = yaml.safeLoadFront(source, {
    contentKeyName: 'body'
  });

  md.set(options);

  if (options.plugs && options.plugs.length > 0) {
    options.plugs.forEach(plug => {
      try {
        const [plugName, ...plugOpts] = plug;
        const req = require(plugName);
        md.use(req, ...plugOpts);
      } catch (error) {
        throw error;
      }
    });
  }

  obj.bodyHtml = md.render(obj.body);

  return 'module.exports = ' + JSON.stringify(obj);
};
