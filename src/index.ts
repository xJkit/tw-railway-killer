import * as inquirer from 'inquirer';
import { QUESTIONS } from './constants';
import Train from './train';

(async function main() {
  const { target }: inquirer.Answers = await inquirer.prompt([
    QUESTIONS.selectOrderMode
  ]);
  const train = new Train(target);
  train.run();
})();
