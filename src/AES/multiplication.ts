/**
 * Clase encargada de la multiplicación en Snow 3G o AES
 */
 export class Multiplication {
  /**
   * Constructor
   * @param firstByte Multiplicando
   * @param secondByte Multiplicador
   * @param algorithm Algoritmo a usar
   * @param result Resultado de la multiplicación
   */
  constructor(
    private firstByte: number,
    private secondByte: number,
    private readonly algorithm: string,
    private result: number = 0) {
  }

  /**
   * Obtener el multiplicando en binario
   * @returns multiplicando en binario
   */
  getFirstBinary() {
    return this.firstByte.toString(2).padStart(8, '0');
  }

  /**
   * Obtener el multiplicador en binario
   * @returns multiplicador en binario
   */
  getSecondBinary() {
    return this.secondByte.toString(2).padStart(8, '0');
  }

  getResult() {
    // return parseInt(this.result.toString(), 2).toString(16);
    return this.result.toString().padStart(8, '0');
  }

  /**
   * Obtener el byte correspondiende a cada algoritmo
   * @returns AES = 1B SNOW = A9
   */
  getAlgorithmByte() {
    let result: string = '';
    if (this.algorithm === 'AES') {
      result = 0x1B.toString(2).padStart(8, '0');
    } else if (this.algorithm === 'SNOW') {
      result = 0xA9.toString(2).padStart(8, '0');
    }
    return result;
  }

  /**
   * Método encargado de la multplicación
   */
  multiplication() {
    // Obtener el segundo byte despuesto para aplicar distributiva
    const second = this.descompose();

    const result: number[] = [];
    const opDistributive: number[] = [];

    // Obtemos los valores tras aplicar distributiva (XOR ROTATE)
    for (let i = 0; i < second.length; i++) {
      opDistributive[i] = this.distributiva(this.getFirstBinary(), second[i]);
    }

    /**
     *  Aplicamos la suma bit a bit (XOR) a cada uno de los resultados obtenidos
     *  tras realizar la operación distributiva
     */

    for (let i = 0; i < opDistributive.length; i++) {
      for (let j = 0; j < 8; j++) {
        result[j] ^= parseInt(opDistributive[i].toString().padStart(8, '0').charAt(j));
      }
    }

    this.result = this.convertArraytoNumber(result);
  }

  /**
   * Método para descomponer en factores un byte para aplicar distributiva
   * @returns segundo byte descompuesto en factores
   */
  descompose() {
    // Tupla de array de números
    const secondByteDescompose: [number[]] = [[]];
    // Recorremos hasta encontrar un 1
    for (let i = 0; i < this.getSecondBinary().length; i++) {
      if (this.getSecondBinary().charAt(i) === '1') {
        // Array con todo 0
        const dist: number[] = new Array(8).fill(0);
        // Colocamos el 1 en la misma pos que lo encontramos en el segundo byte
        dist[i] = 1;
        // Agregos los dist (distributiva) a la tupla
        secondByteDescompose.unshift(dist);
      }
    }
    // Pop para eliminar basura insertada al final
    secondByteDescompose.pop();

    // Obtenemos los bytes para aplicar distributiva y retornamos
    return this.tuplatoString(secondByteDescompose);
  }

  /**
   * Convertir una tupla en un array
   * @param secondByteDescompose tupla a convertir
   * @returns array de string
   */
  tuplatoString(secondByteDescompose: [number[]]) {
    const A: string[] = [];
    for (let j = 0; j < secondByteDescompose.length; j++) {
      let a: string = '';
      for (let i = 0; i < 8; i++) {
        a += secondByteDescompose[j][i].toString();
      }
      A[j] = a;
    }
    return A;
  }

  /**
   * Método encargado de desplazar y XOR
   * @param first Multplicando
   * @param second byte que indica el desplazamiento a realizar
   * @returns Resultado de aplizar respectivos desplazamientos y XORs
   */
  distributiva(first: string, second: string) {
    // Caso base
    if (second === '00000001') {
      return parseInt(first);
    }

    // Convertir string a Array para poder trabajar bit a bit
    const firstArray: number[] = [];
    for (let i = 0; i < first.length; i++) {
      firstArray[i] = parseInt(first.charAt(i));
    }

    // Index = índice donde se encuentra el único 1
    const index: number = 7 - second.indexOf('1');
    // Recorremos
    for (let i = 0; i < index; i++) {
      if (firstArray[0] === 1) {
        // Desplazar a la izquierda
        firstArray.shift();
        firstArray.push(0);

        // Xor bit a bit con el byte del algoritmo seleccionado
        for (let j = 0; j < 8; j++) {
          firstArray[j] = firstArray[j] ^ parseInt(this.getAlgorithmByte().charAt(j))
        }
      } else if (firstArray[0] === 0) {
        // Desplazar a la izquierda
        firstArray.shift();
        firstArray.push(0);
      }
    }
    // Convertimos el resultado a string
    let result: string = '';
    for (let i = 0; i < firstArray.length; i++) {
      result += firstArray[i];
    }

    return parseInt(result);
  }

  /**
   * Convertir una pos Array a un número
   * @param inputArray Array a convertir
   * @returns número resultante
   */
  convertArraytoNumber(inputArray: number[]) {
    let result: string = '';
    for (let i = 0; i < inputArray.length; i++) {
      result += inputArray[i];
    }
    return parseInt(result);
  }

  /**
   * Imprimir la salida por pantalla
   */
  print() {
    console.log(`Primer Byte:  ${this.getFirstBinary()}\n`+
                `Segundo Byte: ${this.getSecondBinary()} \n`+
                `Byte Algoritmo: ${this.getAlgorithmByte()}\n`+
                `Multiplicación: ${this.result}\n`);
  }
}