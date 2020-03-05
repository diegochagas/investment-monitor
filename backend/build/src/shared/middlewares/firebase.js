"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var admin = __importStar(require("firebase-admin"));
var fs = __importStar(require("fs"));
var winston_1 = __importDefault(require("./winston"));
var privateKey;
if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'dev') {
    privateKey = '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC9/GSm2uzaDpxa\n7rekCnNeyTvmqsGuYhsUdxN2C/YWOEbkL1TRgbH4b13jEgM52Qd/zqGu9qxe+Irk\nEubyENb8v0NO15XzLBacTLuq5CvrWRqK9VUEDastiDrSBUivcfzpYaZI4Gh0iE9T\nvgp7FMYWwLgaOdEhf8YjM3gC0oKzNj7/vTWGBBrFuCCL9Tx3vcKBmr0mUYCoq6Bs\nk3iw8KgBqKZUOgAGimOLcyLPvV5X0WpDr9MPODTuSt+UEzy/EcK4nbc0yqx6Lzqg\nydwE11XtrgfsMpttWYYI6fN1BoXhUbLhiVfGMJ/M2gzvWD6UkQ8q/miJnoazA0G1\nAQ+wuLxtAgMBAAECggEAA2T4iWeBhI3ctALuS77Ne+TY935N9ycnJf6sFI5bubpV\n0n0q29uykviuadLV7BAG+TPStCLIj8YdeSndlFKdanA0rCgpNHyM0Ew8Gm5UNkUK\npG9fjmmgZIuC6z5qyBzWVS3/P8sVfh3ONr8IawxnnMji2AtlsTnjRphyLUNNvhTu\nWWsviYhYTvO7PQ9MJ0xKtf88+ptchtrWMm2SPDgFT1i5eekDa8jeFWYBMGn3ddQA\nAZPJx9GOmoSsFIwv7uhA79onGrKIjU4EkUZ/f25qQOC6aQouFV1xzYvbSn6qAoiG\n2QvfzY3gzVSoKm/NS79ykdoZGRNTO6jeT7+MgEksAwKBgQDtNi+HTufSdo6++eHW\nXR86e4u0T7yBtJUJYR+txFFzqKpe9ImcedC8giXNvPTZASBmKpX16bNfYQ2sONf8\nCiObcuJ/lqckjBJrFLYI9u0gu+GTO/XgJJp8DsAUCNxDJ6BMOSFpteBP6qrGntFp\nqiyifq+dvj+hZHnt3ZFR9EDMFwKBgQDNCKLZtMU1dS3ORnwDcyUkl91hKtYWULE2\nZjgCMJtPSKKmLs/Yk5SHotLNZmwJY51sIiQbqr8xtBBMJ2+ObLXX6vb1p8517bT1\nTljWDXMnl082KgaMAN+T/0Q40+oveVhl1G1Nvt2gDzc9ZInTd87n6jSxRT4QpUty\nKKQkZ0o6GwKBgQDl0wHpjsF8X/Gdhm0QS9jdyKVqZXa2FEfxdnBC41onPNsUdMh/\nGmbqvQ3zb4eqWDUTx17Ti0GGv3mHyus3/nrROVXJWCVIe428waw8s0C73kyHYiiu\nqcgjOgdPYeZGCjZ8oz2ENfrGcw5Ssb0jKwVjympL4u+zZq3bkDgjtwqwsQKBgQCR\nzS5hOldy6F0mbqEJovwqxYO78UZEoCUk1hPGGuKWwsRHAMr07B2XRoY5Yjg5hQkR\nOEYNFqLXqYBdZz3BPjUh0gjEMAx1eBBS0OADd5UH9mVx0vjM3mIfUEsnTisej1/5\nKdKAktXvWGKj2bbZFj2gVcAav26fT6wTBiuTZ5A1OQKBgGFkCkmIyR/J8A/cNV0V\nIuE6pAQcDICeUAXfJ9LtMYpWDGRWdJDvSvYSh+DfXdqOrHPRD4g3i26M8veM1jkk\ndq/PIkSGRew1TLn7XO4hyV2Io1c33ydKW4+dFWJQWocYIS51+anQzIkIJNpiKXuJ\n3YQ5cJCwpGwHW8k7uSPMF3mh\n-----END PRIVATE KEY-----\n';
}
else {
    privateKey = fs.readFileSync('./firebase.pem').toString();
}
var serviceAccount = {
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: privateKey,
    projectId: process.env.FIREBASE_PROJECT_ID,
};
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});
winston_1.default.info('Firebase Admin Initialized');
module.exports = admin;
//# sourceMappingURL=firebase.js.map