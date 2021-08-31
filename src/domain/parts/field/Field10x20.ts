import { Field as FieldInterface } from '@/type/Field';
import { ActiveTetrominoStatus } from '@/type/Application';

export class Field10x20 implements FieldInterface {
  private field = [
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
  ];

  /**
   * stringの文字列を、replaceの文字列に置換する
   *
   * @private
   * @param {string} string
   * @param {string} replace
   * @param {number} start
   * @memberof Field10x20
   */
  private replaceBitString = (
    string: string,
    replace: string,
    start: number,
  ): string => `${string.slice(0, start)}${replace}${string.slice(start + replace.length, string.length)}`.slice(0, string.length)

  /**
   * フィールドのビットを更新する
   *
   * @param {ActiveTetrominoStatus} { x, y, tetromino }
   */
  public update = ({ x, y, tetromino }: ActiveTetrominoStatus): void => {
    const tetrominoRows = tetromino.length;
    let num = 0;
    this.field = [
      ...this.field.map((line, i) => {
        if (i < y) {
          return line;
        }
        if (i >= y + tetrominoRows) {
          return line;
        }
        const strLine = this.replaceBitString(
          line.join(''),
          tetromino[num].join(''),
          x,
        ).split('');
        num += 1;
        return strLine;
      }),
    ];
  }

  /**
   * 行を削除可否判定
   *
   * @memberof Field10x20
   */
  public canRemoveFullRow = (): boolean => this.field.some((row: string[]) => row.every((bit: string) => bit !== '0'))

  /**
   * 行のブロックを削除する
   *
   */
  public removeFullRow = (): void => {
    const isFullRow = (row: string[]): boolean => row.every((bit: string) => bit !== '0');
    // 行がfullの数
    const fullRows: number = this.field.map(isFullRow).filter((row) => row === true).length;
    // 行がfullの状態を削除する
    this.field = this.field
      .reduce((ar: string[][], cu: string[]) => (isFullRow(cu) ? ar : [...ar, cu]), []);

    this.field = [
      ...[...new Array<string[]>(fullRows)].map(() => ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0']),
      ...this.field,
    ];
  }

  /**
   * fieldの情報を取得する
   *
   * @memberof Field10x20
   */
  public getStatus = (): string[][] => this.field;
}
