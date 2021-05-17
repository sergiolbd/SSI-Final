import {ELGammal} from './ELGammal';
import {Point} from './types'
import inquirer from 'inquirer';

export class promptELGammalEliptico {
  constructor() {
  }

  async run() {
    await this.promptMainMenu();
  }

  async promptMainMenu() {
    console.clear();
    console.log('ALGORITMOS DIFFIE-HELLMAN y ELGAMAL ELÍPTICOS');
    const p = await inquirer.prompt({
      type: 'number',
      name: 'p',
      message: 'Input p: ',
      default: 13,
    });
    const a = await inquirer.prompt({
      type: 'number',
      name: 'a',
      message: 'Input a: ',
      default: 5,
    });
    const b = await inquirer.prompt({
      type: 'number',
      name: 'b',
      message: 'Input b: ',
      default: 3,
    });
    const G = await inquirer.prompt({
      type: 'input',
      name: 'G',
      message: 'Input G: ',
      default: '9,6',
    });
    const da = await inquirer.prompt({
      type: 'number',
      name: 'da',
      message: 'Input da: ',
      default: 4,
    });
    const db = await inquirer.prompt({
      type: 'number',
      name: 'db',
      message: 'Input db: ',
      default: 2,
    });
    const m = await inquirer.prompt({
      type: 'number',
      name: 'm',
      message: 'Input original message: ',
      default: 2,
    });
  
  
    if (p['p'] != '' && a['a'] != '' && b['b'] != '' && da['da'] != '' && db['db'] != '' && G['G'] != '') {
      let point: string[] = G['G'].split(',');
      const PointG: Point = [parseInt(point[0]), parseInt(point[1])];
      const output = new ELGammal(p['p'], a['a'], b['b'], PointG, da['da'], db['db'], m['m']);
      output.print();
    }
  }
}
