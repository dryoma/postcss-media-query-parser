import test from 'tape';
import parseMedia from '..';

test('Container.walk (`only screen and (color)`)', t => {
  const result = parseMedia('only screen and (color)');
  let n = 0;
  t.plan(5);

  result.walk();
  t.equal(n, 0, 'Container.walk: passed nothing');

  n = 0;
  result.walk(node => {
    if (node.value === 'only') { n++; }
  });
  t.equal(n, 1, 'Container.walk: passed funtion');

  n = 0;
  result.walk(() => { n++; });
  // Should be 6: the mq, 3 keywords, 1 media feature expression,
  // 1 media feature
  t.equal(n, 6, 'Container.walk: traversed all nodes');

  n = 0;
  result.walk('feature', () => { n++; });
  // Should be 2: "media-feature-expression", "media-feature"
  t.equal(n, 2, 'Container.walk: filter nodes with string value');

  n = 0;
  result.walk(/feature$/, () => { n++; });
  // Should be one: "media-feature"
  t.equal(n, 1, 'Container.walk: filter nodes with regexp');
});

test('Container.each (`only screen and (color)`)', t => {
  const result = parseMedia('only screen and (color)');
  let n = 0;
  t.plan(4);

  result.each();
  t.equal(n, 0, 'Container.each: passed nothing');

  n = 0;
  result.each(node => {
    if (node.type === 'media-query') { n++; }
  });
  t.equal(n, 1, 'Container.each: passed funtion');

  n = 0;
  result.each(() => { n++; });
  // Should be 1 for the only media query
  t.equal(n, 1, 'Container.each: traversed all child nodes');

  n = 0;
  result.nodes[0].each(() => { n++; });
  // Should be 4: 3 keywords and "media-feature-expression"
  t.equal(n, 4,
    'Container.each: traversed all child nodes of a child container');
});
