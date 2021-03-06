const assert = require('assert');
const Geohash = require('../geohash');

describe('## decode', () => {

  it('result must be corrected', () => {
    let result = Geohash.decode('wtw3djg2jpy');
    assert.deepEqual(result, [ 31.2328, 121.38164 ]);
  });

  it('must geohash char table must be matched', () => {
    let table = '0123456789bcdefghjkmnpqrstuvwxyz';
    for (let i = 0; i < table.length; i++) Geohash.decode(table[i]);
  });

  it('"ailo" must be thrown', () => {
    let table = 'ailo';
    for (let i = 0; i < table.length; i++) assert.throws(() => Geohash.decode(table[i]));
  });

  it('[.3,1] must be "s009w"', () => {
    let result = Geohash.decode('s009w');
    assert.deepEqual(result, [ .3, 1 ]);
  });

  it('integer must be support', () => {
    let result = Geohash.decode('s065');
    assert.deepEqual(result, [ 2, 3 ]);
  });

  it('[90,180] must be "zzzz"', () => {
    let result = Geohash.decode('zzzz');
    assert.deepEqual(result, [ 90, 180 ]);
  });

  it('minus zero must be considered', () => {
    assert.deepEqual(Geohash.decode('s000').map(value => Math.sign(1 / value)), [ 1, 1 ]);
    assert.deepEqual(Geohash.decode('7zzz').map(value => Math.sign(1 / value)), [ -1, -1 ]);
    assert.deepEqual(Geohash.decode('kpbp').map(value => Math.sign(1 / value)), [ -1, 1 ]);
    assert.deepEqual(Geohash.decode('ebpb').map(value => Math.sign(1 / value)), [ 1, -1 ]);
  });

  it('[-90,-180] must be "0000"', () => {
    let result = Geohash.decode('0000');
    assert.deepEqual(result, [ -90, -180 ]);
  });

  it('must thrown if error args provided', () => {
    assert.throws(() => Geohash.decode(''), Error);
    assert.throws(() => Geohash.decode('a'), Error);
    assert.throws(() => Geohash.decode(), Error);
  });

});
