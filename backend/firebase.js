const admin = require('firebase-admin');

const serviceAccount = {
    clientEmail: 'firebase-adminsdk-dgn0x@bitfolio-backoffice.iam.gserviceaccount.com',
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC9/GSm2uzaDpxa\n7rekCnNeyTvmqsGuYhsUdxN2C/YWOEbkL1TRgbH4b13jEgM52Qd/zqGu9qxe+Irk\nEubyENb8v0NO15XzLBacTLuq5CvrWRqK9VUEDastiDrSBUivcfzpYaZI4Gh0iE9T\nvgp7FMYWwLgaOdEhf8YjM3gC0oKzNj7/vTWGBBrFuCCL9Tx3vcKBmr0mUYCoq6Bs\nk3iw8KgBqKZUOgAGimOLcyLPvV5X0WpDr9MPODTuSt+UEzy/EcK4nbc0yqx6Lzqg\nydwE11XtrgfsMpttWYYI6fN1BoXhUbLhiVfGMJ/M2gzvWD6UkQ8q/miJnoazA0G1\nAQ+wuLxtAgMBAAECggEAA2T4iWeBhI3ctALuS77Ne+TY935N9ycnJf6sFI5bubpV\n0n0q29uykviuadLV7BAG+TPStCLIj8YdeSndlFKdanA0rCgpNHyM0Ew8Gm5UNkUK\npG9fjmmgZIuC6z5qyBzWVS3/P8sVfh3ONr8IawxnnMji2AtlsTnjRphyLUNNvhTu\nWWsviYhYTvO7PQ9MJ0xKtf88+ptchtrWMm2SPDgFT1i5eekDa8jeFWYBMGn3ddQA\nAZPJx9GOmoSsFIwv7uhA79onGrKIjU4EkUZ/f25qQOC6aQouFV1xzYvbSn6qAoiG\n2QvfzY3gzVSoKm/NS79ykdoZGRNTO6jeT7+MgEksAwKBgQDtNi+HTufSdo6++eHW\nXR86e4u0T7yBtJUJYR+txFFzqKpe9ImcedC8giXNvPTZASBmKpX16bNfYQ2sONf8\nCiObcuJ/lqckjBJrFLYI9u0gu+GTO/XgJJp8DsAUCNxDJ6BMOSFpteBP6qrGntFp\nqiyifq+dvj+hZHnt3ZFR9EDMFwKBgQDNCKLZtMU1dS3ORnwDcyUkl91hKtYWULE2\nZjgCMJtPSKKmLs/Yk5SHotLNZmwJY51sIiQbqr8xtBBMJ2+ObLXX6vb1p8517bT1\nTljWDXMnl082KgaMAN+T/0Q40+oveVhl1G1Nvt2gDzc9ZInTd87n6jSxRT4QpUty\nKKQkZ0o6GwKBgQDl0wHpjsF8X/Gdhm0QS9jdyKVqZXa2FEfxdnBC41onPNsUdMh/\nGmbqvQ3zb4eqWDUTx17Ti0GGv3mHyus3/nrROVXJWCVIe428waw8s0C73kyHYiiu\nqcgjOgdPYeZGCjZ8oz2ENfrGcw5Ssb0jKwVjympL4u+zZq3bkDgjtwqwsQKBgQCR\nzS5hOldy6F0mbqEJovwqxYO78UZEoCUk1hPGGuKWwsRHAMr07B2XRoY5Yjg5hQkR\nOEYNFqLXqYBdZz3BPjUh0gjEMAx1eBBS0OADd5UH9mVx0vjM3mIfUEsnTisej1/5\nKdKAktXvWGKj2bbZFj2gVcAav26fT6wTBiuTZ5A1OQKBgGFkCkmIyR/J8A/cNV0V\nIuE6pAQcDICeUAXfJ9LtMYpWDGRWdJDvSvYSh+DfXdqOrHPRD4g3i26M8veM1jkk\ndq/PIkSGRew1TLn7XO4hyV2Io1c33ydKW4+dFWJQWocYIS51+anQzIkIJNpiKXuJ\n3YQ5cJCwpGwHW8k7uSPMF3mh\n-----END PRIVATE KEY-----\n",
    projectId: 'bitfolio-backoffice',
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://bitfolio-backoffice.firebaseio.com'
});

