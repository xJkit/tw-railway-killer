import _range from 'lodash.range';
import { ICredentials, IQuestions, STATION_CODE_TYPE } from './types';

export enum TicketOrderMode {
  ONE_WAY = 'http://railway.hinet.net/Foreign/TW/etno1.html',
  ROUND_TRIP = 'http://railway.hinet.net/Foreign/TW/etno_roundtrip.html'
}

export const CREDENTIALS: ICredentials = {
  ID: process.env.ID || '',
  FROM_STATION: process.env.FROM_STATION || '',
  TO_STATION: process.env.TO_STATION || '',
  TRAIN_NO: process.env.TRAIN_NO || '',
  TICKET_COUNT: process.env.TICKET_COUNT || '',
  TRAVEL_DATE: process.env.TRAVEL_DATE || '',
  TRAIN_NO_HOME: process.env.TRAIN_NO_HOME || '',
  TICKET_COUNT_HOME: process.env.TICKET_COUNT_HOME || '',
  TRAVEL_DATE_HOME: process.env.TRAVEL_DATE_HOME || ''
};

export const QUESTIONS: IQuestions = {
  selectOrderMode: {
    type: 'list',
    name: 'target',
    message: '你要使用哪種方式訂票？',
    choices: [
      {
        name: '車次訂單程票',
        value: TicketOrderMode.ONE_WAY
      },
      {
        name: '車次訂去回票',
        value: TicketOrderMode.ROUND_TRIP
      }
    ]
  },
  captchaCode: {
    type: 'input',
    name: 'captchaCode',
    message: '請輸入驗證碼：'
  },
  ID: {
    type: 'input',
    name: 'ID',
    message: '請輸入身分證字號：',
    default: '未輸入'
  },
  fromStation: {
    type: 'input',
    name: 'fromStation',
    message: '請輸入起站站名（中文）：',
    default: '未輸入'
  },
  toStation: {
    type: 'input',
    name: 'toStation',
    message: '請輸入迄站站名（中文）：',
    default: '未輸入'
  },
  trainNo: {
    type: 'input',
    name: 'trainNo',
    message: '請輸入去程車次代號：',
    default: '未輸入'
  },
  ticketCount: {
    type: 'list',
    name: 'ticketCount',
    message: '請選擇張數：',
    default: 1,
    choices: _range(1, 7).map(value => ({ name: `${value} 張`, value }))
  },
  ticketCountHome: {
    type: 'list',
    name: 'ticketCountHome',
    message: '請選擇張數(回程)：',
    default: 1,
    choices: _range(1, 7).map(value => ({ name: `${value} 張`, value }))
  },
  travelDate: {
    type: 'input',
    name: 'travelDate',
    message: '請輸入去程日期(yyyy/mm/dd)：',
    default: '未輸入'
  },
  travelDateHome: {
    type: 'input',
    name: 'travelDateHome',
    message: '請輸入回程日期(yyyy/mm/dd)：',
    default: '未輸入'
  },
  trainNoHome: {
    type: 'input',
    name: 'trainNoHome',
    message: '請輸入回程車次代號：',
    default: '未輸入'
  }
};

// TODO: Add more station codes
export const STATION_TO_CODE: STATION_CODE_TYPE = {
  台東: '004',
  汐止: '096',
  南港: '097',
  松山: '098',
  台北: '100',
  板橋: '102',
  台南: '175'
};
