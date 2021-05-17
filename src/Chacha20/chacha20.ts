/**
 * Práctica 3: chacha20
 */

 export class Chacha20 {
  /**
   * Constructor de la clase chacha20 y del inicialState
   * @param inicialState Estado inicial 512 bits en forma de 8 palabras
   * @param key clave 256 bits en forma de 8 palabras
   * @param counter contador de 32 bits en forma de 1 palabra
   * @param nonce nonce de 96 bits en forma de 3 palabras
   * @param constante constante de 128 bits en forma de 4 palabras
   */
  constructor(private inicialState: number[], private key: number[],
    private counter: number[], private nonce: number[],
    private constante: number[]) {
    for (let i = 0; i < this.constante.length; i++) {
      this.inicialState[i] = this.constante[i];
    }
    for (let i = 0; i < this.key.length; i++) {
      this.inicialState[i+4] = this.key[i];
    }
    this.inicialState[12] = this.counter[0];
    for (let i = 0; i < this.nonce.length; i++) {
      this.inicialState[i+13] = this.nonce[i];
    }
  }

  /**
   * Geter para obtener el estado inicial
   * @returns inicialState
   */
  getInicialState(): number[] {
    return this.inicialState;
  }

  /**
   * Método encargado de llevar a cabo las rotaciones
   * @param a número a rotar
   * @param b Desplazamiento a aplicar
   * @returns número resultante de dicho desplazamiento
   */
  ROTL(a: number, b: number): number {
    const rotate: Uint32Array = new Uint32Array(4);
    rotate[0] = a;
    rotate[1] = b;
    rotate[2] = rotate[0] << rotate[1];
    rotate[3] = rotate[0] >>> (32 - rotate[1]);
    rotate[0] = rotate[2] | rotate[3];
    return rotate[0];
  }

  /**
   * Operación principal que toma como entrada 4 palabras y las actualiza
   * como una salida de 4 palabras
   * @param x UintArray32 estado inicial 512 bits
   * @param a Pos de la palabra 1
   * @param b Pos de la palabra 2
   * @param c Pos de la palabra 3
   * @param d Pos de la palabra 4
   */
  QR(x: Uint32Array, a: number, b: number, c: number, d: number) {
    // Array de 4 palabras cada una de 32 bits
    const arx: Uint32Array = new Uint32Array(4);
    arx[0] = x[a];
    arx[1] = x[b];
    arx[2] = x[c];
    arx[3] = x[d];

    // Aplicamos operaciones ARX
    // Suma de 32 bits; Suma de bits (XOR = d = d ^ arr[0]);
    // Rotaciones implementadas en ROTL
    arx[0] += arx[1]; arx[3] ^= arx[0]; arx[3] = this.ROTL(arx[3], 16);
    arx[2] += arx[3]; arx[1] ^= arx[2]; arx[1] = this.ROTL(arx[1], 12);
    arx[0] += arx[1]; arx[3] ^= arx[0]; arx[3] = this.ROTL(arx[3], 8);
    arx[2] += arx[3]; arx[1] ^= arx[2]; arx[1] = this.ROTL(arx[1], 7);

    x[a] = arx[0];
    x[b] = arx[1];
    x[c] = arx[2];
    x[d] = arx[3];
  }

  /**
   * Método encargado del cifrado chacha20
   * @param inputArray Pasamos por parámetro el estado inicial a cifrar
   * @returns Array de entrada cifrado
   */
  chachaBlock(inputArray: number[]): Uint32Array {
    const x: Uint32Array = new Uint32Array(16);
    const out: Uint32Array = new Uint32Array(16);

    // x estado interno de 512 bits = matrix donde su 1º fila = constante
    // 2º y 3º key y 4º counter + nonce
    for (let i = 0; i < 16; ++i) {
      x[i] = inputArray[i];
    }

    console.log('Estado inicial= ');
    this.printState(x);

    // 20 iteraciones
    for (let i = 0; i < 20; i+= 2) {
      this.QR(x, 0, 4, 8, 12); // Column 0 = cuarto de ronda
      this.QR(x, 1, 5, 9, 13); // Column 1
      this.QR(x, 2, 6, 10, 14); // Column 2
      this.QR(x, 3, 7, 11, 15); // Column 3
      // Una vez acabemos con las columnas ya tenemos una ronda completa
      // Even Round
      this.QR(x, 0, 5, 10, 15); // Column 0
      this.QR(x, 1, 6, 11, 12); // Column 1
      this.QR(x, 2, 7, 8, 13); // Column 2
      this.QR(x, 3, 4, 9, 14); // Column 3
      // Una vez acabado con las diagonales ya tendriamos otra ronda
    }

    console.log('Estado tras 20 iter= ');
    this.printState(x);

    // XOR entre estado inicial y el bloque obtenido tras las 20 rondas
    for (let i = 0; i < 16; ++i) {
      out[i] = x[i] + inputArray[i];
    }
    console.log('Estado de salida del generador= ');
    this.printState(out);

    return out;
  }

  /**
   * Imprimir la salida por pantalla
   * @param out estado a imprimir
   */
  printState(out: Uint32Array) {
    for (let i = 0; i < out.length; i++) {
      if (i % 4 === 0) {
        console.log('\n');
      }
      console.log(out[i].toString(16));
    }
  }
}
