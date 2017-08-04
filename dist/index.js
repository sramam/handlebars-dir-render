"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const engchk = require("runtime-engine-check");
engchk();
const Handlebars = require("handlebars");
const walk = require("klaw-sync");
const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");
const lodash_1 = require("lodash");
exports.render = (srcDir, dstDir, context, filter = null, options = null) => __awaiter(this, void 0, void 0, function* () {
    const hb = options.handlebars || Handlebars;
    const hbOpts = lodash_1.merge({}, options.hb_options);
    return walk(srcDir, {
        nodir: true,
        filter
    }).map((src) => __awaiter(this, void 0, void 0, function* () {
        try {
            const rel = path.relative(srcDir, src.path);
            const dst = path.join(dstDir, rel).replace(/\.(hbs|handlebars)$/, '');
            const template = fs.readFileSync(src.path, 'utf8');
            const rendered = hb.compile(template, hbOpts)(context);
            mkdirp.sync(path.dirname(dst));
            fs.writeFileSync(dst, rendered, 'utf8');
            return dst;
        }
        catch (err) {
            (() => {
                err['handlebars-dir-render'] = {
                    source: src,
                    destination: dstDir
                };
                throw err;
            })();
        }
    }));
});
//# sourceMappingURL=index.js.map