import inquirer from 'inquirer';
import puppeteer from 'puppeteer';
import terminalImage from 'terminal-image';
import { CREDENTIALS, STATION_TO_CODE, QUESTIONS } from './constants';

export interface IStep1Elements {
  [key: string]: puppeteer.ElementHandle | null;
}

export default class Passenger {
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
    console.log(`旅行日期: ${CREDENTIALS.TRAVEL_DATE}`);
    console.log('------ 回程資訊 -----');
    console.log(`張數(回程): ${CREDENTIALS.TICKET_COUNT_HOME}`);
    console.log(`車次代號(回程): ${CREDENTIALS.TRAIN_NO_HOME}`);
    console.log(`旅行日期(回程): ${CREDENTIALS.TRAVEL_DATE_HOME}`);
    console.log('====================================');
  }

  public async getOptionDateList(selectElmt: puppeteer.ElementHandle) {
    const options = await selectElmt.$$('option');
    const values = options.map(async option => {
      const optionValue = await option.getProperty('value');
      return await optionValue.jsonValue();
    });
    return await Promise.all(values);
  }

  public async getCaptchaImgBuffer(page: puppeteer.Page) {
    const img = await page.$('#idRandomPic');
    return img && img.screenshot();
  }

  public async getStep1Elmts(page: puppeteer.Page): Promise<IStep1Elements> {
    return {
      /** 基本資料 */
      idInput: await page.$('#person_id'), // 身分證字號 Input
      fromStationSelect: await page.$('#from_station'), // 起站代碼 Select
      toStationSelect: await page.$('#to_station'), // 到站代碼 Select

      /** 去程/單程 */
      getInDateSelect: await page.$('#getin_date'), // 去程日期
      trainNumberInput: await page.$('#train_no'), // 去程車次代碼
      orderNumberSelect: await page.$('#order_qty_str'), // 去程訂票張數

      /** 回程 */
      getInDate2Select: await page.$('#getin_date2'), // 回程日期
      trainNumber2Input: await page.$('#train_no2'), // 回程車次代碼
      orderNumber2Select: await page.$('#order_qty_str2'), // 回程訂票張數

      // ====
      submitBtn: await page.$('.btn.btn-primary') // 開始訂票按鈕
    };
  }

  public async getStep2Elmts(page: puppeteer.Page) {
    return {
      captchaInput: await page.$('#randInput'), // 驗證碼 Input
      submitBtn: await page.$('#sbutton') // 送出按鈕
    };
  }

  public async run() {
    this.validateCredentials();

    const browser = await puppeteer.launch({ headless: true });
    browser.on('targetcreated', () => console.log('準備瀏覽...'));

    const page = await browser.newPage();
    console.log(`----前往 ---> ${this.target}------------------`);
    await page.goto(this.target);

    console.log('--- step 1 ---');
    const ele = await this.getStep1Elmts(page);
    const fromStationCode = STATION_TO_CODE[CREDENTIALS.FROM_STATION];
    const toStationCode = STATION_TO_CODE[CREDENTIALS.TO_STATION];

    // TODO: Add all credentials into this and validate all at once.
    if (!fromStationCode || !toStationCode) {
      throw new Error(
        '沒有對應的站牌，詳情請參考：http://railway.hinet.net/station_code.htm 然後再試一次。'
      );
    }

    /** 基本資料 */
    ele.idInput && (await ele.idInput.type(CREDENTIALS.ID));
    ele.fromStationSelect &&
      (await ele.fromStationSelect.type(fromStationCode));
    ele.toStationSelect && (await ele.toStationSelect.type(toStationCode));

    /** 去程: 乘車日期、車次代碼、訂票張數 */
    if (ele.getInDateSelect && ele.trainNumberInput && ele.orderNumberSelect) {
      const dateList = await this.getOptionDateList(ele.getInDateSelect);
      const readableList = dateList.map(date => date.slice(0, 10));
      const dateIndex = readableList.indexOf(CREDENTIALS.TRAVEL_DATE);
      if (dateIndex === -1) {
        console.log(readableList);
        await browser.close();
        throw new Error('去程沒有可選的日期，請重新調整上述日期。');
      }
      console.log('=====【去程】=====');
      console.log(`選擇出發時間： ${CREDENTIALS.TRAVEL_DATE}`);
      await ele.getInDateSelect.type(dateList[dateIndex]);

      console.log(`輸入車次代碼：${CREDENTIALS.TRAIN_NO}`);
      await ele.trainNumberInput.type(CREDENTIALS.TRAIN_NO);

      console.log(`選擇訂票張數：${CREDENTIALS.TICKET_COUNT}`);
      await ele.orderNumberSelect.type(CREDENTIALS.TICKET_COUNT);
      console.log('==================');
    }

    /** 回程: 乘車日期、車次代碼、訂票張數 */
    if (
      ele.getInDate2Select &&
      ele.trainNumber2Input &&
      ele.orderNumber2Select
    ) {
      const dateList = await this.getOptionDateList(ele.getInDate2Select);
      const readableList = dateList.map(date => date.slice(0, 10));
      const dateIndex = readableList.indexOf(CREDENTIALS.TRAVEL_DATE_HOME);
      if (dateIndex === -1) {
        console.log(readableList);
        await browser.close();
        throw new Error(`回程沒有可選的日期，請重新調整上述日期。`);
      }
      console.log('=====【回程】=====');
      console.log(`選擇回程時間： ${CREDENTIALS.TRAVEL_DATE_HOME}`);
      await ele.getInDate2Select.type(dateList[dateIndex]);

      console.log(`輸入車次代碼：${CREDENTIALS.TRAIN_NO_HOME}`);
      await ele.trainNumber2Input.type(CREDENTIALS.TRAIN_NO_HOME);

      console.log(`選擇訂票張數：${CREDENTIALS.TICKET_COUNT_HOME}`);
      await ele.orderNumber2Select.type(CREDENTIALS.TICKET_COUNT_HOME);
      console.log('==================');
    }

    /** 提交資料 */
    ele.submitBtn && (await ele.submitBtn.click());

    console.log('--- 等待頁面跳轉 ---');
    await page.waitForNavigation({ waitUntil: 'load' });

    console.log('---step 2: Captcha---');
    const ele2 = await this.getStep2Elmts(page);
    const imgBuf = await this.getCaptchaImgBuffer(page);
    console.log(await terminalImage.buffer(imgBuf));
    const { captchaCode }: inquirer.Answers = await inquirer.prompt([
      QUESTIONS.captchaCode
    ]);

    ele2.captchaInput && (await ele2.captchaInput.type(captchaCode));
    ele2.submitBtn && (await ele2.submitBtn.click());

    console.log('--- 等待頁面跳轉 ---');
    await page.waitForNavigation({ waitUntil: 'load' });

    /** close the browser */
    const resultImgBuffer = await page.screenshot();
    console.log(await terminalImage.buffer(resultImgBuffer));

    const successOrderCode = await page.$('#spanOrderCode');
    if (successOrderCode) {
      await page.screenshot({ path: 'success.png' });
    }
    await browser.close();

    console.log('------ session closed -------');
  }
}
