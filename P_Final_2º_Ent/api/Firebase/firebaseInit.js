import admin from 'firebase-admin'
import serviceAccount from './firebaseSDK/ecommerce-f9af1-firebase-adminsdk-y5slf-dd2c166874.js'

			admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			});
			const db = admin.firestore();
			console.log('Base de datos Firebase conectada');

export default db;

