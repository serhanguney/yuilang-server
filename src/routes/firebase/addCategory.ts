import { doc, setDoc } from 'firebase/firestore';
import { CategoryType, db } from '../../conf/config.firebase';
import { firebaseRouter } from './index';

firebaseRouter.post('/addCategory', async (ctx) => {
	const { uid, category, language } = JSON.parse(ctx.request.body);

	if (!category || !language) {
		ctx.response.body = 'Category and language is required!';
		return;
	}

	try {
		const body: CategoryType = {
			[category]: {
				phrases: {},
				practiceCount: 0
			}
		};
		const response = await setDoc(
			doc(db, uid, language),
			{
				categories: body
			},
			{ merge: true }
		);
		ctx.response.body = response;
	} catch (err) {
		ctx.response.body = err;
		ctx.throw(`There was a problem: ${err}`);
	}
});
