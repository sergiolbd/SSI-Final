/**
 * Generador C/A usado en GPS
 */

 export class CA {
   private taps: [number, number] = [0,0];
  /**
   * Constructor de la clase CA encargado de inicializar los parámetro necesarios
   * @param register1 LSFR1
   * @param register2 LSFR2
   * @param sizeSequence tamaño de la secuencia
   * @param idSatelite identificador del satélite
   */
  constructor(private register1: number[], private register2: number[],
    private sizeSequence: number, private idSatelite: number) {
      this.selectSatelite(idSatelite);
    }

  selectSatelite(id: number) {
    switch(id) {
      case 1: this.taps = [2, 6];
        break;
      case 2: this.taps = [3, 7];
        break;
      case 3: this.taps = [4, 8];
        break;
      case 4: this.taps = [5, 9];
        break;
      case 5: this.taps = [1, 9];
        break;
      case 6: this.taps = [2, 10];
        break;
      case 7: this.taps = [1, 8];
        break;
      case 8: this.taps = [2, 9]
        break;
      case 9: this.taps = [3, 10];
        break;
      case 10: this.taps = [2, 3];
        break;
      case 11: this.taps = [3, 4];
        break;
      case 12: this.taps = [5, 6];
        break;
      case 13: this.taps = [6, 7];
        break;
      case 14: this.taps = [7, 8];
        break;
      case 15: this.taps = [8, 9];
        break;
      case 16: this.taps = [9, 10];
        break;
      case 17: this.taps = [1, 4];
        break;
      case 18: this.taps = [2, 5];
        break;
      case 19: this.taps = [3, 6];
        break;
      case 20: this.taps = [4, 7];
        break;
      case 21: this.taps = [5, 8];
        break;
      case 22: this.taps = [6, 9];
        break;
      case 23: this.taps = [1, 3];
        break;
      case 24: this.taps = [4, 6];
        break;
      case 25: this.taps = [5, 7];
        break;
      case 26: this.taps = [6, 8];
        break;
      case 27: this.taps = [7, 9];
        break;
      case 28: this.taps = [8, 10];
        break;
      case 29: this.taps = [1, 6];
        break;
      case 30: this.taps = [2, 7];
        break;
      case 31: this.taps = [3, 8];
        break;
      case 32: this.taps = [4, 9];
        break;
      default: 
        console.log(`Error --> Numero de salétite entre 1 - 32`);
        break;
    }
  }

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
      // Taps x
      const out2 = this.register2[this.taps[0]-1]^this.register2[this.taps[1]-1];
      this.register2.pop();
      const realimentacion2: number = outSecondXor;
      this.register2.unshift(realimentacion2);

      console.log(`Realimentación LFSR2 = ${realimentacion2}\n\n`);
      // C/A code
      sequenceCA[i] = out1 ^ out2;
    }
    console.log(`Secuencia salida = \n ${sequenceCA}\n`);
    console.log(`Taps: ${this.taps[0]} & ${this.taps[1]}`);
    return sequenceCA;
  }
}