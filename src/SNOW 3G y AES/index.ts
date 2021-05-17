/**
 * Práctica 5: Multiplicación en SNOW 3G y AES
 */
 import inquirer from 'inquirer';
 import {Multiplication} from '../SNOW 3G y AES/multiplication';

export class promptSNOW {
  constructor() {}

  async run() {
    await this.promptMainMenu();
  }

  async promptMainMenu() {
    console.clear();
    console.log('Multiplicación SNOW 3G y AES');

    enum Algoritmo {
      AES = 'AES',
      SNOW = 'SNOW'
    }
  
    const firstByte = await inquirer.prompt({
      type: 'input',
      name: 'first',
      message: 'Input First byte: ',
      default: '0x57',
    });
    const secondByte = await inquirer.prompt({
      type: 'input',
      name: 'second',
      message: 'Input Second byte: ',
      default: '0x83',
    });
    const algorithm = await inquirer.prompt({
      type: 'list',
      name: 'algorithm_',
      message: 'Select Algortithm: ',
      choices: Object.values(Algoritmo),
      default: 'AES',
    });
  
    if (firstByte['first'] != '' && secondByte['second'] != '' && algorithm['algorithm_'] != '') {
      const mult = new Multiplication(parseInt(firstByte['first']), parseInt(secondByte['second']), algorithm['algorithm_']);
      mult.multiplication();
      mult.print();
    }
  }
}
