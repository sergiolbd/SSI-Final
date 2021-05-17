import inquirer from 'inquirer';
import {Vigenere} from './vigenere';

export class promptVigener {
  constructor() {
  }

  async run() {
    await this.promptMainMenu();
  }

  async promptMainMenu() {
    console.clear();
    console.log('VIGENERE');
    const text = await inquirer.prompt({
      type: 'input',
      name: 'text',
      message: 'Input message: ',
      default: 'ESTE MENSAJE SE AUTODESTRUIRA',
    });
    const key = await inquirer.prompt({
      type: 'input',
      name: 'key',
      message: 'Input key: ',
      default: 'MISION',
    });
  
    if (text['text'] != '' && key['key'] != '') {
      const output = new Vigenere(text['text'], key['key']);
      output.print();
    }
  }
}