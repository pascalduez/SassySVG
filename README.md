# SassySVG

Sass SVG toolset.

This is a __Work In Progress__ (not production or release ready).  
As such, it is not published on npm or RubyGems yet.

Started as an export of [SassyFilters] SVG helpers.  
Evolving into a sort of proof of concept to see how far we can get with SVG support/tooling in Sass.  
And whether it makes sense or not...

Experimental, so open to ideas and contributions.

*Online [preview](http://pascalduez.github.io/SassySVG/test) (test folder).*  
*Online [Documentation](http://pascalduez.github.io/SassySVG/docs) (generated with [SassDoc]).*

[SassyFilters]: https://github.com/pascalduez/SassyFilters
[SassDoc]: https://github.com/SassDoc/sassdoc


## Helpers

`svg-inline($svg [,$encoding, $fragment]);`  
`svg-import($file [,$basePath])`

## API

*Not stable. Several changes to be expected.*

`svg($map)`  
`svg-update($map, $keys, $new)`  
`svg-append($map, $keys, $new)`

Example:
```css
$svg: (
  width: 80px,
  height: 80px,
  viewBox: 0 0 80 80,

  circle: (
    cx: 40,
    cy: 40,
    r: 40
  )
);

.circle--black {
  background-image: svg-inline(svg($svg));
}

.circle--white {
  $svg: svg-update($svg, circle, (fill: white));
  background-image: svg-inline(svg($svg));
}

.circle--with-square {
  $svg: svg-append($svg, rect, (x: 25, y: 25, width: 30, height: 30));
  background-image: svg-inline(svg($svg));
}
```


## Configuration

```scss
// Default settings.
$svg-defaults: (

  // Encoding of the SVG filters as data URI: raw | escaped | base64.
  encoding: "raw",

  // Base path of folder containing external SVG files,
  // must be relative to project root (dir you run Sass from).
  basePath: "svg"

);
```
Override default values in a new `$svg-settings` map.


## Browser support


## Requirements

* Sass ~> 3.3.0



## Install

#### Git

```
git clone git@github.com:pascalduez/SassySVG.git
```

#### npm

```
npm install sassysvg --save
```


## Usage

*Provided that [path] = path to SassySVG*

#### Example usage with vanilla [Sass](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#using_sass)
```css
@import 'SassySVG';
```
```
bundle exec sass --watch --load-path [path]/dist --require [path]/lib/helpers.rb input:output
```

#### Example usage with [grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass)

```js
sass: {
  options: {
    bundleExec: true, // Optional usage of Bundler, but recommended.
    require: ['[path]/lib/helpers.rb'],
    loadPath: ['[path]/dist/_SassySVG.scss']
  }
}
```



## Caveats

WIP


## Roadmap


## Development

### You need

* [Node.js](http://nodejs.org)
* [Ruby](https://www.ruby-lang.org)
* [Bundler](http://bundler.io) via `gem install bundler`
* `grunt-cli` via `npm install -g grunt-cli`

### How to

  1. Fork this repository
  2. Run `npm install`
  3. Make your changes + write tests
  4. `grunt test`
  5. Commit + Pull request



## Authors

[Pascal Duez](http://pascalduez.me)



## Licence

SassySVG is available under the [MIT](http://opensource.org/licenses/MIT) license.
