
/**
 * Clase Vigenere
 */
export class Vigenere {
  private plaintext: string = '';
  private key: string = '';
  private CipherText: string = '';
  private Decrypedtext: string = '';
  private alphabet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  /**
   * Hace las llamadas necesarias para cifrar y descrifrar un mensaje dado
   * @param plaintText_ 
   * @param key_ 
   */
  constructor(plaintText_: string, key_: string) {
    this.convertidor(plaintText_, key_);
    this.cifrar();
    this.descifrar();
  }

  convertidor(plaintext_: string, key_:string) {
    plaintext_ = plaintext_.toUpperCase();
    key_ = key_.toUpperCase();
    this.plaintext = plaintext_.replace(/\s+/g, '');
    this.key = key_.replace(/\s+/g, '');
  }

  /**
   * Metodo encargado de realizar el cifrado de vigenere, realiza la suma de las posciones de cada una de las letras con su 
   * letra de la clave correspondiente para añadir la clave al texto plano generando asi un texto cifrado con la clave
   */
  cifrar() {
    let rotation: number;  // Contador para recorrer cada una de las letras de la clave
    let pos_y_original: number, pos_x_key: number; // Posición que ocupa la letra del plaintext y de la key en le alfabeto
    let pos_letter_encrypted: number;  // Posición que indicará la letra equivalente en el alfabeto

    for (let i = 0, rotation = 0; i < this.plaintext.length; i++, rotation++) {
      pos_y_original = this.alphabet.indexOf(this.plaintext.charAt(i));
      pos_x_key = this.alphabet.indexOf(this.key.charAt(rotation))
      pos_letter_encrypted = ((pos_y_original + pos_x_key)) % this.alphabet.length;
  
      this.CipherText += this.alphabet.charAt(pos_letter_encrypted);
  
      if (rotation == this.key.length - 1) {
        rotation = -1;
      }
    }
  }

  /**
   * Método encargado del descifrado, seguira el mismo algoritmo que el cifrado pero en este caso se restan
   * posiciones para eleminar la clave del texto cifrado
   */
  descifrar() {
    let rotation, total;       //Rotation = Contador para recorrer cada una de las letras de la clave
    let pos_y_ciphertext, pos_x_key;   //Posición que ocupa la letra del plaintext y de la key en le alfabeto
    let pos_letter_encrypted;  //Posición que indicará la letra equivalente en el alfabeto
  
    for (let i = 0, rotation = 0; i < this.CipherText.length; i++, rotation++) {
      pos_y_ciphertext = this.alphabet.indexOf(this.CipherText.charAt(i));
      pos_x_key = this.alphabet.indexOf(this.key.charAt(rotation));
      total = (pos_y_ciphertext - pos_x_key);
      if (total < 0) {
        pos_letter_encrypted = total + this.alphabet.length;
      } else {
        pos_letter_encrypted = total;
      }
  
      this.Decrypedtext += this.alphabet.charAt(pos_letter_encrypted);
  
      if (rotation == this.key.length - 1) {
        rotation = -1;
      }
    }
  }

  print() {
    console.log(`Salida: `);
    console.log(`Mensaje cifrado = ${this.CipherText}`);
    console.log(`Mensaje descifrado = ${this.Decrypedtext}`);
    console.log('\n');
  }
}