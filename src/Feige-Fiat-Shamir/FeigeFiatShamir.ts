import { getRandomInt } from '../ELGammalEliptico/types';
import {LehmanPeralta} from './types';
const chalk = require('chalk');

export class FiatFeigeShamir {
  private p: number = 0;
  private q: number = 0;
  private n: number = 0;
  private s: number = 0; // Identificación secreta de A
  private v: number = 0; // Identificación pública de A
  private r: number = 0; //Entero aleatorio
  private signo: number = 0; // Signo aleatorio
  private x: number = 0; // Testigo
  private a: number = 0; // bits B envía A
  private y: number = 0; // Respuesta A envía a B
  private k: number = 0;
  constructor(p_: number, q_: number, s_: number, r_ :number, signo_: number, a_: number) {
    LehmanPeralta(p_) === true ? this.p = p_ : console.log(chalk.bold.red(` ERROR --> p = ${p_} no es primo`));
    LehmanPeralta(q_) === true ? this.q = q_ : console.log(chalk.bold.red(` ERROR --> q = ${q_} no es primo`));

    this.n = this.p * this.q;

    if(s_ > 0 && s_ < this.n) {
      this.s = s_;
    } else {
      console.log(chalk.bold.red(` ERROR --> s = ${s_} debe estar entre 0 y ${this.n}`));
    }

    // Identificación pública de A
    this.publicA();

    // // Compromiso secreto de A
    this.r = r_;
    (signo_ === -1 || signo_ === 1) ? this.signo = signo_ : console.log(chalk.bold.red(` ERROR --> signo = ${signo_} solo puede ser -1 o 1`));

    // Testigo: A envía a B
    this.x = (this.signo * Math.pow(this.r, 2)) % this.n;

    // Reto: B envía a A

    if (a_ === 0 || a_ === 1) {
      this.a = a_;
    } else {
      console.log(chalk.bold.red(` ERROR --> a = ${a_} no permitido`));
    }

    // Respuesta: A envía a B
    const result = Math.pow(this.s, this.a);

    this.y = (this.r * result) % this.n;

  }

  /**
   * Identificación pública de A
   */
  publicA() {
    this.v = ((Math.pow(this.s, 2) % this.n));
  }

  // Verificación
  check() {
    let y2 = (Math.pow(this.y, 2)) % this.n;
    const result = (Math.pow(this.v, this.a));

    let output = ((this.x * result) % this.n);

    if (y2 === output || -1*y2 === output || y2 === output*-1) {
      return true;
    } else {
      return false;
    }
  }

  print() {
    console.log(`\nSalida: `);
    console.log(`n = ` + chalk.bold.green(`${this.n}`));
    console.log(`s = ` + chalk.bold.green(`${this.s}`));
    console.log(`v = ` + chalk.bold.green(`${this.v}`));
    console.log(`r = ` + chalk.bold.green(`${this.r}`));
    console.log(`signo = ` + chalk.bold.green(`${this.signo}`));
    console.log(`x = ` + chalk.bold.green(`${this.x}`));
    console.log(`y = ` + chalk.bold.green(`${this.y}`));
     // Verificación
    this.check() === true ? console.log('Verificación: ' + chalk.bold.green('True')) : console.log('Verificación: ' + chalk.bold.green('False'))
  }
}