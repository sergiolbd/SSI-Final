import {Multiplication} from './multiplication'

/**
 * Clase AES encargada de todo el proceso del cifrado AES
 */
export class AES {
   private key: string[][] = [[], [], [], []];
   protected text: string[][] = [[], [], [], []];
   private Ciphertext: string[][] = [[], [], [], []];
   private S_box: number[][] = [
    [0x63, 0x7C, 0x77, 0x7B, 0xF2, 0x6B, 0x6F, 0xC5, 0x30, 0x01, 0x67, 0x2B, 0xFE, 0xD7, 0xAB, 0x76],
    [0xCA, 0x82, 0xC9, 0x7D, 0xFA, 0x59, 0x47, 0xF0, 0xAD, 0xD4, 0xA2, 0xAF, 0x9C, 0xA4, 0x72, 0xC0],
    [0xB7, 0xFD, 0x93, 0x26, 0x36, 0x3F, 0xF7, 0xCC, 0x34, 0xA5, 0xE5, 0xF1, 0x71, 0xD8, 0x31, 0x15],
    [0x04, 0xC7, 0x23, 0xC3, 0x18, 0x96, 0x05, 0x9A, 0x07, 0x12, 0x80, 0xE2, 0xEB, 0x27, 0xB2, 0x75],
    [0x09, 0x83, 0x2C, 0x1A, 0x1B, 0x6E, 0x5A, 0xA0, 0x52, 0x3B, 0xD6, 0xB3, 0x29, 0xE3, 0x2F, 0x84],
    [0x53, 0xD1, 0x00, 0xED, 0x20, 0xFC, 0xB1, 0x5B, 0x6A, 0xCB, 0xBE, 0x39, 0x4A, 0x4C, 0x58, 0xCF],
    [0xD0, 0xEF, 0xAA, 0xFB, 0x43, 0x4D, 0x33, 0x85, 0x45, 0xF9, 0x02, 0x7F, 0x50, 0x3C, 0x9F, 0xA8],
    [0x51, 0xA3, 0x40, 0x8F, 0x92, 0x9D, 0x38, 0xF5, 0xBC, 0xB6, 0xDA, 0x21, 0x10, 0xFF, 0xF3, 0xD2],
    [0xCD, 0x0C, 0x13, 0xEC, 0x5F, 0x97, 0x44, 0x17, 0xC4, 0xA7, 0x7E, 0x3D, 0x64, 0x5D, 0x19, 0x73],
    [0x60, 0x81, 0x4F, 0xDC, 0x22, 0x2A, 0x90, 0x88, 0x46, 0xEE, 0xB8, 0x14, 0xDE, 0x5E, 0x0B, 0xDB],
    [0xE0, 0x32, 0x3A, 0x0A, 0x49, 0x06, 0x24, 0x5C, 0xC2, 0xD3, 0xAC, 0x62, 0x91, 0x95, 0xE4, 0x79],
    [0xE7, 0xC8, 0x37, 0x6D, 0x8D, 0xD5, 0x4E, 0xA9, 0x6C, 0x56, 0xF4, 0xEA, 0x65, 0x7A, 0xAE, 0x08],
    [0xBA, 0x78, 0x25, 0x2E, 0x1C, 0xA6, 0xB4, 0xC6, 0xE8, 0xDD, 0x74, 0x1F, 0x4B, 0xBD, 0x8B, 0x8A],
    [0x70, 0x3E, 0xB5, 0x66, 0x48, 0x03, 0xF6, 0x0E, 0x61, 0x35, 0x57, 0xB9, 0x86, 0xC1, 0x1D, 0x9E],
    [0xE1, 0xF8, 0x98, 0x11, 0x69, 0xD9, 0x8E, 0x94, 0x9B, 0x1E, 0x87, 0xE9, 0xCE, 0x55, 0x28, 0xDF],
    [0x8C, 0xA1, 0x89, 0x0D, 0xBF, 0xE6, 0x42, 0x68, 0x41, 0x99, 0x2D, 0x0F, 0xB0, 0x54, 0xBB, 0x16]
   ];
   private M_mixColum: number[][] = [
    [0x02, 0x03, 0x01, 0x01],
    [0x01, 0x02, 0x03, 0x01],
    [0x01, 0x01, 0x02, 0x03],
    [0x03, 0x01, 0x01, 0x02]
   ];
   private Rc: number[][] = [
    [0x01, 0x00, 0x00, 0x00],
    [0x02, 0x00, 0x00, 0x00],
    [0x04, 0x00, 0x00, 0x00],
    [0x08, 0x00, 0x00, 0x00],
    [0x10, 0x00, 0x00, 0x00],
    [0x20, 0x00, 0x00, 0x00],
    [0x40, 0x00, 0x00, 0x00],
    [0x80, 0x00, 0x00, 0x00],
    [0x1B, 0x00, 0x00, 0x00],
    [0x36, 0x00, 0x00, 0x00]
   ];
   private Nb = 4;
   private numOfRounds = 10;
   /**
    * Matrix auxiliar para almacenar momentaneamente las claves expandidas
    */
   private X: string[][] = [[], [], [], []];

