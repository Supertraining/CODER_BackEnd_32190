var admin = require('firebase-admin');
let serviceAccount = require('../../firebaseSDK/ecommerce-f9af1-firebase-adminsdk-y5slf-dd2c166874.json');
			admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			});
			const db = admin.firestore();
			console.log('Base de datos Firebase conectada');

module.exports = db;