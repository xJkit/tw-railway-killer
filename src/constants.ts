import inquirer from 'inquirer';
export enum TicketOrderMode {
  ONE_WAY = 'http://railway.hinet.net/Foreign/TW/etno1.html',
  ROUND_TRIP = 'http://railway.hinet.net/Foreign/TW/etno_roundtrip.html'
}

export type STATION_CODE_TYPE = {
  [key: string]: string;
};

export interface IQuestions {
  [key: string]: inquirer.Question;
}

export interface ICredentials {
  ID: string;
  FROM_STATION: string;
  TO_STATION: string;
  TRAIN_NO: string;
  TICKET_COUNT: string;
  TRAVEL_DATE: string;
  TRAIN_NO_HOME: string;
  TICKET_COUNT_HOME: string;
  TRAVEL_DATE_HOME: string;
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
  }
};

export const STATION_TO_CODE: STATION_CODE_TYPE = {
  台東: '004',
  汐止: '096',
  南港: '097',
  松山: '098',
  台北: '100',
  板橋: '102',
  台南: '175'
};
