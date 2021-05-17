/**
 * Generador C/A usado en GPS
 */

 export class CA {
  /**
   * Constructor de la clase CA encargado de inicializar los parámetro necesarios
   * @param register1 LSFR1
   * @param register2 LSFR2
   * @param sizeSequence tamaño de la secuencia
   * @param idSatelite identificador del satélite
   */
  constructor(private register1: number[], private register2: number[],
    private sizeSequence: number, private idSatelite = 1) {}

  /**
   * Método encargado de generar una secuencia de salida 
   * @returns Secuencia de salida de 14 bits
   */
  generator(): number[] {
    // Secuencia de salida 
    const sequenceCA: number[] = [];
    console.log(`\n*******************************************************`);
    console.log(`*            Generador C/A usado en GPS               *`);
    console.log(`*******************************************************\n`);

    // Realizamos tantas iteraciones como tamaño tenga la secuencia de salida1
    for (let i = 0; i < this.sizeSequence; i++) {
      // LFSR1
      console.log(`[ ${this.register1} ]`);
      // G1 = 1 + x^3 + x^10
      const realimentacion: number = this.register1[3-1]^this.register1[10-1];
      const out1 = this.register1[this.register1.length-1];
      this.register1.pop();
      this.register1.unshift(realimentacion);

      console.log(`Realimentación LFSR1 = ${realimentacion}`);

      // LFSR2
      console.log(`[ ${this.register2} ]`);
      // G2 = 1 + x^2 + x^3 + x^6 + x^8 + x^9 + x^10
      const outFirstXor = this.register2[6-1] ^ this.register2[8-1] ^ this.register2[9-1] ^ this.register2[10-1];
      const outSecondXor = this.register2[2-1]^this.register2[3-1]^outFirstXor;
      // Taps 2 & 6 = PRN1
      const out2 = this.register2[2-1]^this.register2[6-1];
      this.register2.pop();
      const realimentacion2: number = outSecondXor;
      this.register2.unshift(realimentacion2);

      console.log(`Realimentación LFSR2 = ${realimentacion2}\n\n`);
      // C/A code
      sequenceCA[i] = out1 ^ out2;
    }
    console.log(`Secuencia salida = \n ${sequenceCA}\n`);
    return sequenceCA;
  }
}