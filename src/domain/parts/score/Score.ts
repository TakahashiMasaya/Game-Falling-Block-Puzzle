import { Score as ScoreInterface } from '@/type/Score';

export class Score implements ScoreInterface {
  private score: number = 0;

  public add = (num: number) => {
    this.score += num;
  }

  public reset = (): void => {
    this.score = 0;
  }
}
