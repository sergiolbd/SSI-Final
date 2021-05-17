import inquirer from 'inquirer';
import {RC4} from './RC4';

export class promptRC4 {
  constructor() {
  }

  async run() {
    await this.promptMainMenu();
  }

  async promptMainMenu() {
    console.clear();
    console.log('RC4');
    const Semilla = await inquirer.prompt({
      type: 'input',
      name: 'semilla',
      message: 'Input semilla: ',
      default: '2,5',
    });
    const text = await inquirer.prompt({
      type: 'input',
      name: 'text',
      message: 'Input atext: ',
      default: '1,34',
    });
  
    if (Semilla['semilla'] != '' && text['text'] != '') {
      RC4(Semilla['semilla'], text['text']);
    }
  }
}
