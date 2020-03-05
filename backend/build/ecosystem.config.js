"use strict";
module.exports = {
    apps: [{
            name: 'inv-backoffice',
            script: './build/src/index.js',
            args: '',
            watch: false,
            env: {
                "COINAPI_CREDENTIAL": "F4A5A1B8-4C56-4D1D-9FC0-0C7ECEAF68F3",
                "COINAPI_URI": "https://rest.coinapi.io/",
                "KAFKA_HOST": "b-2.3q10fmg1j5vr8trrsifkuvsu3.c3.kafka.us-west-2.amazonaws.com:9092,b-3.3q10fmg1j5vr8trrsifkuvsu3.c3.kafka.us-west-2.amazonaws.com:9092,b-1.3q10fmg1j5vr8trrsifkuvsu3.c3.kafka.us-west-2.amazonaws.com:9092",
                "PM2_SECRET_KEY": "gco1n7zviu12isd",
                "PM2_PUBLIC_KEY": "f0l2y1b2kx43oid",
                "AWS_BUCKET_LOG": "investment-backoffice-log",
                "AWS_SECRET_ACCESS_KEY": "w/XdeaG5K65wVslY/uEL7jVkPGXSlNllniUwZUc3",
                "AWS_ACCESS_KEY_ID": "AKIAJZID3KFRCXXCAQ4Q",
                "DB_NAME_ARBITROR": "arbitror",
                "DB_NAME_MONITOR": "monitor",
                "DB_NAME_TOPIC_PERSISTENT": "topic_persistent",
                "DB_NAME_COMMON": "common",
                "DB_NAME_STRATEGY": "strategy",
                "DB_NAME_SUBSCRIBER": "subscriber",
                "DB_NAME_BOT_TELEGRAM": "bot_telegram",
                "DB_NAME_MARKET_MAKER": "market_maker",
                "DB_URI": "mongodb://investimento:jakd239031j32181gd@investimento-dev.cluster-cjfwfzs1ulzp.us-west-2.docdb.amazonaws.com:27017/",
                "FIREBASE_DATABASE_URL": "https://bitfolio-backoffice.firebaseio.com",
                "FIREBASE_CLIENT": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-dgn0x%40bitfolio-backoffice.iam.gserviceaccount.com",
                "FIREBASE_AUTH_PROVIDER": "https://www.googleapis.com/oauth2/v1/certs",
                "FIREBASE_TOKEN_URI": "https://oauth2.googleapis.com/token",
                "FIREBASE_AUTH_URI": "https://accounts.google.com/o/oauth2/auth",
                "FIREBASE_CLIENT_ID": "113901117029385308570",
                "FIREBASE_PRIVATE_KEY_ID": "0346f185dbef1c89c7288dc06079b2ebd428927e",
                "FIREBASE_CLIENT_EMAIL": "firebase-adminsdk-dgn0x@bitfolio-backoffice.iam.gserviceaccount.com",
                "FIREBASE_PROJECT_ID": "bitfolio-backoffice",
                "PORT": 3000,
                "NODE_ENV": "dev",
                "BASE_URL": "investimento-develop-2270a39714590240.elb.us-west-2.amazonaws.com:8090"
            },
            env_production: {
                NODE_ENV: 'production'
            }
        }],
};
//# sourceMappingURL=ecosystem.config.js.map