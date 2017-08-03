# handlebars-dir-render
<!-- badge -->
[![npm license](https://img.shields.io/npm/l/handlebars-dir-render.svg)](https://www.npmjs.com/package/handlebars-dir-render)
[![travis status](https://img.shields.io/travis/sramam/handlebars-dir-render.svg)](https://travis-ci.org/sramam/handlebars-dir-render)
[![Build status](https://ci.appveyor.com/api/projects/status/90am2usst4qeutgi?svg=true)](https://ci.appveyor.com/project/sramam/handlebars-dir-render)
[![Coverage Status](https://coveralls.io/repos/github/sramam/handlebars-dir-render/badge.svg?branch=master)](https://coveralls.io/github/sramam/handlebars-dir-render?branch=master)
[![David](https://david-dm.org/sramam/handlebars-dir-render/status.svg)](https://david-dm.org/sramam/handlebars-dir-render)
[![David](https://david-dm.org/sramam/handlebars-dir-render/dev-status.svg)](https://david-dm.org/sramam/handlebars-dir-render?type=dev)
<br/>
[![NPM](https://nodei.co/npm/handlebars-dir-render.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/handlebars-dir-render/)
<!-- endbadge -->

Given a context and a source directory of handlebars templates, renders all files from source directory to destination directory.

## Installation

```bash
npm install handlebars-dir-render
```

## Usage

```javascript
import { render } from 'handlebars-dir-render';
render(srcDir, dstDir, context);
```
or

```javascript
const render = require('handlebars-dir-render').render;
render(srcDir, dstDir, context);

```

## API

```TypeScript
/**
 * Recursively renders template files in srcDir to dstDir.
 * Strips any *.hbs and *.handlebars extensions from source files.
 * Provides the ability to filter files in source directory.
 *
 * @param srcDir   source directory with template
 * @param dstDir   destination directory
 * @param context  The handlerbars context object
 * @param filter   (optional) function to filter files. Defaults to null - all files are processed.
 *                 signature: ({path: string, stats: fstats}) => boolean
 * @param options  (optional) { handlebars: anHandlebarsInstance, hb_options: handlebar-options }
 */
async function render (
  srcDir: string,
  dstDir: string,
  context: any,
  filter: (File) => boolean = null,
  options: Options = null
): Promise<string[]>

```

## License
Apache-2.0

## Support
Bugs, PRs, comments, suggestions welcomed!

