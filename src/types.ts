import inquirer from 'inquirer';
import puppeteer from 'puppeteer';

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

export interface IStep1Elements {
  [key: string]: puppeteer.ElementHandle | null;
}
