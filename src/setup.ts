import path from 'path';
import inquirer from 'inquirer';
import writeFile from 'write';
import { exec } from 'child_process';
import { QUESTIONS, TicketOrderMode } from './constants';

(async () => {
  let ans = await inquirer.prompt([
    QUESTIONS.ID,
    QUESTIONS.fromStation,
    QUESTIONS.toStation,
    QUESTIONS.trainNo,
    QUESTIONS.ticketCount,
    QUESTIONS.travelDate,
    QUESTIONS.selectOrderMode
  ]);

  const isRoundTrip = ans.target === TicketOrderMode.ROUND_TRIP;

  if (isRoundTrip) {
    const roundAns = await inquirer.prompt([
      QUESTIONS.trainNoHome,
      QUESTIONS.ticketCountHome,
      QUESTIONS.travelDateHome
    ]);
    ans = { ...ans, ...roundAns };
  }

  console.log('====你設定的資訊如下==================');
  console.log(`身分證號: ${ans.ID}`);
  console.log(`起站: ${ans.fromStation}`);
  console.log(`迄站: ${ans.toStation}`);
  console.log(`張數: ${ans.ticketCount}`);
  console.log(`車次代號: ${ans.trainNo}`);
  console.log(`旅行日期: ${ans.travelDate}`);
  if (isRoundTrip) {
    console.log('------ 回程資訊 -----');
    console.log(`張數(回程): ${ans.ticketCountHome}`);
    console.log(`車次代號(回程): ${ans.trainNoHome}`);
    console.log(`旅行日期(回程): ${ans.travelDateHome}`);
  }
  console.log('====================================');

  await writeFile(
    '.env',
    `
    ### 基本資訊 ##
    ID=${ans.ID}
    FROM_STATION=${ans.fromStation}
    TO_STATION=${ans.toStation}

    ## 去程 ##
    TRAIN_NO=${ans.trainNo}
    TICKET_COUNT=${ans.ticketCount}
    TRAVEL_DATE=${ans.travelDate}

    ## 回程 ##
    TRAIN_NO_HOME=${ans.trainNoHome || ''}
    TICKET_COUNT_HOME=${ans.ticketCountHome || ''}
    TRAVEL_DATE_HOME=${ans.travelDateHome || ''}
    `
  );
  await exec('npm run build');
})();
