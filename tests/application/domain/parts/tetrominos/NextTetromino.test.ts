import { NextTetromino } from '@/application/domain/parts/tetrominos/NextTetromino';

describe('NextTetromino', () => {
  it('パラメータによる指定パーツ(ITetromino)が正しいこと', () => {
    const nt = new NextTetromino();
    nt.set(0);
    const { type, tetromino } = nt.get();
    expect(type).toEqual(0);
    expect(tetromino).toEqual(expect.arrayContaining([['0', 'i', '0', '0'], ['0', 'i', '0', '0'], ['0', 'i', '0', '0'], ['0', 'i', '0', '0']]));
  });
  it('パラメータによる指定パーツ(JTetromino)が正しいこと', () => {
    const nt = new NextTetromino();
    nt.set(1);
    const { type, tetromino } = nt.get();
    expect(type).toEqual(1);
    expect(tetromino).toEqual(expect.arrayContaining([['0', '0', 'j'], ['0', '0', 'j'], ['0', 'j', 'j']]));
  });
  it('パラメータによる指定パーツ(LTetromino)が正しいこと', () => {
    const nt = new NextTetromino();
    nt.set(2);
    const { type, tetromino } = nt.get();
    expect(type).toEqual(2);
    expect(tetromino).toEqual(expect.arrayContaining([['l', '0', '0'], ['l', '0', '0'], ['l', 'l', '0']]));
  });
  it('パラメータによる指定パーツ(OTetromino)が正しいこと', () => {
    const nt = new NextTetromino();
    nt.set(3);
    const { type, tetromino } = nt.get();
    expect(type).toEqual(3);
    expect(tetromino).toEqual(expect.arrayContaining([['o', 'o'], ['o', 'o']]));
  });
  it('パラメータによる指定パーツ(STetromino)が正しいこと', () => {
    const nt = new NextTetromino();
    nt.set(4);
    const { type, tetromino } = nt.get();
    expect(type).toEqual(4);
    expect(tetromino).toEqual(expect.arrayContaining([['0', 's', 's'], ['s', 's', '0'], ['0', '0', '0']]));
  });
  it('パラメータによる指定パーツ(TTetromino)が正しいこと', () => {
    const nt = new NextTetromino();
    nt.set(5);
    const { type, tetromino } = nt.get();
    expect(type).toEqual(5);
    expect(tetromino).toEqual(expect.arrayContaining([['0', '0', '0'], ['t', 't', 't'], ['0', 't', '0']]));
  });
  it('パラメータによる指定パーツ(ZTetromino)が正しいこと', () => {
    const nt = new NextTetromino();
    nt.set(6);
    const { type, tetromino } = nt.get();
    expect(type).toEqual(6);
    expect(tetromino).toEqual(expect.arrayContaining([['z', 'z', '0'], ['0', 'z', 'z'], ['0', '0', '0']]));
  });
});
