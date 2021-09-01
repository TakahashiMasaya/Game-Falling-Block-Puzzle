import { paramIsCollision } from '@/type/Application';

export class CollisionalDetector {
  /**
   * tetrominoがfieldからはみ出ているか判定
   *
   * @private
   * @param {*} {
   *     tetromino,
   *     field,
   *   }
   * @memberof CollisionalDetector
   */
  private isFieldCollision = ({
    tetromino,
    field,
  }): boolean => {
    const { x, y, tetromino: t } = tetromino;
    const fieldCols = field[0].length - 1;
    const fieldRows = field.length - 1;
    // tetrominoの各bit値で衝突判定する
    for (let i = 0; i < t.length; i += 1) {
      // row
      const row: string[] = t[i];
      for (let j = 0; j < row.length; j += 1) {
        // bit
        const bit: string = row[j];
        // 左端
        if (bit !== '0' && x + j < 0) {
          return true;
        }
        // 右端
        if (bit !== '0' && x + j > fieldCols) {
          return true;
        }
        // 下端
        if (bit !== '0' && y + i > fieldRows) {
          return true;
        }

        // field内、pieceとの衝突判定
        if (x + j >= 0
          && x + j < fieldCols
          && y + i >= 0
          && y + i < fieldRows) {
          // field内である
          if (bit !== '0' && field[y + i][x + j] !== '0') {
            return true;
          }
        }
      }
    }
    return false;
  }

  public isCollision = ({
    tetromino,
    field,
  }: paramIsCollision): boolean => {
    const isFieldCollision = this.isFieldCollision({
      tetromino,
      field,
    });
    return isFieldCollision;
  }
}
