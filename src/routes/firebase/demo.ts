import { firebaseRouter } from './index';
import { DatabaseModel, db, PhraseType } from '../../conf/config.firebase';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

firebaseRouter.post('/demo', async (ctx) => {
	const { categoryCount, uid } = JSON.parse(ctx.request.body);
	try {
		// ADDS ENTRY TO COLLECTION WITH AUTO-ID
		// const response = await addDoc(collection(db, 'PHynaT3xo6g3fenpK2LLkQKQTaj1', 'cs'), {
		// 	phrase: 'hello world'
		// });

		//ADD COLLECTION TO DOC
		const phraseObject: PhraseType = {
			[uuidv4()]: {
				phrase: 'hello world',
				inEnglish: 'Hello world',
				practiceCount: 0,
				dateAdded: new Date(),
				type: 'sentence'
			}
		};
		const docObject: DatabaseModel = {
			categories: {
				['reading']: {
					phrases: phraseObject,
					practiceCount: categoryCount
				}
			},
			practiceCount: 0
		};

		const response = await setDoc(doc(db, uid, 'cs'), docObject);
		ctx.body = response;
	} catch (err) {
		ctx.throw(`ctx: ${categoryCount} ${uid} - firebase error: ${err}`);
	}
});