async function main() {

    const tokenwithmail = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwZTQxMjczMzMwYTg2ZmRjMjhlMjgzMDVhNDRkYzlhODgzZTI2YTciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiV3l2aXNzb24gV2Fsa2VyIFNhbnRvcyBTb3VzYSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vLUZ3VXplTHg3N29RL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FDSGkzcmVuRHRmRGJmWXZEWEwxeFgxd0t0cU1qdFlNSlEvcGhvdG8uanBnIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2JpdGZvbGlvLWJhY2tvZmZpY2UiLCJhdWQiOiJiaXRmb2xpby1iYWNrb2ZmaWNlIiwiYXV0aF90aW1lIjoxNTYyODYyNDAzLCJ1c2VyX2lkIjoiZzg1RzlMc3FKa1dTYjhmSWJ1RFhBN0ZvTlRCMyIsInN1YiI6Imc4NUc5THNxSmtXU2I4ZklidURYQTdGb05UQjMiLCJpYXQiOjE1NjI4NjI0MDMsImV4cCI6MTU2Mjg2NjAwMywiZW1haWwiOiJ3YWxrZXIuc291c2FAYXRsYXNwcm9qLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAwNzAxOTA0NjMwMzM5NzE4MjkyIl0sImVtYWlsIjpbIndhbGtlci5zb3VzYUBhdGxhc3Byb2ouY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.rXxAwS6_WCGOhOgV_ahOnB7sj40tV-J9zePEZJPvYyGrK5J2LsOWhziwvIrsMNGwEWCJpy14sRjb_aY2ByOts14_kE5OBNmIDKAUVjid9YDTYzyRyaOpJ3-4kzQ-zhJmgaEV9C5TvoIzbUfiFY4ZuiSEZNjuExM8DIQVX8tYvxNq1z4IK6TLzab1iWdPSP6beycoCN4UMKN5KqdeIPBlbkvS1TebCgvH_j3VtiK1yB9hOqcpvHneogws9bKeDd2u-i4F6svpXllvE2ZKt1P-isb1zMNAYNQYWAB_NoCPOMGKJ-LQZ8-QbnAeJZ0bGESmbcBueIAjB2KPT-sYyCxGFA';
    const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc0MWRlNGY0NTMzNzg5YmRiMjUxYjdhNTgwNTZjNTZmY2VkMjE0MWIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiVml0b3IgRGVsZmlubyIsInBpY3R1cmUiOiJodHRwczovL2xoNS5nb29nbGV1c2VyY29udGVudC5jb20vLWZURWNDenU4R0NFL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FDSGkzcmVJUFpjRXlUUUI2VG1VdC1fTFhLd0doQkUzZXcvbW8vcGhvdG8uanBnIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2JpdGZvbGlvLWJhY2tvZmZpY2UiLCJhdWQiOiJiaXRmb2xpby1iYWNrb2ZmaWNlIiwiYXV0aF90aW1lIjoxNTYyODYyMjgzLCJ1c2VyX2lkIjoiOXRoejRYOXlsR01nejVHMmxOSk55U1ZtanJKMiIsInN1YiI6Ijl0aHo0WDl5bEdNZ3o1RzJsTkpOeVNWbWpySjIiLCJpYXQiOjE1NjI4NjIyODMsImV4cCI6MTU2Mjg2NTg4MywiZW1haWwiOiJ2aXRvci5kZWxmaW5vQGF0bGFzcHJvai5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwNzQ1MjIyNjM0ODc0MjkyMDI5NCJdLCJlbWFpbCI6WyJ2aXRvci5kZWxmaW5vQGF0bGFzcHJvai5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.IISpjm0lZ4f4yQ278rU2X6JFcZNRaK5ihgB5s2HocZj8AWgD9U4FJ0NoPlCcohZIf39r0rTt1ZUxS95v6r6AZqIyDorrS2GDcSgXrGMh6gi-_T7KwmhRIlawQN8DK0Lv330Gue5eOh4HksyAC8njmYTrTvMUE7xt6T9riaEusaNx6Pz4EA2IJ27F4z7opV3bmom6PUbkyfdx631j6PH_OjraUvbZ4H6-aBXMzFplxpqJq6YWX1sGKDHvPncURy4QIWfZd5me9KvNNFVrclvymYurMPqkxmOKbrJYmN3ViqwNyR85HtqibrG9SVarncvWuN0oFjZHewMGxvDrkGfA2g';
    try {
        const decoded = await admin.auth().verifyIdToken(tokenwithmail);
        console.log('decoded', decoded);
    }catch(e) {
        console.log('error', e)
    }

}

main()