   /**
    * Constructor encargado de convertir el texto y la key en una matrix
    * @param key_ Clave
    * @param text_ Texto en claro
    */
    constructor(key_: string, text_:string) {
    this.key = this.setMatrix(key_);
    this.text = this.setMatrix(text_);
   }

   setMatrix(inputArray: string) {
    let result: string[][] = [[], [], [], []];
    let k = 2;
    let l = 4;

     for (let i = 0; i < 4; i++) {
       for (let j = 0; j < 4; j++) {
        result[i][j] = inputArray.slice(k, l);
        k+=2; l+=2;
       }
     }
     
    k = 2;
    l = 4;
    result = this.transpose(result);
    return result;
  }

   getCipherText() {
     return this.Ciphertext;
   }

   getText() {
     return this.text;
   }

   /**
    * Método encargado de ejecutar la secuencia de pasos necesarios para cifrar el texto
    */
   escryptionAES() {
    const keys = this.keyExpansion();
  
    // Etapa Inicial
    this.addRoundKey(this.key, this.text);

    // 9 iteraciones
    for (let i = 1; i < this.numOfRounds; i++) {
      this.SubBytes();

      this.shiftRows();

      this.mixColumn();

      this.addRoundKey(keys[i], this.Ciphertext);
    
    }

    // Etapa final
    this.SubBytes();
    this.shiftRows();
    this.addRoundKey(keys[10], this.Ciphertext);
   
    return this.Ciphertext;
   }

  /**
   * OR-exclusiva byte a byte entre la cada uno de los byte de la clave dada y el texto dado
   * @param key Clave en forma de matrix
   * @param text Texto en forma de matrix
   */
   addRoundKey(key: string[][], text: string[][]) {
     for (let i = 0; i < 4; i++) {
       for (let j = 0; j < 4; j++) {
         let inputblock = parseInt(text[i][j].charAt(0), 16).toString(2).padStart(4, '0') + parseInt(text[i][j].charAt(1), 16).toString(2).padStart(4, '0');
         let keyblock = parseInt(key[i][j].charAt(0), 16).toString(2).padStart(4, '0') + parseInt(key[i][j].charAt(1), 16).toString(2).padStart(4, '0');
         this.Ciphertext[i][j] = (parseInt(inputblock, 2) ^ parseInt(keyblock, 2)).toString(16).padStart(2, '0');
       }
     }
     return this.Ciphertext;
   }

   /**
    * Sustitución no lineal de los bytes de estado basado en la caja S_box que para cada byte genera un nuevo byte
    */
   SubBytes() {
     let rowBox = 0;
     let colBox = 0;
     for (let i = 0; i < 4; i++) {
       for (let j = 0; j < 4; j++) {
        rowBox = parseInt(this.Ciphertext[i][j].charAt(0), 16);
        colBox = parseInt(this.Ciphertext[i][j].charAt(1), 16);
        this.Ciphertext[i][j] = this.S_box[rowBox][colBox].toString(16);
       }
     }
   }

   /**
    * Desplazar a la izquierda los bytes de las filas que conforman la matriz del estado actual
    */
   shiftRows() {
    for (let i = 0; i < 4; i++) {
      this.Ciphertext[i] = this.rotateLeft(this.Ciphertext[i], i);
    }
   }

   /**
    * Rotamos los valores del input a la izquierda tantas veces como diga el rotate
    * @param input Array a desplazar
    * @param rotate Numero de veces a desplazar
    * @returns Array desplazado x veces
    */
   rotateLeft(input: string[], rotate: number) {
    for (let i = 0; i < rotate; i++) {
      let element = input.shift();
      if ( typeof element === 'string') {
        input.push(element.padStart(2, '0'));
      }
    }
    return input;
   }

   /**
    * Multiplicación de Matriz por columna usando la M_mixcolumn
    */
   mixColumn() {
    this.Ciphertext = this.transpose(this.Ciphertext);
    for (let i = 0; i < 4; i++) {
      this.Ciphertext[i] = this.multiplyMatrixColumn(this.Ciphertext[i]);
    }
    this.Ciphertext = this.transpose(this.Ciphertext);
   }

