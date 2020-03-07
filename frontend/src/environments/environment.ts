export const environment = {
  production: false,
  apiRest: 'https://hslg8wpdk6.execute-api.us-west-2.amazonaws.com/backoffice',
  socket: 'http://investimento-develop-2270a39714590240.elb.us-west-2.amazonaws.com:8090',
  projects: {
    botGarch: "/bot-garch",
    botTelegram: "/bot-telegram",
    generalSystem: "/general-system",
    marketMaker: "/market-maker",
    botCoins: "/bot-coins",
    socketsIo: "/"
  },
  firebase: {
    apiKey: "AIzaSyDmLFGQhYI1tHlQjpK6oFtGXjRiCe_BB40",
    authDomain: "bitfolio-backoffice.firebaseapp.com",
    databaseURL: "https://bitfolio-backoffice.firebaseio.com",
    projectId: "bitfolio-backoffice",
    storageBucket: "bitfolio-backoffice.appspot.com",
    messagingSenderId: "241230472625",
    appId: "1:241230472625:web:47088391ccb455d4"
  }
};
