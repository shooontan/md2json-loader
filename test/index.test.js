import test from 'ava';
const path = require('path');
const webpack = require('webpack');

test.cb(t => {
  webpack(
    {
      mode: 'development',
      entry: path.resolve(__dirname, './md/wellcome.md'),
      module: {
        rules: [
          {
            test: /\.md$/,
            use: [
              {
                loader: require.resolve('../index.js'),
                options: {
                  breaks: true,
                  linkify: false,
                  highlight: true,
                  plugs: [['markdown-it-emoji']]
                }
              }
            ]
          }
        ]
      },
      output: {
        libraryTarget: 'commonjs2',
        path: path.resolve(__dirname, 'output'),
        filename: 'wellcome'
      }
    },
    (error, stats) => {
      if (error) {
        return t.end(error);
      }

      if (stats.hasErrors()) {
        return t.end(stats.compilation.errors[0]);
      }
      if (stats.hasWarnings()) {
        return t.end(stats.compilation.warnings[0]);
      }

      const {
        title,
        published,
        updated,
        tags,
        bodyHtml
      } = require('./output/wellcome');

      t.is(title, 'title');
      t.regex(published, /2018-03-01/);
      t.regex(updated, /2018-03-02/);
      t.deepEqual(tags, ['anko', 'beni-imo', 'conpei']);
      t.is(
        bodyHtml,
        '<h2>Headline</h2>\n<p>this is main content.</p>\n<pre class="hljs"><code><span class="hljs-keyword">const</span> text = <span class="hljs-string">\'wellcome!\'</span>;\n<span class="hljs-built_in">console</span>.log(text);\n</code></pre>\n<p>🍵</p>\n'
      );
      t.end();
    }
  );
});
