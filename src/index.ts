
import * as engchk from 'runtime-engine-check';
engchk(); // checks node version matches spec in package.json

import * as Handlebars from 'handlebars';
import * as walk from 'klaw-sync';
import * as path from 'path';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import { merge } from 'lodash';

export interface Options {
  handlebars?: Handlebars;
  hb_options?: any;
}

export interface File {
  path: string;
  stats: any;
}

/**
 * Renders template files from srcDir to dstDir.
 * Strips any *.hbs and *.handlebars extensions from source files.
 * Provides the ability to filter files in source directory.
 *
 * @param srcDir   source directory with template
 * @param dstDir   destination directory
 * @param context  The handlerbars context object
 * @param filter   (optional) function to filter files. Defaults to null. ({path: string, stats: fstats}) => boolean
 * @param options  (optional) { handlebars: anHandlebarsInstance, hb_options: handlebar-options }
 *
 * @returns Promise<string[]> a list of destination files.
 */
export const render = async (
  srcDir: string,
  dstDir: string,
  context: any,
  filter: (File) => boolean = null,
  options: Options = null
): Promise<string[]> => {
  const hb = options.handlebars || Handlebars;
  const hbOpts = merge({}, options.hb_options);
  return walk(
    srcDir,
    {
      nodir: true,
      filter
    }
  ).map(async src => {
    try {
      const rel = path.relative(srcDir, src.path);
      const dst = path.join(dstDir, rel).replace(/\.(hbs|handlebars)$/, '');
      const template = fs.readFileSync(src.path, 'utf8');
      const rendered = hb.compile(template, hbOpts)(context);
      mkdirp.sync(path.dirname(dst));
      fs.writeFileSync(dst, rendered, 'utf8');
      return dst;
    } catch (err) {
      /* istanbul ignore next */
      (() => {
        // add context to make debugging easier.
        err['handlebars-dir-render'] = {
          source: src,
          destination: dstDir
        };
        throw err;
      })();
    }
  });
};
