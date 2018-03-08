# md2json-loader

## Use

### sample

webpack.condig.js
```
test: /\.md$/,
use: {
  loader: 'md2json-loader',
}
```

### markdown-it options

[markdown-it](https://github.com/markdown-it/markdown-it) options

```
test: /\.md$/,
use: {
  loader: 'md2json-loader',
  options: {
    highlight: true
  }
}
```

### markdown-it plugins
```
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
```
