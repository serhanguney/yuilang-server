import { doc,updateDoc,deleteField } from 'firebase/firestore';
import { db} from '../../conf/config.firebase';
import { firebaseRouter } from './index';

firebaseRouter.post('/delete', async (ctx) => {
    try {
        const { uid, phraseID, category} = JSON.parse(
            ctx.request.body
        );
        if (
            !uid ||
            !phraseID ||
            !category
        ) {
            ctx.throw({
                message: 'Required fields are missing',
                ctx: [uid, phraseID,category]
            });
            return;
        }

        ctx.body = await updateDoc(doc(db,uid,'cs'), {
            [`categories.${category}.phrases.${phraseID}`]: deleteField()
        })
        console.log('deleting')
    } catch (err) {
        ctx.response.body = err;
        ctx.throw(`There was a problem: ${err}`);
    }
});
