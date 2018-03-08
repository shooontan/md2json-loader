# md2json-loader
[![npm version](https://badge.fury.io/js/md2json-loader.svg)](https://badge.fury.io/js/md2json-loader)
[![Build Status](https://travis-ci.org/shooontan/md2json-loader.svg?branch=master)](https://travis-ci.org/shooontan/md2json-loader)

md2json-loader is webpack loader. This loader parse markdown with yaml-metadata to Javascript Object.


## Install
```
npm install --save-dev md2json-loader
# or with yarn
yarn add --dev md2json-loader
```

## Example

:fast_forward: input markdown

````
---
title: title
published: 2018-03-01
updated: 2018-03-02
tags:
  - anko
  - beni-imo
  - conpei
---

## Headline

this is main content.

```javascript
const text = 'wellcome!';
console.log(text);
```
````

:rewind: output object
```
{
  title: 'title',
  published: '2018-03-01T00:00:00.000Z',
  updated: '2018-03-02T00:00:00.000Z',
  tags: [
    'anko', 'beni-imo', 'conpei'
  ],
  body:
    '\n\n## Headline\n\nthis is main content.\n\n```javascript\nconst text = \'wellcome!\';\nconsole.log(text);\n```\n',
  bodyHtml:
    '<h2>Headline</h2>\n<p>this is main content.</p>\n<pre><code class="language-javascript">const text = \'wellcome!\';\nconsole.log(text);\n</code></pre>\n'
  }
```

## Use

loader config in webpack.config.js.
```
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          'md2json-loader'
        ]
      }
    ]
  },
  ...
}
```

### markdown-it options

[markdown-it](https://github.com/markdown-it/markdown-it) options

```
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.md$/,
        use: {
          loader: 'md2json-loader',
          options: {
            highlight: true
          }
        }
      }
    ]
  },
  ...
}
```

### markdown-it plugins

[markdown-it plugins in npm](https://www.npmjs.com/search?q=markdown-it-plugin)

```
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.md$/,
        use: {
          loader: 'md2json-loader',
          options: {
            plugs: [
              ['markdown-it-emoji'],
              [
                'markdown-it-link-attributes', {
                  attrs: {
                    target: '_blank',
                    rel: 'noopener'
                  }
                }
              ]
            ]
          }
        }
      }
    ]
  },
  ...
}
```
