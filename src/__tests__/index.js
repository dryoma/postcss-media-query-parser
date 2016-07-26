import test from 'tape';
import parseMedia from '..';

test('`only screen and (color)`.', t => {
  const result = parseMedia('only screen and (color)');

  t.plan(3);

  t.equal(result.nodes.length, 1, 'The number of media queries.');
  t.equal(result.nodes[0].nodes.length, 4, 'The number of elements in a MQ.');
  t.deepEqual(result.nodes[0], {
    after: '',
    before: '',
    type: 'media-query',
    value: 'only screen and (color)',
    sourceIndex: 0,
    parent: result,
    nodes: [{
      after: ' ',
      before: '',
      type: 'keyword',
      value: 'only',
      sourceIndex: 0,
      parent: result.nodes[0],
    }, {
      after: ' ',
      before: ' ',
      type: 'media-type',
      value: 'screen',
      sourceIndex: 5,
      parent: result.nodes[0],
    }, {
      after: ' ',
      before: ' ',
      type: 'keyword',
      value: 'and',
      sourceIndex: 12,
      parent: result.nodes[0],
    }, {
      after: '',
      before: ' ',
      type: 'media-feature-expression',
      value: '(color)',
      sourceIndex: 16,
      nodes: [{
        after: '',
        before: '',
        type: 'media-feature',
        value: 'color',
        sourceIndex: 17,
        parent: result.nodes[0].nodes[3],
      }],
      parent: result.nodes[0],
    }],
  }, 'The structure of an MQ node.');
});

test('`not tv and (min-width: 10px)`.', t => {
  const result = parseMedia('not tv and (min-width: 10px)');

  t.plan(3);

  t.equal(result.nodes.length, 1, 'The number of media queries.');
  t.equal(result.nodes[0].nodes.length, 4, 'The number of elements in a MQ.');
  t.deepEqual(result.nodes[0], {
    after: '',
    before: '',
    type: 'media-query',
    value: 'not tv and (min-width: 10px)',
    sourceIndex: 0,
    parent: result,
    nodes: [{
      after: ' ',
      before: '',
      type: 'keyword',
      value: 'not',
      sourceIndex: 0,
      parent: result.nodes[0],
    }, {
      after: ' ',
      before: ' ',
      type: 'media-type',
      value: 'tv',
      sourceIndex: 4,
      parent: result.nodes[0],
    }, {
      after: ' ',
      before: ' ',
      type: 'keyword',
      value: 'and',
      sourceIndex: 7,
      parent: result.nodes[0],
    }, {
      after: '',
      before: ' ',
      type: 'media-feature-expression',
      value: '(min-width: 10px)',
      sourceIndex: 11,
      nodes: [{
        after: '',
        before: '',
        type: 'media-feature',
        value: 'min-width',
        sourceIndex: 12,
        parent: result.nodes[0].nodes[3],
      }, {
        type: 'colon',
        value: ':',
        after: ' ',
        before: '',
        sourceIndex: 21,
        parent: result.nodes[0].nodes[3],
      }, {
        after: '',
        before: ' ',
        type: 'value',
        value: '10px',
        sourceIndex: 23,
        parent: result.nodes[0].nodes[3],
      }],
      parent: result.nodes[0],
    }],
  }, 'The structure of an MQ node.');
});

test('`not tv, screen, (max-width: $var)`.', t => {
  const result = parseMedia('not tv, screen, (max-width: $var)');

  t.plan(2);

  t.equal(result.nodes.length, 3, 'The number of media queries.');
  t.deepEqual(result.nodes, [{
    after: '',
    before: '',
    type: 'media-query',
    value: 'not tv',
    sourceIndex: 0,
    nodes: [{
      after: ' ',
      before: '',
      type: 'keyword',
      value: 'not',
      sourceIndex: 0,
      parent: result.nodes[0],
    }, {
      after: '',
      before: ' ',
      type: 'media-type',
      value: 'tv',
      sourceIndex: 4,
      parent: result.nodes[0],
    }],
    parent: result,
  }, {
    after: '',
    before: ' ',
    type: 'media-query',
    value: 'screen',
    sourceIndex: 8,
    nodes: [{
      after: '',
      before: ' ',
      type: 'media-type',
      value: 'screen',
      sourceIndex: 8,
      parent: result.nodes[1],
    }],
    parent: result,
  }, {
    after: '',
    before: ' ',
    type: 'media-query',
    value: '(max-width: $var)',
    sourceIndex: 16,
    nodes: [{
      after: '',
      before: ' ',
      type: 'media-feature-expression',
      value: '(max-width: $var)',
      sourceIndex: 16,
      nodes: [{
        after: '',
        before: '',
        type: 'media-feature',
        value: 'max-width',
        sourceIndex: 17,
        parent: result.nodes[2].nodes[0],
      }, {
        type: 'colon',
        value: ':',
        after: ' ',
        before: '',
        sourceIndex: 26,
        parent: result.nodes[2].nodes[0],
      }, {
        after: '',
        before: ' ',
        type: 'value',
        value: '$var',
        sourceIndex: 28,
        parent: result.nodes[2].nodes[0],
      }],
      parent: result.nodes[2],
    }],
    parent: result,
  }], 'The structure of an MQ node.');
});

