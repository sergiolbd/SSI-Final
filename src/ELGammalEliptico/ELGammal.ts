import { DiffieHellman } from './diffieHellman';
import {Point, fastExponentiation, LehmanPeralta, addTwoPoints, descompose} from './types';
const chalk = require('chalk');

/**
 * Clase implementa cifrado ELGammal apoyado en el intercambio de claves por DiffieHelman
 */
export class ELGammal {
  private points: Point[] = [];
  private a: number = 0;
  private b: number = 0;
  private p: number = 0;
  private M: number = 0; // Potencia de 2 mayor a m
  private m: number = 0; // mensaje original
  private Qm: Point = [0, 0]; // m como punto 
  private h: number = 0;
  private G: Point = [0, 0];
  private publicA: Point = [0, 0];
  private publicB: Point = [0, 0];
  private Sa: Point = [0, 0];
  private Sb: Point = [0, 0]; 
  private messageCipher: Point[] = [[0, 0], [0,0]];
  constructor(p_: number, a_: number, b_: number, G_: Point, private da: number, private db: number, m_: number) {
    // Comprobar que p es primo
    LehmanPeralta(p_) === true ? this.p = p_ : console.log(chalk.bold.red(` ERROR --> p = ${p_} no es primo`));

    // Comprobar 4a³ + 27b² != 0
    if (this.checkab(a_, b_, this.p)  === true) {
      this.a = a_;
      this.b = b_;
    } else {
      console.log(chalk.bold.red(` ERROR --> a = ${a_}, b = ${b_} no estan permitidos para esta curva`));
    }

    // Calcular puntos de la curva
    this.curvePoint();
    
    // Comprobar que G es un punto de la curva
    this.checkCurvePoint(G_) === true ? this.G = G_: console.log(chalk.bold.red(` ERROR --> G = ${G_} no es un punto de la curva`));

    // Calcular claves públicas
    const diffieA = new DiffieHellman(this.da, this.G, this.a, this.p);
    const diffieB = new DiffieHellman(this.db, this.G, this.a, this.p);
    // Comprobamos si clave pública de A y B son puntos de la curva
    this.checkCurvePoint(diffieA.getH()) === true ? this.publicA = diffieA.getH() : console.log(chalk.bold.red(` ERROR --> publicA = ${diffieA.getH()} no es un punto de la curva`));
    this.checkCurvePoint(diffieB.getH()) === true ? this.publicB = diffieB.getH() : console.log(chalk.bold.red(` ERROR --> publicB = ${diffieB.getH()} no es un punto de la curva`));

    // Generar clave secreta compartida Sa y Sb que deben de ser iguales
    const diffieSa = new DiffieHellman(this.da, this.publicB, this.a, this.p);
    const diffieSb = new DiffieHellman(this.db, this.publicA, this.a, this.p);
    this.checkCurvePoint(diffieSa.getH()) === true ? this.Sa = diffieSa.getH() : console.log(chalk.bold.red(` ERROR --> S = ${diffieSa.getH()} no es un punto de la curva`));
    this.checkCurvePoint(diffieSb.getH()) === true ? this.Sb = diffieSb.getH() : console.log(chalk.bold.red(` ERROR --> S = ${diffieSb.getH()} no es un punto de la curva`));

    // Codificación del mensaje m como punto Qm
    m_ >= 0 ? this.m = m_ : console.log(chalk.bold.red(` ERROR --> m = ${m_} debe ser mayor que 0`));
    this.setM(this.m);
    this.h = Math.trunc(this.p / this.M);
    this.Qm = this.setQm();

    // Calculo del mensaje cifrado formado por dospuntos {Qm+dA(dBG), dAG} 
    this.cifrar()
  }

  /**
   * Cifrar el mensaje
   */
  cifrar() {
    this.messageCipher[1] = this.publicA;
    let resultpoint0 = addTwoPoints(this.Qm, this.Sa, this.a, this.p);
    this.checkCurvePoint(resultpoint0) === true ? this.messageCipher[0] = resultpoint0 : console.log(chalk.bold.red(` ERROR --> messageCipher[0] = ${resultpoint0} no es un punto de la curva`));
  }

  /**
   * Comprobar que un punto pertenece a la curva
   * @param G_ 
   * @returns 
   */
  checkCurvePoint(G_: Point) {
    let flag = false;
    this.points.forEach((point) => {
      if (point[0] === G_[0] && point[1] === G_[1]) {
        flag = true;
      }
    });
    return flag;
  }

  checkab(a: number, b: number, p: number) {
    let result = (4* Math.pow(a, 3) + 27 * Math.pow(b, 2)) % p;
    if (result === 0) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Calcular M = potencia de dos mayor al mensaje para que se cumpla que 0 < m < M
   * @param m 
   */
  setM(m: number) {
    let descomposición: number[] = descompose(m);
    let count = 0;
    descomposición.forEach((pot) => {
      if (pot != 1) {
        count++;
      }
    });

    this.M = Math.pow(2, count+1);
  }

  /**
   * Calculo de Qm = mensaje original codificado como punto
   * @returns 
   */
  setQm(): Point {
    for (let j = 0; j < this.h; j++) {
      let x = this.m * this.h + j;
      for (let i = 0; i < this.points.length; i++) {
        if (this.points[i][0] === x) {
          return this.points[i];
        }
      }
    }
  return [0,0];
  }

  /**
   * Calcular puntos de la curva
   */
  curvePoint() {
    let pointx: Point[] = [];
    let pointy: Point[] = [];

    //Calculas todos los puntos para toda posible x
    for (let x = 0; x < this.p; x++) {
      let a: Point = [x, (Math.pow(x, 3) + this.a * x + this.b) % this.p]
      pointx.push(a);
    }

    // Calculan todos los puntos para una posible y
    for (let y = 0; y < this.p; y++) {
      let b: Point = [Math.pow(y, 2) % this.p, y];
      pointy.push(b);
    }

    // Para cada punto se calcula si su residuo es cuadrático
    for (let i = 0; i < this.p; i++) {
      for (let j = 0; j < this.p; j++) {
        if (pointx[i][1] === pointy[j][0]) {
          let c: Point = [i, j];
          this.points.push(c);
        }
      }
    }
  }

  /**
   * Mostrar resultados obtenidos por pantalla
   */
  print() {
    console.log(chalk.bold.red(`Salida: `));
    console.log(`Puntos de la curva:`);
    console.log(this.points);
    console.log(`Clave pública de A: punto daG = ` + chalk.bold.green(this.publicA));
    console.log(`Clave pública de B: punto dbG = ` + chalk.bold.green(this.publicB));
    console.log(`Clave secreta compartida calculada por A = ` + chalk.bold.green(`${this.Sa}`));
    console.log(`Clave secreta compartida calculada por A = ` + chalk.bold.green(`${this.Sb}`))
    console.log(`M = ` + chalk.bold.green(`${this.M}`));
    console.log(`h = ` + chalk.bold.green(`${this.h} < ${this.p} / ${this.M}`));
    console.log(`Mensaje original codificado como punto Qm =` +  chalk.bold.green(`${this.Qm}`));
    console.log(`Mensaje cifrado y clave pública enviados de A a B: {Qm+dA*(dBG), dAG} = {(` + chalk.bold.green(`${this.messageCipher[0]}`) + `), (` + chalk.bold.green(`${this.messageCipher[1]}`) +`)}`);
  }
}