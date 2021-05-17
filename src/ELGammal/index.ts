import {ELGammal} from './ElGammal';
import inquirer from 'inquirer';


export class promptELGammal {
  constructor() {
  }

  async run() {
    await this.promptMainMenu();
  }
  
  async promptMainMenu() {
    console.clear();
    console.log('ALGORITMOS DIFFIE-HELLMAN y ELGAMAL');
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
      default: 4,
    });
    const k = await inquirer.prompt({
      type: 'number',
      name: 'k',
      message: 'Input b: ',
      default: 5,
    });
    const x = await inquirer.prompt({
      type: 'number',
      name: 'x',
      message: 'Input G: ',
      default: 2,
    });
    const m = await inquirer.prompt({
      type: 'number',
      name: 'm',
      message: 'Input da: ',
      default: 8,
    });
   
  
    if (p['p'] != '' && a['a'] != '' && k['k'] != '' && x['x'] != '' && m['m'] != '') {
      const output = new ELGammal(p['p'], a['a'], k['k'],  x['x'], m['m']);
      output.printGammal();
    }
  }
}


