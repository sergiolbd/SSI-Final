import {promptELGammalEliptico} from './ELGammalEliptico/index';
import {promptVigener} from './Vigenere/index';
import {promptRC4} from './RC4/index';
import {promptChacha20} from './Chacha20/index';
import inquirer from 'inquirer';
import { promptCA } from './CA de GPS';
const chalk = require('chalk');
/**
 * Clase App, que representa al programa principal, y el que 
 * se ejecuta en relación al usuario
 */
 export class App {

  private ElGammalEliptico: promptELGammalEliptico;
  private Vigenere: promptVigener;
  private RC4: promptRC4;
  private chacha20: promptChacha20;
  private CA: promptCA;

  constructor() {
    this.ElGammalEliptico = new promptELGammalEliptico();
    this.Vigenere = new promptVigener();
    this.RC4 = new promptRC4();
    this.chacha20 = new promptChacha20();
    this.CA = new promptCA();
  }

  /**
   * Método que se usa de intermediario con
   * otro método
   */
  async run() {
    await this.promptMainMenu();
  }

  /**
   * Método que sirve para el promt del usuario
   * se basa en una serie de opciones
   */
  async promptMainMenu() {
    console.log(chalk.bold.red(`Prácticas Seguridad Sistemas Informátcos`));
    const choices = {
      Practica_1: 'Vigenere',
      Practica_2: 'RC4',
      Practica_3: 'Chacha20',
      Practica_4: 'C/A de GPS',
      Practica_5: 'Multiplicación Snow 3G y AES',
      Practica_6: 'AES',
      Practica_7: 'Modos de Cifrado en Bloque',
      Practica_8: 'Cifrado el Gammal',
      Practica_9: 'RSA',
      Practica_10: 'ElGammal Elíptico',
      exit: 'Salir',
    };

    const prompt = [
      {
        type: 'list',
        message: 'Elija una opción',
        name: 'choice',
        choices: Object.values(choices),
      }
    ];

    let quit = false;
    const action = async (answers: any) => {
      // ------------------------------
      console.clear();
      // ------------------------------
      switch (answers['choice']) {
        case choices.Practica_1:
          await this.Vigenere.run();
          break;
        case choices.Practica_2:
          await this.RC4.run();
          break;
        case choices.Practica_3:
          await this.chacha20.run();
          break;
        case choices.Practica_4:
          await this.CA.run();
          break;
        case choices.Practica_5:
          break;
        case choices.Practica_6:
          break;
        case choices.Practica_7:
          break;
        case choices.Practica_8:
          break;
        case choices.Practica_9:
          break
        case choices.Practica_10:
          await this.ElGammalEliptico.run();
          break;
        case choices.exit:
          quit = true;
      }
    }; 

    await inquirer.prompt(prompt).then(action);
    if (quit) return;
    await this.promptMainMenu();
  }

};

const app = new App();
app.run();