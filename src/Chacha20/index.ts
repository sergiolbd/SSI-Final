import inquirer from 'inquirer';
import {Chacha20} from './chacha20';

export class promptChacha20 {
  constructor() {
  }

  async run() {
    await this.promptMainMenu();
  }

  async promptMainMenu() {
    console.clear();
    console.log('Chacha 20');
    const key = await inquirer.prompt({
      type: 'number',
      name: 'key',
      message: 'Input key: ',
      default: [0x03020100, 0x07060504, 0x0b0a0908, 0x0f0e0d0c, 0x13121110, 0x17161514, 0x1b1a1918, 0x1f1e1d1c],
    });
    const counter = await inquirer.prompt({
      type: 'number',
      name: 'counter',
      message: 'Input counter: ',
      default: [0x00000001],
    });
    const nonce = await inquirer.prompt({
      type: 'number',
      name: 'nonce',
      message: 'Input nonce: ',
      default: [0x09000000, 0x4a000000, 0x00000000],
    });
    const constante = await inquirer.prompt({
      type: 'number',
      name: 'constante',
      message: 'Input counter: ',
      default: [0x61707865, 0x3320646e, 0x79622d32, 0x6b206574],
    });
  
    if (key['key'] != '' && counter['counter'] != '' && constante['constante'] != '' && nonce['nonce'] != '') {
      let inicialState: number[] = [];

      const chacha = new Chacha20(inicialState, key['key'], counter['counter'], nonce['nonce'], constante['constante']);
      inicialState = chacha.getInicialState();
      chacha.chachaBlock(inicialState);
      console.log('\n');
    }
  }
}
