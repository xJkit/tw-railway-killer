export enum TicketOrderMode {
  ONE_WAY = 'http://railway.hinet.net/Foreign/TW/etno1.html',
  ROUND_TRIP = 'http://railway.hinet.net/Foreign/TW/etkind_roundtrip.html',
};

export interface ICredentials {
  ID: string,
  FROM_STATION: string,
  TO_STATION: string,
  TRAIN_NO: string,
  TICKET_NUMBER: string,
  TRAVEL_DATE: string,
}

export const CREDENTIALS: ICredentials = {
  ID: process.env.ID || '',
  FROM_STATION: process.env.FROM_STATION || '',
  TO_STATION: process.env.TO_STATION || '',
  TRAIN_NO: process.env.TRAIN_NO || '',
  TICKET_NUMBER: process.env.TICKET_NUMBER || '',
  TRAVEL_DATE: process.env.TRAVEL_DATE || '',
}
