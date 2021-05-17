import inquirer from 'inquirer';
import {AES} from './aes';

export class promptAES {
  constructor() {
  }

  async run() {
    await this.promptMainMenu();
  }

  async promptMainMenu() {
    console.clear();
    console.log('Cifrado AES');

    const key = await inquirer.prompt({
      type: 'input',
      name: 'key',
      message: 'Input key (16 bytes): ',
      default: '0x000102030405060708090a0b0c0d0e0f',
    });
    const textBlock = await inquirer.prompt({
      type: 'input',
      name: 'text',
      message: 'Input original block test: ',
      default: '0x00112233445566778899aabbccddeeff ',
    });

    if (key['key'] != '' && textBlock['text'] != '') {
      const output = new AES(key['key'], textBlock['text']);
      output.escryptionAES();
    }
  }
}