   /**
    * Metodo encargado de multiplicar una matriz por una columna
    * @param column 
    * @returns 
    */
   multiplyMatrixColumn(column: string[]): string[] {

    let resultxor: string = '';
     let multiplication: string[] = ['', '', '', ''];
      for (let i = 0; i < this.M_mixColum.length; i++) {
        for (let j = 0; j < this.M_mixColum.length; j++) {
          // Hacemos uso de la multiplicación de dos bytes haciendo uso de la práctica implementada en la práctica anterior
          const output = new Multiplication(this.M_mixColum[i][j], parseInt(column[j], 16), 'AES');
          output.multiplication();
          multiplication[i] = this.xorbitabit(output.getResult(), multiplication[i].padStart(8, '0'));
        }
      }
      // Convertir binario a hexadecimal
      for (let j = 0; j < this.M_mixColum.length; j++) {
        multiplication[j] = parseInt(multiplication[j], 2).toString(16).padStart(2, '0');
      }
      return multiplication;
   }

   /**
    * Aplicar la xor bit a bit entre dos bytes dados de manera binaria
    * @param byte1 byte1 en binario
    * @param byte2 byte2 en binario
    * @returns byte1^byte2
    */
   xorbitabit(byte1: string, byte2: string) {
      let result: string = '';
      for (let i = 0; i < 8; i++) {
          result += parseInt(byte1.charAt(i), 2) ^ parseInt(byte2.charAt(i), 2);
      }
      return result;
   }

   /**
    * Método encargado de generar las subclaves necesarias
    * @returns 10 claves expandidas
    */
   keyExpansion() {
    const expandKey = [[...this.key]];

    for (let i = 1; i <= this.numOfRounds; i++) {
      expandKey.push(this.getExpandKey(expandKey[i-1], i));
    }
    return expandKey;
   }

   /**
    * Método encargado de generar subclaves una a una en forma de matrix
    * @param iExpKey Suclave anterior
    * @param index índice de la subclave anterior
    * @returns subclave generada
    */
   getExpandKey(iExpKey: string[][], index: number): string[][] {
    const word = this.transpose(iExpKey);

    let temp: string[] = [];
    temp = word[3];

    for (let i = 0; i < 4; i++) {
      if (i+4 % 4 == 0) {
        // Rotación cíclica a derecha
        this.rotateLeft(temp, 1);

        // Sustituir por S-Box
        this.SubBytes_ExpKey(temp);

        //XOR
        for (let j = 0; j < 4; j++) {
          let firstByte = parseInt(word[i][j], 16).toString(2).padStart(8, '0') ;
          let secondByte = parseInt(temp[j], 16).toString(2).padStart(8, '0');
          let firstxor = this.xorbitabit(firstByte, secondByte);
          let RcByte = parseInt(this.Rc[index-1][j].toString(16),16).toString(2).padStart(8, '0');
          temp[j] = this.xorbitabit(firstxor, RcByte)
        }
        
        for (let j = 0; j < 4; j++) {
          temp[j] = parseInt(temp[j], 2).toString(16).padStart(2, '0');
        }

      } else {
        for (let j = 0; j < 4; j++) {
          let firstByte = parseInt(word[i][j], 16).toString(2).padStart(8, '0');
          let secondByte = parseInt(temp[j], 16).toString(2).padStart(8, '0');
          temp[j] = this.xorbitabit(firstByte, secondByte)
        }

        for (let j = 0; j < 4; j++) {
          temp[j] = parseInt(temp[j], 2).toString(16).padStart(2, '0');
        }
      }
    
      word[word.length-1] = this.transpose(iExpKey)[3];

      for (let k = 0; k < 4; k++) {
        this.X[i][k] = temp[k];
      }
    }
   
    return this.transpose(this.X);
   }

   /**
    * Aplicación del subByte a una sola columna dada por parámetro
    * @param temp columna dada
    * @returns columna una vez aplicada la sustitución
    */
   SubBytes_ExpKey(temp: string[]): string[] {
    let rowBox = 0;
    let colBox = 0;
    for (let i = 0; i < 4; i++) {
      rowBox = parseInt(temp[i].charAt(0), 16);
      colBox = parseInt(temp[i].charAt(1), 16);
      temp[i] = this.S_box[rowBox][colBox].toString(16).padStart(2, '0');
    }
    return temp;
  }

  /**
   * Calcular la traspuesta de una matrix
   * @param matrix 
   * @returns Matriz traspuesta
   */
  transpose(matrix: string[][]) {
    let aux: string[][] =  [[], [], [], []];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        aux[j][i] = matrix[i][j];
      }
     }
    return aux;
  }

  printExpandKeys() {
    const ExpandKey = this.keyExpansion();
    console.log(ExpandKey);
  }
  
  printKey() {
  // console.log('\nKEY');
  // console.table(this.key);
  console.log(`Clave: ${this.transpose(this.key)}`);
  }

  printText() {
  console.log('\nTEXT');
  console.table(this.text);
  }

  printCipherText() {
  console.log('\n');
  console.table(this.Ciphertext);
  }
 }