
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
