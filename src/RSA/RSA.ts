const chalk = require('chalk');
/**
 * Clase RSA en ella se definen todos los métodos necesarios para su desarrollo
 */
export class RSA {
  private p: number = 0;
  private q: number = 0;
  private On: number = 0;
  private d: number = 0;
  private n: number = 0;
  private e: number = 0;
  private base: number = 26;
  private sizeBlock: number = 0;
  private blocktext: string[] = [];
  private blockdecimal: number[] = [];
  private cipherText: number[] = [];
  private deciphertText: number[] = [];
  private alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M','N',
                      'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  constructor(private text: string, p_: number, q_: number, d_: number) {
    // Aplicamos test de primalidad
    this.LehmanPeralta(p_) === true ? this.p = p_ : console.log(chalk.bold.red(` ERROR --> p = ${p_} no es primo`));
    this.LehmanPeralta(q_) === true ? this.q = q_ : console.log(chalk.bold.red(` ERROR --> q = ${q_} no es primo`));
    this.LehmanPeralta(d_) === true ? this.d = d_ : console.log(chalk.bold.red(` ERROR --> d = ${d_} no es primo`));

    this.On = (this.p - 1) * (this.q - 1);
    
    this.n = this.p * this.q;

    this.e = this.eucExt(this.d, this.On);

    // Calcular tamaño del bloque
    this.sizeBlock = this.blocksize(this.base, this.n);

    // Dividir texto en bloques de 2, elimnar espacios y pasar a decimal
    this.formatText();

    // Cifrar texto
    this.cipherTextMethod();

