export class DiffieHellman {
  /**
   * y = a^k (mod p)
   */
  protected y: number = 0;

  /**
   * Constructor de la clase diffie-Hellman
   * @param {number} p primo
   * @param {number} a Raíz primitiva
   * @param {number} k Número aleatorio
   */
  constructor(private p: number, private a: number, private k: number) {
    if (a < p) {
      if (this.isPrime(p)) {
        this.y = this.fastExponentiation(a, k, p);
      } else {
        console.log('P debe ser primo');
      }
    } else {
      console.log('a no puede ser mayor que p');
    }
  }

  /**
   * Obtener el ya o yb
   * @returns {number} y
   */
  gety() {
    return this.y;
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
   * Comprobar si un número p es primo o no
   * @param {number} p Número a comprobar
   * @returns {boolean}
   */
  isPrime(p: number) {
    let a = 0;
    for (let i = 1; i < p+1; i++) {
      if (p % i === 0) {
        a++;
      }
    }
    if (a != 2) {
      return false;
    } else {
      return true;
    }
  }
}
