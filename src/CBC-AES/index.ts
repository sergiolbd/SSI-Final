/**
 * Práctica 7:Modo CBC de operación en cifrado en bloque(usando AES)
 * @author Sergio Leopoldo Benítez Delgado 
 */
import * as inquirer from 'inquirer';
import { CBC } from './CBC'

export class promptCBC {
  constructor() {
  }

  async run() {
    await this.promptMainMenu();
  }

  async promptMainMenu() {
    console.clear();
    console.log('Modo CBC (usando AES)');
    const key = await inquirer.prompt({
      type: 'input',
      name: 'key',
      message: 'Input key (16 bytes): ',
      default: '0x000102030405060708090a0b0c0d0e0f',
    });
    const IV = await inquirer.prompt({
      type: 'input',
      name: 'IV',
      message: 'Input IV (16 bytes): ',
      default: '0x00000000000000000000000000000000',
    });
    
    const textBlock = await inquirer.prompt({
      type: 'input',
      name: 'text',
      message: 'Input original block 1: ',
      default: '0x00112233445566778899aabbccddeeff',
    });
  
    // const textBlock2 = await inquirer.prompt({
    //   type: 'input',
    //   name: 'text',
    //   message: 'Input original block 2: ',
    //   default: '0x00000000000000000000000000000000',
    // });
  
    if (key['key'] != '' && textBlock['text'] != '' &&  IV['IV'] != '') {
      let Blocktext = [textBlock['text'], '0x00000000000000000000000000000000']
      const output = new CBC(key['key'], Blocktext, IV['IV']);
      output.encryptionCBC();
    }
  }
}