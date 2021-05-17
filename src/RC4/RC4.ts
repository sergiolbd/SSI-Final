/**
 * @author Sergio Leopoldo Benítez Delgado
 * @summary Práctica 2: Cifrado RC4
 */

/**
 *
 * @param Semilla de clave inicializa vector estado (K)
 * @param texto Texto a cifrar
 */
 export function RC4(Semilla: string, texto: string): void {
  const key: string[] = Semilla.split(',');
  const text: string[] = texto.split(',');
  const S: string[] = [];
  const K: string[] = [];

  KSA(key, S, K); // Proceso de inicialización de los vectores de estados S y K
  console.log('--------------------------------------------');
  console.log(`Mensaje original ${text}`);
  console.log(`Semilla ${key}`);
  console.log('--------------------------------------------');
  const textoCifradoCifrado: string[] = PRGA(S, text);
  console.log(`Mensaje cifrado: ${textoCifradoCifrado}`);
  console.log('--------------------------------------------\n');
}

/**
 *
 * @param Semilla clave para inicializar k
 * @param S  Vector de estado que contiene inialmente numero de 0 a 255
 * @param K  Vector de estado inicializado con la semilla clave
 */
function KSA(Semilla: string[], S:string[], K: string[]): void {
  for (let i: number = 0; i < 256; i++) {
    S[i] = i.toString();
    K[i] = Semilla[i % Semilla.length];
  }
  let j: number = 0;
  console.log(S);
  console.log(K);
  for (let i: number = 0; i < 256; i++) {
    j = (j + parseInt(S[i]) + parseInt(K[i])) % 256;
    const aux: string = S[i];
    S[i] = S[j];
    S[j] = aux;
  }
  console.log(S);
  console.log(S[38]);
}

/**
 * @function PRGA (Genetación de secuencia cifrante)
 * @param S
 * @param text
 * @returns vector con el mensaje cifrado
 */
function PRGA(S:string[], text:string[]): string[] {
  let i: number = 0;
  let j: number = 0;
  let t: number = 0;
  const textoCifrado: string[] = [];
  let cf: string;
  const secuenciaCifrante: string[] = [];
  const secuenciaCifranteBinaria: string[] = [];
  const cifradoBinario: string[] = [];

  // Recorrer letra a letra el texto a cifrar
  for (let k: number = 0; k < text.length; k++) {
    // Generamos un byte de secuencia cifrante por cada byte de texto
    i = (i + 1) % 256;
    j = (j + parseInt(S[i])) % 256;
    const aux: string = S[i];
    S[i] = S[j];
    S[j] = aux;
    t = (parseInt(S[i]) + parseInt(S[j])) % 256;
    cf = S[t];
    secuenciaCifrante[i] = cf;
    secuenciaCifranteBinaria[i] = parseInt(cf).toString(2);
    textoCifrado[k] = (parseInt(text[k]) ^ parseInt(cf)).toString();
    cifradoBinario[k] = parseInt(textoCifrado[k]).toString(2);
  }
  console.log(`Secuencia cifrante: ${secuenciaCifrante}`);
  console.log(`Secuencia cifrante binaria: ${secuenciaCifranteBinaria}`);
  console.log(`Mensaje cifrado binario: ${cifradoBinario}`);

  return textoCifrado;
}