// Media query from @import (includes the `url` part)
test('`url(fun()) screen and (color), projection and (color)`.', t => {
  const result =
    parseMedia('url(fun()) screen and (color), projection and (color)');

  t.plan(2);

  t.equal(result.nodes.length, 3, 'The number of media queries.');
  t.deepEqual(result.nodes, [{
    after: ' ',
    before: '',
    type: 'url',
    value: 'url(fun())',
    sourceIndex: 0,
    parent: result,
  }, {
    after: '',
    before: ' ',
    type: 'media-query',
    value: 'screen and (color)',
    sourceIndex: 11,
    nodes: [{
      after: ' ',
      before: ' ',
      type: 'media-type',
      value: 'screen',
      sourceIndex: 11,
      parent: result.nodes[1],
    }, {
      after: ' ',
      before: ' ',
      type: 'keyword',
      value: 'and',
      sourceIndex: 18,
      parent: result.nodes[1],
    }, {
      after: '',
      before: ' ',
      type: 'media-feature-expression',
      value: '(color)',
      sourceIndex: 22,
      nodes: [{
        after: '',
        before: '',
        type: 'media-feature',
        value: 'color',
        sourceIndex: 23,
        parent: result.nodes[1].nodes[2],
      }],
      parent: result.nodes[1],
    }],
    parent: result,
  }, {
    after: '',
    before: ' ',
    type: 'media-query',
    value: 'projection and (color)',
    sourceIndex: 31,
    nodes: [{
      after: ' ',
      before: ' ',
      type: 'media-type',
      value: 'projection',
      sourceIndex: 31,
      parent: result.nodes[2],
    }, {
      after: ' ',
      before: ' ',
      type: 'keyword',
      value: 'and',
      sourceIndex: 42,
      parent: result.nodes[2],
    }, {
      after: '',
      before: ' ',
      type: 'media-feature-expression',
      value: '(color)',
      sourceIndex: 46,
      nodes: [{
        after: '',
        before: '',
        type: 'media-feature',
        value: 'color',
        sourceIndex: 47,
        parent: result.nodes[2].nodes[2],
      }],
      parent: result.nodes[2],
    }],
    parent: result,
  }], 'The structure of an MQ node.');
});

// Media feature fully consisting of Sass structure, colon inside
test('`( #{"max-width" + ": 10px"} )`.', t => {
  const result = parseMedia('( #{"max-width" + ": 10px"} )');

  t.plan(2);

  t.equal(result.nodes.length, 1, 'The number of media queries.');
  t.deepEqual(result.nodes, [{
    after: '',
    before: '',
    type: 'media-query',
    value: '( #{"max-width" + ": 10px"} )',
    sourceIndex: 0,
    nodes: [{
      after: '',
      before: '',
      type: 'media-feature-expression',
      value: '( #{"max-width" + ": 10px"} )',
      sourceIndex: 0,
      nodes: [{
        after: ' ',
        before: ' ',
        type: 'media-feature',
        value: '#{"max-width" + ": 10px"}',
        sourceIndex: 2,
        parent: result.nodes[0].nodes[0],
      }],
      parent: result.nodes[0],
    }],
    parent: result,
  }], 'The structure of an MQ node.');
});

test('`#{"scree" + "n"}`.', t => {
  const result = parseMedia('#{"scree" + "n"}');

  t.plan(2);

  t.equal(result.nodes.length, 1, 'The number of media queries.');
  t.deepEqual(result.nodes, [{
    after: '',
    before: '',
    type: 'media-query',
    value: '#{"scree" + "n"}',
    sourceIndex: 0,
    nodes: [{
      after: '',
      before: '',
      type: 'media-type',
      value: '#{"scree" + "n"}',
      sourceIndex: 0,
      parent: result.nodes[0],
    }],
    parent: result,
  }], 'The structure of an MQ node.');
});

test('Malformed MQ, expression wrecked: `(example, all,), speech`.', t => {
  const result = parseMedia('(example, all,), speech');

  t.plan(2);
  t.equal(result.nodes.length, 2, 'The number of media queries.');
  t.deepEqual(result.nodes, [{
    after: '',
    before: '',
    type: 'media-query',
    value: '(example, all,)',
    sourceIndex: 0,
    nodes: [{
      after: '',
      before: '',
      type: 'media-feature-expression',
      value: '(example, all,)',
      sourceIndex: 0,
      nodes: [{
        type: 'media-feature',
        before: '',
        after: '',
        value: 'example, all,',
        sourceIndex: 1,
        parent: result.nodes[0].nodes[0],
      }],
      parent: result.nodes[0],
    }],
    parent: result,
  }, {
    after: '',
    before: ' ',
    type: 'media-query',
    value: 'speech',
    sourceIndex: 17,
    nodes: [{
      after: '',
      before: ' ',
      type: 'media-type',
      value: 'speech',
      sourceIndex: 17,
      parent: result.nodes[1],
    }],
    parent: result,
  }], 'The structure of an MQ node.');
});

test('Malformed MQ, parens don\'t match: `((min-width: -100px)`.', t => {
  const result = parseMedia('((min-width: -100px)');

  t.plan(2);
  t.equal(result.nodes.length, 1, 'The number of media queries.');
  t.deepEqual(result.nodes, [{
    after: '',
    before: '',
    nodes: [],
    parent: {
      after: '',
      before: '',
      nodes: result.nodes,
      sourceIndex: 0,
      type: 'media-query-list',
      value: '((min-width: -100px)',
    },
    sourceIndex: 0,
    type: 'media-query',
    value: '((min-width: -100px)',
  }], 'The structure of an MQ node.');
});
