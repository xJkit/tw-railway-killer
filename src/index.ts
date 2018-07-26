import inquirer from 'inquirer';
import { QUESTIONS } from './constants';
import Passenger from './passenger';

(async function main() {
  const { target }: inquirer.Answers = await inquirer.prompt([
    QUESTIONS.selectOrderMode
  ]);
  const passenger = new Passenger(target);
  passenger.run();
})();
