import { doc, setDoc } from 'firebase/firestore';
import { db,  PhraseType, DatabaseModel  } from '../../conf/config.firebase';
import { firebaseRouter } from './index';
import { v4 as uuidv4 } from 'uuid';
import {getDatabase} from "./getDatabase";

firebaseRouter.post('/addPhrase', async (ctx) => {
	try {
		const { uid, phrase, inEnglish, category, language, type, categoryCount } = JSON.parse(
			ctx.request.body
		);
		if (
			!uid ||
			!phrase ||
			!category ||
			!language ||
			!inEnglish ||
			!type ||
			!Number.isInteger(categoryCount)
		) {
			ctx.throw({
				message: 'Required fields are missing',
				ctx: [uid, phrase, category, language, inEnglish, type, categoryCount]
			});
			return;
		}
		const userDatabase: DatabaseModel = await getDatabase(uid);

		const arrayOfEntries = Object.entries(userDatabase.categories[category].phrases);

		const alreadyExists =
			arrayOfEntries.filter(
				(item: any) =>
					item[1].phrase.split(' ').join('').toLowerCase() ===
					phrase.split(' ').join('').toLowerCase()
			).length > 0;

		if (alreadyExists) {
			ctx.throw({
				message: 'Phrase already exists'
			});
			return;
		}

		const phraseObject: PhraseType = {
			[uuidv4()]: {
				phrase,
				inEnglish,
				practiceCount: 0,
				dateAdded: new Date(),
				type
			}
		};
		const docObject: DatabaseModel = {
			categories: {
				[category]: {
					phrases: phraseObject,
					practiceCount: categoryCount
				}
			},
			practiceCount: 0
		};
		const response = await setDoc(doc(db, uid, language), docObject, { merge: true });

		ctx.response.body = response;
	} catch (err) {
		ctx.response.body = err;
		ctx.throw(`There was a problem: ${err}`);
	}
});
