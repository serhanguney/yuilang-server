import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../conf/config.firebase';
import { firebaseRouter } from './index';

firebaseRouter.post('/getDatabase', async (ctx) => {
	try {
		const { uid } = JSON.parse(ctx.request.body);
		ctx.body= await getDatabase(uid);
	} catch (err) {
		ctx.throw(`Firebase error: ${err}`);
	}
});

export const getDatabase = async (uid) => {
	try {
		const response = await getDocs(collection(db, uid));
		let userDatabase;
		response.forEach((doc) => {
			const savedDocument = doc.data();
			userDatabase = {
				...userDatabase,
				...savedDocument
			};
		});
		return userDatabase;
	} catch (err) {
		throw new Error(`There was an error with Firebase: ${err}`);
	}
};
