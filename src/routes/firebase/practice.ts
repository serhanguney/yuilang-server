import { firebaseRouter } from './index';
import { doc, updateDoc, increment, getDoc } from 'firebase/firestore';
import { db } from '../../conf/config.firebase';
import { BAD_REQUEST } from '../../utils/statusCodes';

firebaseRouter.post('/practice', async (ctx) => {
	const { uid, category, language, phraseID } = JSON.parse(ctx.request.body);
	if (!uid || !category || !language || !phraseID) {
		ctx.throw({ status: BAD_REQUEST, message: 'you provided missing information!' });
		return;
	}
	try {
		const categoryDirectory = `categories.${category}.practiceCount`;
		const phraseDirectory = `categories.${category}.phrases.${phraseID}.practiceCount`;

		const docRef = doc(db, uid, language);
		const response = await updateDoc(docRef, {
			practiceCount: increment(1),
			[categoryDirectory]: increment(1),
			[phraseDirectory]: increment(1)
		});
		ctx.body = response;
	} catch (err) {
		ctx.throw(`there was a problem: ${err}`);
	}
});

firebaseRouter.get('/demo', async (ctx) => {
	// PHynaT3xo6g3fenpK2LLkQKQTaj1

	// GETS A SUBCOLLECTION
	// const docRef = await getDocs(collection(db, 'PHynaT3xo6g3fenpK2LLkQKQTaj1', 'cs', 'reading'));
	// let obj;
	// docRef.forEach((doc) => {
	// 	const result = doc.data();
	// 	obj = {
	// 		...obj,
	// 		id: doc.id,
	// 		...result
	// 	};
	// });
	// ctx.body = obj;
	const docRef = await getDoc(doc(db, 'PHynaT3xo6g3fenpK2LLkQKQTaj1', 'cs'));

	ctx.body = docRef;
});
