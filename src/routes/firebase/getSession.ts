import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../conf/config.firebase';
import { firebaseRouter } from './index';

firebaseRouter.post('/getSession', async (ctx) => {
	try {
		const { uid } = JSON.parse(ctx.request.body);
		const userDatabase = await getSessionDatabase(uid);
		ctx.session.db = userDatabase;
		ctx.body = ctx.session.db;
	} catch (err) {
		ctx.throw(`Firebase error: ${err}`);
	}
});

export const getSessionDatabase = async (uid) => {
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
