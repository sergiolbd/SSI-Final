/**
 * Tipo de dato que representa un punto
 */
export type Point = [number, number];

/**
 * Método encargado de la suma de dos puntos A + B
 * @param {Point} A 
 * @param {Point} B 
 * @param {number} a 
 * @param {number} p 
 * @returns {Point} Resultado de la suma de A + B
 */
export function addTwoPoints(A: Point, B: Point, a: number, p:number): Point {
  let result: Point = [0, 0];
  let lambda = 0;

  if (B[0] === A[0] && B[1] === -A[1]) {
    result = [0, 0];
  } else {
    if (A[0] === B[0] && A[1] === B[1]) {
      lambda = ((3 * Math.pow(A[0], 2) + a) / (2 * A[1]));
      if (!Number.isInteger(lambda)) {
        let inverso = eucExt((2*A[1]), p);
        lambda = ( (3 *(Math.pow(A[0], 2)) + a) * inverso) % p;
      } else {
        lambda = lambda % p;
      }
    } else {
      lambda = ((B[1] - A[1]) / (B[0] - A[0]));
      if (!Number.isInteger(lambda)) {
        lambda = ((B[1] - A[1]) * eucExt((B[0] - A[0]), p)) % p;
      } else {
        lambda = lambda % p;
      }
    }
  
    let x3 = (Math.pow(lambda, 2) - A[0] - B[0]) % p;
    let y3 = (lambda * (A[0] - x3) - A[1]) % p;

    while (x3 < 0 ){ x3 = x3+p}
    while (y3 < 0 ){ y3 = y3+p}
  
    result = [x3, y3];
  }

  return result;
}

/**
* Cálculo de exponenciación rápida
* @param {number} base
* @param {number} exponent
* @param {number} module
* @returns {number} x = base^exponente (mod module)
*/
export function fastExponentiation(base: number, exponent: number, module: number) {
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
   * Test primalidad
   * @param {number} p Número de determinar si es primo o no
   * @returns {boolean} true si es primo, false si es compuesto
   */
export function LehmanPeralta(p: number): boolean {
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
    a[i] = getRandomInt(2, p-1);
    i++;
  }

  for (let j = 0; j < a.length; j++) {
    if (fastExponentiation(a[j], (p-1)/2, p) != 1 && fastExponentiation(a[j], (p-1)/2, p) != p-1) {
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
export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
   * Calculo del inverso modular haciendo uso del algoritmo de euclides extendido
   * @param {number} a Número a obtener el inverso
   * @param {number} module
   * @returns {number} Inverso modular de a
   */
export function eucExt(a: number, module: number) {
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
 * Método encargado de descomponer un número como el sumatorio de consecutivos 2 más un 1 si es impar 
 * @param x Numero a descomponer
 * @returns 
 */
export function descompose(x: number) {
  let sum = 0;
  let descomposición: number[] = [];
  let flag = false;
  if (x % 2 != 0) {
    sum += 1;
    flag = true;
  } 
    while (sum != x) {
      descomposición.push(2);
      sum += 2;
    }

    if (flag === true) {
      descomposición.push(1)
    }
  return descomposición;
}