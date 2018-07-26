import * as inquirer from 'inquirer';
export enum TicketOrderMode {
  ONE_WAY = 'http://railway.hinet.net/Foreign/TW/etno1.html',
  ROUND_TRIP = 'http://railway.hinet.net/Foreign/TW/etkind_roundtrip.html'
}

export interface ICredentials {
  ID?: string;
  FROM_STATION?: string;
  TO_STATION?: string;
  TRAIN_NO?: string;
  TICKET_COUNT?: string;
  TRAVEL_DATE?: string;
  TRAVEL_DATE_HOME?: string;
}

export const CREDENTIALS: ICredentials = {
  ID: process.env.ID,
  FROM_STATION: process.env.FROM_STATION,
  TO_STATION: process.env.TO_STATION,
  TRAIN_NO: process.env.TRAIN_NO,
  TICKET_COUNT: process.env.TICKET_COUNT,
  TRAVEL_DATE: process.env.TRAVEL_DATE,
  TRAVEL_DATE_HOME: process.env.TRAVEL_DATE_HOME
};

export interface IQuestions {
  selectOrderMode: inquirer.Question;
}

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
  }
};
