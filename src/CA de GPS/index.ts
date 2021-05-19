import inquirer from 'inquirer';
import { CA } from './CA';

export class promptCA {
  constructor() {
  }

  async run() {
    await this.promptMainMenu();
  }

  async promptMainMenu() {
    console.clear();

    const LSFR1 = await inquirer.prompt({
      type: 'number',
      name: 'LSFR1',
      message: 'Input LSFR1: ',
      default: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    });
    const LSFR2 = await inquirer.prompt({
      type: 'number',
      name: 'LSFR2',
      message: 'Input LSFR2: ',
      default: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    });
    const sizeSequence = await inquirer.prompt({
      type: 'number',
      name: 'sizeSequence',
      message: 'Input size of Sequence: ',
      default: 14,
    });
    const idSatelite = await inquirer.prompt({
      type: 'number',
      name: 'idSatelite',
      message: 'Input id Satelite: ',
      default: 1,
    });
  
  
    if (LSFR1['LSFR1'] != '' && LSFR2['LSFR2'] != '' && sizeSequence['sizeSequence']) {
      const CA1 = new CA(LSFR1['LSFR1'], LSFR2['LSFR2'], sizeSequence['sizeSequence'], idSatelite['idSatelite']);
      CA1.generator();
    }
  }
}
