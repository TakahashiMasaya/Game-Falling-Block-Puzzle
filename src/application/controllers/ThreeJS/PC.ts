import * as THREE from 'three';
import { Controller } from '@/application/controllers/Controller';
import { paramSetAction } from '@/type/Controllers';

export class PC implements Controller {
  private raycaster: THREE.Raycaster;

  private vector2: THREE.Vector2;

  private camera: THREE.PerspectiveCamera;

  private meshButtons: THREE.Object3D[];

  constructor({
    raycaster,
    vector2,
    camera,
    meshButtons,
  }: {
    raycaster: THREE.Raycaster
    vector2: THREE.Vector2
    camera: THREE.PerspectiveCamera
    meshButtons: THREE.Object3D[]
  }) {
    this.raycaster = raycaster;
    this.vector2 = vector2;
    this.camera = camera;
    this.meshButtons = meshButtons;
  }

  private onButtonMaterial = (buttonName: string) => {
    const buttonMaterial = this.meshButtons.find(
      (m) => ((m as THREE.Mesh).material as THREE.MeshLambertMaterial).name
          === buttonName,
    ) as THREE.Mesh;
    if (buttonMaterial) {
      (buttonMaterial.material as THREE.MeshLambertMaterial).color.set(0x990000);
    }
  };

  private offButtonMaterial = (buttonName: string) => {
    const buttonMaterial = this.meshButtons.find(
      (m) => ((m as THREE.Mesh).material as THREE.MeshLambertMaterial).name
          === buttonName,
    ) as THREE.Mesh;
    if (buttonMaterial) {
      (buttonMaterial.material as THREE.MeshLambertMaterial).color.set(0x999000);
    }
  };

  private activeButtonMaterial = (
    intersect: THREE.Intersection<THREE.Object3D<THREE.Event>>,
  ): THREE.MeshLambertMaterial | null => {
    if (!intersect.object.userData.draggable) { return null; }
    // TODO: 強引にTHREE.Object3D<THREE.Event>[]
    // からTHREE.MeshToonMaterialへキャスト
    const buttonMaterial = this.meshButtons.find(
      (m) => ((m as THREE.Mesh).material as THREE.MeshLambertMaterial).name
          === intersect.object.userData.name,
    ) as THREE.Mesh;
    return (buttonMaterial) ? (buttonMaterial.material as THREE.MeshLambertMaterial) : null;
  };

  public setAction = ({
    action: {
      up,
      right,
      down,
      left,
      spinLeft,
      spinRight,
      enter,
      offUp,
      offRight,
      offDown,
      offLeft,
      offSpinLeft,
      offSpinRight,
      offEnter,
    },
  }: paramSetAction) => {
    document.addEventListener('mousedown', (e) => {
      // from -1 to 1
      this.vector2.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.vector2.y = -(e.clientY / window.innerHeight) * 2 + 1;
      this.raycaster.setFromCamera(this.vector2, this.camera);
      const intersects = this.raycaster.intersectObjects(this.meshButtons, true);
      intersects.forEach((intersect) => {
        const abm: THREE.MeshLambertMaterial | null = this.activeButtonMaterial(intersect);
        if (abm === null) { return; }
        abm.color.set(0x990000);
        switch (abm.name) {
          case 'up':
            up();
            break;
          case 'down':
            down();
            break;
          case 'left':
            left();
            break;
          case 'right':
            right();
            break;
          case 'spinRight':
            spinRight();
            break;
          case 'spinLeft':
            spinLeft();
            break;
          case 'enter':
            enter();
            break;
          default:
        }
      });
    });
    document.addEventListener('mouseup', (e) => {
      // from -1 to 1
      this.vector2.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.vector2.y = -(e.clientY / window.innerHeight) * 2 + 1;
      this.raycaster.setFromCamera(this.vector2, this.camera);
      const intersects = this.raycaster.intersectObjects(this.meshButtons, true);
      intersects.forEach((intersect) => {
        const abm: THREE.MeshLambertMaterial | null = this.activeButtonMaterial(intersect);
        if (abm === null) { return; }
        abm.color.set(0x999000);
        switch (abm.name) {
          case 'up':
            offUp();
            break;
          case 'down':
            offDown();
            break;
          case 'left':
            offLeft();
            break;
          case 'right':
            offRight();
            break;
          case 'spinRight':
            offSpinRight();
            break;
          case 'spinLeft':
            offSpinLeft();
            break;
          case 'enter':
            offEnter();
            break;
          default:
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'Up':
          this.onButtonMaterial('up');
          up();
          break;
        case 'ArrowRight':
        case 'Right':
          this.onButtonMaterial('right');
          right();
          break;
        case 'ArrowDown':
        case 'Down':
          this.onButtonMaterial('down');
          down();
          break;
        case 'ArrowLeft':
        case 'Left':
          this.onButtonMaterial('left');
          left();
          break;

        case 'z':
        case 'Z':
          this.onButtonMaterial('spinLeft');
          spinLeft();
          break;
        case 'x':
        case 'X':
          this.onButtonMaterial('spinRight');
          spinRight();
          break;

        case ' ':
        case 'Spacebar':
          this.onButtonMaterial('enter');
          enter();
          break;
        default:
      }
      return false;
    }, false);

    document.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'Up':
          this.offButtonMaterial('up');
          offUp();
          break;
        case 'ArrowRight':
        case 'Right':
          this.offButtonMaterial('right');
          offRight();
          break;
        case 'ArrowDown':
        case 'Down':
          this.offButtonMaterial('down');
          offDown();
          break;
        case 'ArrowLeft':
        case 'Left':
          this.offButtonMaterial('left');
          offLeft();
          break;

        case 'z':
        case 'Z':
          this.offButtonMaterial('spinLeft');
          offSpinLeft();
          break;
        case 'x':
        case 'X':
          this.offButtonMaterial('spinRight');
          offSpinRight();
          break;

        case ' ':
        case 'Spacebar':
          this.offButtonMaterial('enter');
          offEnter();
          break;
        default:
      }
      return false;
    }, false);
  };
}
