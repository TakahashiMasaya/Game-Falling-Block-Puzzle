import { Scene } from '@/type/Scene';

export class SceneChanger {
  private list: any;

  private listNum: number = 0;

  private scene: Scene;

  constructor({
    list,
  }: { list: Scene[] }) {
    this.list = list;
    this.scene = this.list[this.listNum];
  }

  public start = async () => {
    await this.scene.start();
    this.next();
  }

  public reset = (): void => {
    this.listNum = 0;
    this.scene = this.list[this.listNum];
  }

  private next = (): void => {
    this.listNum += 1;
    this.listNum %= this.list.length;
    this.scene = this.list[this.listNum];
    this.start();
  }
}
