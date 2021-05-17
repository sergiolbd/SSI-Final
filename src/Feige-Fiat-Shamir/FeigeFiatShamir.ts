import { getRandomInt } from '../ELGammalEliptico/types';
import {LehmanPeralta} from './types';
const chalk = require('chalk');

export class FiatFeigeShamir {
  private p: number = 0;
  private q: number = 0;
  private n: number = 0;
  private s: number[] = []; // Identificación secreta de A
  private v: number[] = []; // Identificación pública de A
  private r: number = 0; //Entero aleatorio
  private signo: number = 0; // Signo aleatorio
  private x: number = 0; // Testigo
  private a: number[] = []; // bits B envía A
  private y: number = 0; // Respuesta A envía a B
  private k: number = 0;
  constructor(p_: number, q_: number, s_: number[], k_: number, r_ :number, signo_: number, a_: number[]) {
    LehmanPeralta(p_) === true ? this.p = p_ : console.log(chalk.bold.red(` ERROR --> p = ${p_} no es primo`));
    LehmanPeralta(q_) === true ? this.q = q_ : console.log(chalk.bold.red(` ERROR --> q = ${q_} no es primo`));

    this.n = this.p * this.q;
    this.k = k_;

    s_.forEach((value) => {
      if(value > 0 && value < this.n) {
        this.s.push(value);
      } else {
        console.log(chalk.bold.red(` ERROR --> s = ${s_} debe estar entre 0 y ${this.n}`));
      }
    });

    // Identificación pública de A
    this.publicA();

    // // Compromiso secreto de A
    this.r = r_;
    (signo_ === -1 || signo_ === 1) ? this.signo = signo_ : console.log(chalk.bold.red(` ERROR --> signo = ${signo_} solo puede ser -1 o 1`));

    // Testigo: A envía a B
    this.x = (this.signo * Math.pow(this.r, 2)) % this.n;

    // Reto: B envía a A
    a_.forEach((value) => {
      if (value === 0 || value === 1) {
        this.a.push(value);
      } else {
        console.log(chalk.bold.red(` ERROR --> a = ${value} no permitido`));
      }
    });

    let result = 1;
    // // Respuesta: A envía a B
    for (let i = 0; i < k_; i++) {
      result *= Math.pow(this.s[i], this.a[i]);
    }
    this.y = (this.r * result) % this.n;

  }

  /**
   * Identificación pública de A
   */
  publicA() {
    this.s.forEach((value) => {
      this.v.push((Math.pow(value, 2) % this.n));
    })
  }

  // Verificación
  check() {
    const y2 = (Math.pow(this.y, 2)) % this.n;
    let result = 1;
    for (let i = 0; i < this.k; i++) {
      result *= (Math.pow(this.v[i], this.a[i]));
    }
    const output = ((this.x * result) % this.n);
    if (y2 === output) {
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