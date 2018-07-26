import { CREDENTIALS } from './constants';

export default class Train {
  readonly target: string;
  constructor(target: string) {
    this.target = target;
  }

  public validateCredentials() {
    console.log('======乘客詳細資料===================');
    console.log(`身分證號: ${CREDENTIALS.ID}`);
    console.log(`起站: ${CREDENTIALS.FROM_STATION}`);
    console.log(`迄站: ${CREDENTIALS.TO_STATION}`);
    console.log(`張數: ${CREDENTIALS.TICKET_COUNT}`);
    console.log(`車次代號: ${CREDENTIALS.TRAIN_NO}`);
    console.log(`旅行日期(去程): ${CREDENTIALS.TRAVEL_DATE}`);
    console.log(`旅行日期(回程): ${CREDENTIALS.TRAVEL_DATE_HOME}`);
    console.log('====================================');
  }

  public run() {
    console.log(`----開始前往 ---> ${this.target}------------------`);
    this.validateCredentials();
  }
}
