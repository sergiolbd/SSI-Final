import {RSA} from './RSA';
import inquirer from 'inquirer';

export class promptRSA {
  constructor() {
  }

  async run() {
    await this.promptMainMenu();
  }

  async promptMainMenu() {
    console.clear();
    console.log('Cifrado RSA');

    const text = await inquirer.prompt({
      type: 'input',
      name: 'text',
      message: 'Input text: ',
      default: 'MANDA DINEROS',
    });
    const p = await inquirer.prompt({
      type: 'number',
      name: 'p',
      message: 'Input p: ',
      default: 421,
    });
    const q = await inquirer.prompt({
      type: 'number',
      name: 'q',
      message: 'Input q: ',
      default: 7,
    });
    const d = await inquirer.prompt({
      type: 'number',
      name: 'd',
      message: 'Input d: ',
      default: 1619,
    });

    if (text['text'] != '' && q['q'] != '' && p['p'] != '' && d['d'] != '') {
      const output = new RSA(text['text'], p['p'], q['q'], d['d']);
      output.printRSA();
    }
  }
}