    // Descifrar texto
    this.decipherTextMethod();

  }

  cipherTextMethod() {
    for (let i = 0; i < this.blockdecimal.length; i++) {
      this.cipherText[i] = this.fastExponentiation(this.blockdecimal[i], this.e, this.n);
    }
  }

  decipherTextMethod() {
    for (let i = 0; i < this.cipherText.length; i++) {
      this.deciphertText[i] = this.fastExponentiation(this.cipherText[i], this.d, this.n);
    }
  }

  /**
   * Método encargado de formatear el texto a cifrar
   * Elimina espacios
   * Pasa todo a mayúscula
   * Divide en bloques de this.sizeblock
   * Pasa dichos bloques a decimal
   */
  formatText() {
    // Eliminamos espacios
    let deletewhitespaces = this.text.replace(/\s+/g, '');
    deletewhitespaces = deletewhitespaces.toUpperCase();
    // Comprobar que el ultimo bloque es del tamaño j-1
    while(deletewhitespaces.length % this.sizeBlock != 0) {
    // if (deletewhitespaces.length % this.sizeBlock != 0) {
      deletewhitespaces +='X'
    }
    const blocktext: string[] = [];

    // Separamos la cadena en bloques de tamaño sizeblock
    let k = 0; 
    let l = this.sizeBlock;
    for (let i = 0; i < deletewhitespaces.length / this.sizeBlock; i++, k+=this.sizeBlock, l+=this.sizeBlock) {
      blocktext[i] = deletewhitespaces.slice(k, l);
    }
    // console.log(blocktext)
    this.blocktext = blocktext;
    // Se pasa cada bloque a decimal
    const blockdecimal: number[] = [];
    for (let i = 0; i < blocktext.length; i++) {
      let decimal = 0;
      let k = this.sizeBlock - 1;
      for (let j = 0; j < this.sizeBlock; j++) {
       decimal += this.alphabet.indexOf(blocktext[i].charAt(j))*Math.pow(this.base, k--);
      }
      blockdecimal[i] = decimal;
    }
    // console.log(blockdecimal)
    this.blockdecimal = blockdecimal;
  }

  /**
   * Test primalidad
   * @param {number} p Número de determinar si es primo o no
   * @returns {boolean} true si es primo, false si es compuesto
   */
  LehmanPeralta(p: number): boolean {
    const smallprime = [2, 3, 5, 7, 11];

    if(smallprime.includes(p)) return true;

    // Comprobar que p noe es divisible por ningun primo pequeño
    for (let i = 0; i < smallprime.length; i++) {
      if (p % smallprime[i] === 0) return false;
    }

    let numofA = 0;
    let a: number[] = [];
    if (p < 101) {
      numofA = p-2;
    } else {
      numofA = 100;
    }

    // Elegir enteros aleatorios ai entre 2 y p-1
    let i = 0; 
    while (a.length != numofA) {
      a[i] = this.getRandomInt(2, p-1);
      i++;
    }

    for (let j = 0; j < a.length; j++) {
      if (this.fastExponentiation(a[j], (p-1)/2, p) != 1 && this.fastExponentiation(a[j], (p-1)/2, p) != p-1) {
        return false;
      }
    }

    return true;
  }

  /**
   * Entero aleatorio entre min (incluido) max (excluido)
   * @param min 
   * @param max 
   * @returns 
   */
  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  /**
   * Cálculo de exponenciación rápida
   * @param {number} base
   * @param {number} exponent
   * @param {number} module
   * @returns {number} x = base^exponente (mod module)
   */
   fastExponentiation(base: number, exponent: number, module: number) {
    let x = 1;
    let y = base % module;

    while (exponent > 0 && y > 1) {
      if (exponent % 2 != 0) {
        x = (x * y) % module;
        exponent--;
      } else {
        y = (y * y) % module;
        exponent /=2;
      }
    }
    return x;
  }

  /**
   * Calculo del inverso modular haciendo uso del algoritmo de euclides extendido
   * @param {number} a Número a obtener el inverso
   * @param {number} module
   * @returns {number} Inverso modular de a
   */
   eucExt(a: number, module: number) {
    // Inicalizar valores
    const x: number[] = [0, module, a];
    const z = [0, 1];

    let i = 2;
    // Mientras que el resto no de 0
    while (x[i-1] % x[i] != 0) {
      x[i+1] = x[i-1] % x[i];
      const div = Math.trunc(-x[i-1] / x[i]);
      z[i] = div * z[i-1] + z[i-2];

      while (z[i] < 0) {
        z[i] += module;
      }

      z[i] = z[i] % module;

      i++;
    }

    const mcd = x[i];

    /**
     * Comprobamos si el mcd === 1 significa que tiene inverso y
     * este es la última z calculada
     */

    if (mcd === 1) {
      return z[i-1];
    }
    return 0;
  }

  printRSA() {
    console.log(chalk.bold.red(`\nEntrada`));
    console.log(chalk.bold(`Text`) + `= ${this.text}\n` + chalk.bold(`p`) + `= ${this.p}\n`+ chalk.bold(`q`) + ` = ${this.q}\n`+ chalk.bold(`d`) +` = ${this.d}\n`);
    console.log(chalk.bold.red(`Salida:`));
    console.log(chalk.bold(`Ⴔ(n)`)+` = ${this.On}\n`+chalk.bold(`n`)+ `= ${this.n}\n`+ chalk.bold(`e`)+` = ${this.e}`);
    console.log(`Size of block = ${this.sizeBlock}`);
    console.log(`Texto en bloques = ` + chalk.bold.yellow(`${this.blocktext}`));
    console.log(`Texto en bloques decimal = `+ chalk.bold.yellow(`${this.blockdecimal}`));
    console.log(`Texto cifrado en decimal = ` + chalk.bold.green(`${this.cipherText}`));
    
    if (this.checkdeChipherText()) {
      console.log(chalk.bold.yellow(`Descifrado correcto`));
      console.log(`Texto descifrado en decimal = ` + chalk.bold.green(`${this.deciphertText}`));
    }
  }

  /**
   * Calcula el tamaño del bloque
   * @param {number} b 
   * @param {number} n 
   * @returns {number}
   */
   blocksize(b: number, n: number) {
    return (Math.log(n) / Math.log(b)) | 0;
  }

  /**
   * Comprobar si el cifrado y descifrado se ha llevado a cabo correctamente
   * @returns 
   */
  checkdeChipherText() {
    if (this.deciphertText.length != this.blockdecimal.length) return false
    let check  = true;
    for (let i = 0; i < this.deciphertText.length; i++) {
      if (this.deciphertText[i] != this.blockdecimal[i]) {
        check = false;
      }
    }
    return check;
  }
};