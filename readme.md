# 台鐵自動化訂票系統

This is the automation cli tool to book the Taiwan railway system. Use `iTerm2` terminal software will have the best UX.

## Installation

You need to have `NodeJS` v7.6+ installed. Follow the steps below:

```sh
npm install
```

## Uage

開始之前，必須先拷貝 `.env.example` 檔案到 `.env`(自行創建) 並修改成自己的訂票資料。完成後方可進行自動化購票程序。

```sh
npm run start
```

Just follow the steps in the command line.

## 注意

更改過 `.env` 檔後必須重新至少跑一次 `restart` 後才能再跑 `start`:

```sh
npm run restart # 改過檔案後必須執行一次
```

## RoeadMap

- [ ] 取消訂票
- [ ] cli 設定 credentials
- [ ] 自動判別驗證碼
- [ ] 開多視窗同時訂票
