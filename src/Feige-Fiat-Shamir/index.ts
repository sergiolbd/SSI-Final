import inquirer from 'inquirer';
import {FiatFeigeShamir} from './FeigeFiatShamir';

export class promptFeigeFiatShamir {
  constructor() {
  }

  async run() {
    await this.promptMainMenu();
  }

  async promptMainMenu() {
    console.clear();
    console.log('Feige-Fiat-Shamir');
    const p = await inquirer.prompt({
      type: 'number',
      name: 'p',
      message: 'Input p: ',
      default: 7,
    });
    const q = await inquirer.prompt({
      type: 'number',
      name: 'q',
      message: 'Input q: ',
      default: 5,
    });
    const s = await inquirer.prompt({
      type: 'number',
      name: 's',
      message: 'Input s: ',
      default: [16, 2],
    });
    const k = await inquirer.prompt({
      type: 'number',
      name: 'k',
      message: 'Input k: ',
      default: 2,
    });
    const r = await inquirer.prompt({
      type: 'number',
      name: 'r',
      message: 'Input r: ',
      default: 3,
    });
    const signo = await inquirer.prompt({
      type: 'number',
      name: 'signo',
      message: 'Input signo: ',
      default: 1,
    });
    const a = await inquirer.prompt({
      type: 'number',
      name: 'a',
      message: 'Input a: ',
      default: [0,1],
    });
  
    if (p['p'] != '' && q['q'] != '' && s['s'] != '' && k['k'] != '') {
      const output = new FiatFeigeShamir(p['p'], q['q'], s['s'], k['k'], r['r'], signo['signo'], a['a']);
      output.print();
    }
  }
}
