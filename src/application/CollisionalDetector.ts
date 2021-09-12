import { paramIsCollision, ActiveTetrominoStatus } from '@/type/Application';

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
    const { x, y, tetromino: t }: ActiveTetrominoStatus = tetromino;
    // tetrominoの各bit値で衝突判定する
    for (let i = 0; i < t.length; i += 1) {
      // row
      const row: string[] = t[i];
      for (let j = 0; j < row.length; j += 1) {
        // bit
        const bit: string = row[j];
        if (bit !== '0'
          && field[y + i]
          && field[y + i][x + j]
          && field[y + i][x + j] !== '0') {
          return true;
        }
        // }
      }
    }
    return false;
  }

  /**
   * field・pieceの衝突判定
   *
   * @param {paramIsCollision} {
   *     tetromino,
   *     field,
   *   }
   * @memberof CollisionalDetector
   */
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
