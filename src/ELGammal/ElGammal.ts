import {DiffieHellman} from './diffieHellman';

/**
 * @class ElGammal hereda de DiffiHellman para poder acceder
 * a sus atributos y métodos
 */
export class ELGammal {
  private K: number = 0; // Clave compartida
  private ya: number = 0; // enteros intermedios
  private yb: number = 0; // enterios intermedios
  private C: number = 0; // Mensaje cifrado
  private inverseK: number = 0; // Inverso modular
  private M: number = 0; // Mensaje descifrado
  constructor(private p: number, private a: number, private k: number,
    private x: number, private mensaje: number) {
    // Calculamos los valores públicos de A y B es decir sus entertos intermedios
    const publicA = new DiffieHellman(p, a, k);
    const publicB = new DiffieHellman(p, a, x);
    this.ya = publicA.gety();
    this.yb = publicB.gety();
    // Calculamos la clave compartida K = (ya)^k (mod p)
    this.K = publicA.fastExponentiation(this.yb, k, p);
    // Encriptamos el mensaje
    this.encryption();
    // Calculamos la inversa de K necesario para desencriptar
    this.inverseK = this.eucExt(this.K, p);
    // Desencriptamos M = K⁻¹ * K * m (mod p)
    this.decrypt();
  }

  /**
   * Message Encrypted
   * C = K * m (mod p)
   */
  encryption() {
    this.C = (this.K * this.mensaje) % this.p;
  }

  /**
   * Message Decrypted
   * M = K⁻¹ * K * M (mod p)
   */
  decrypt() {
    this.M = (this.inverseK * this.C) % this.p;
  }

  /**
   * Obtener K = Clave secreta compartida
   * @returns {number} K
   */
  getK() {
    return this.K;
  }

  /**
   * Obtener C = mensaje cifrado
   * @returns {number} C
   */
  getC() {
    return this.C;
  }

  /**
   * Obtener el entero intemedio generado por A
   * @returns {number} yb
   */
  getya() {
    return this.ya;
  }

  /**
   * Obtener el entero intermedio generado por B
   * @returns {number} ya
   */
  getyb() {
    return this.yb;
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

  /**
   * Mostrar los resultados por pantalla
   */
  printGammal() {
    console.log(`Entrada: p = ${this.p}, a = ${this.a}, k = ${this.k}, x = ${this.x} m = ${this.mensaje}`);
    console.log(`Salida: yA = ${this.ya}, yB = ${this.yb}, K = ${this.K}, C = ${this.C}, K⁻¹ = ${this.inverseK} , M = ${this.M}`);
  }
}
