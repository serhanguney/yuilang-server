import { firebaseRouter } from './index';
import { doc, updateDoc, increment } from 'firebase/firestore';
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
		ctx.body = await updateDoc(docRef, {
			practiceCount: increment(1),
			[categoryDirectory]: increment(1),
			[phraseDirectory]: increment(1)
		});
	} catch (err) {
		ctx.throw(`there was a problem: ${err}`);
	}
});

