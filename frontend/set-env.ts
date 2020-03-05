const fs = require('fs');

const targetPath = './src/environments/environment.prod.ts';

const colors = require('colors');

require('dotenv').config();

const envConfigFile = `export const environment = {
  production: true,
  apiRest: '${process.env.API_REST}',
  socket: '${process.env.SOCKET}',
  projects: {
    botGarch: "/bot-garch",
    botTelegram: "/bot-telegram",
    generalSystem: "/general-system",
    marketMaker: "/market-maker",
    botCoins: "/bot-coins",
    socketsIo: "/"
  },
  firebase: {
    apiKey: "${process.env.FIREBASE_APIKEY}",
    authDomain: "${process.env.FIREBASE_AUTHDOMAIN}",
    databaseURL: "${process.env.FIREBASE_DATABASEURL}",
    projectId: "${process.env.FIREBASE_PROJECTID}",
    storageBucket: "${process.env.FIREBASE_STORAGEBUCKET}",
    messagingSenderId: "${process.env.FIREBASE_MESSAGINGSENDERID}",
    appId: "${process.env.FIREBASE_APPID}"
  }
};`;

console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));

console.log(colors.grey(envConfigFile) + '\n');

fs.writeFile(targetPath, envConfigFile, (err) => {
  console.log((err) ? err : colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
});
