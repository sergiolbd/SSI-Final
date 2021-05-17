import { ELGammal } from "./ELGammal";
import { addTwoPoints, descompose, fastExponentiation, Point } from "./types";

export class DiffieHellman {
  /**
   * H = da * G
   */
  protected H: Point = [0, 0];

  constructor(private da: number, private G: Point, private a: number, private p: number) {
    let descomposición: number[] = descompose(da);
    let result: Point = [0, 0];

    let A = G;
    let B = G;
    for (let i = 0; i < descomposición.length; i++) {
      if (descomposición[i] === 2) {
        result = addTwoPoints(A, B, a, p);
        A = result;
        B = result;
      } else {
        result = addTwoPoints(A, G, a, p);
      }
    }
 
    this.H = result;
  }

  /**
   * Obtener el ya o yb
   * @returns {number} y
   */
  getH(): Point {
    return this.H;
  }
}