import { expect } from 'chai';
import { render } from '../..';
import * as path from 'path';
import * as tmp from 'tmp';
import { compareSync } from 'dir-compare';

const base = path.join(__dirname, '..', 'fixtures');

const fixtures = [{
  title: 'simple render',
  source: path.join(base, 'source-templates'),
  expected: path.join(base, 'expected-all'),
  filter: null,
  opts: {}
}, {
  title: 'render without escaping',
  source: path.join(base, 'source-templates'),
  expected: path.join(base, 'expected-all-no-escapes'),
  filter: null,
  opts: {
    hb_options: { noEscape: true }
  }
}, {
  title: 'render with file filtering',
  source: path.join(base, 'source-templates'),
  expected: path.join(base, 'expected-filtered'),
  filter: (x) => !x.path.match(/.*filter-this-out.*/),
  opts: {}
}];

describe(`handlebars-dir-render`, function () {
  const context = { name: 'handlebars-dir-render' };
  this.timeout(10000);
  fixtures.map(async fixture => {
    it(`${fixture.title}`, async () => {
      const dst = (tmp.dirSync({ postfix: `${fixture.title.split(' ').join('-')}` })).name;
      await render(fixture.source, dst, context, fixture.filter, fixture.opts);
      console.log(`rendered \n> ${fixture.expected}\n> ${dst}`);
      const result = compareSync(
        fixture.expected,
        dst,
        {
          excludeFilter: '*.js.map', // map files have hard-coded paths. exclude from comparison
          compareContent: true });
      expect(result.same).to.equal(true, `${JSON.stringify(result, null, 2)}`);
    });
  });
});
