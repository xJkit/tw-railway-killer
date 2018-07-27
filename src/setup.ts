import inquirer from 'inquirer';
import writeFile from 'write';
import { exec } from 'child_process';
import { QUESTIONS, TicketOrderMode } from './constants';

const sanitizeString = (
  dirtyString: TemplateStringsArray,
  ...values: any[]
) => {
  return dirtyString
    .map(str => str.trim())
    .filter(Boolean)
    .map((str, idx) => str + values[idx] + '\n')
    .reduce((accu, currStr) => accu + currStr);
};

(async () => {
  console.log('=====開始初始化設定程序，請先填入基本資料======');
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

  const {
    ID = 'A123456789',
    fromStation = '未輸入',
    toStation = '未輸入',
    ticketCount = 1,
    trainNo = '406',
    travelDate = '未輸入',
    ticketCountHome = 1,
    trainNoHome = '406',
    travelDateHome = '未輸入'
  } = ans;

  console.log('====你設定的資訊如下==================');
  console.log(`身分證號: ${ID}`);
  console.log(`起站: ${fromStation}`);
  console.log(`迄站: ${toStation}`);
  console.log(`張數: ${ticketCount}`);
  console.log(`車次代號: ${trainNo}`);
  console.log(`旅行日期: ${travelDate}`);
  if (isRoundTrip) {
    console.log('------ 回程資訊 -----');
    console.log(`張數(回程): ${ticketCountHome}`);
    console.log(`車次代號(回程): ${trainNoHome}`);
    console.log(`旅行日期(回程): ${travelDateHome}`);
  }
  console.log('====================================');

  await writeFile(
    '.env',
    sanitizeString`
    ID=${ID}
    FROM_STATION=${fromStation}
    TO_STATION=${toStation}
    TRAIN_NO=${trainNo}
    TICKET_COUNT=${ticketCount}
    TRAVEL_DATE=${travelDate}
    TRAIN_NO_HOME=${trainNoHome}
    TICKET_COUNT_HOME=${ticketCountHome}
    TRAVEL_DATE_HOME=${travelDateHome}
    `
  );

  console.log('\n');
  console.log('重新產生設定檔...............');
  await exec('npm run build');
})();
