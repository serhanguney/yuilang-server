import * as Router from 'koa-router';
import { DefaultState, Context } from 'koa';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../conf/config.firebase';
import { getSessionDatabase } from './firebase/getSession';

export const authRoute = new Router<DefaultState, Context>();

authRoute.post('/signUp', async (ctx) => {
	try {
		const { email, password } = JSON.parse(ctx.request.body);
		ctx.body  = await createUserWithEmailAndPassword(auth, email, password);
	} catch (err) {
		ctx.throw(err)
	}
});

authRoute.post('/login', async (ctx) => {
	const { email, password } = JSON.parse(ctx.request.body);
	try {
		const response = await signInWithEmailAndPassword(auth, email, password);
		if (response.user.uid) {
			ctx.session.uid = response.user.uid;
		}
		const sessionDataBase = await getSessionDatabase(ctx.session.uid);
		if (sessionDataBase) {
			ctx.session.db = sessionDataBase;
		}
		ctx.body = response;
	} catch (err) {
		ctx.status = 500;
		ctx.body = 'there was an issue with firebase';
		throw new Error(`There was an issue with firebase: ${err}`);
	}
});

authRoute.get('/getIdentity', async (ctx) => {
	if (ctx.session.uid) {
		ctx.body = ctx.session.uid;
		ctx.status = 200;
	} else {
		ctx.throw({
			status: 500,
			message: `Session id does not exist. Session needs to be renewed. Session: ${ctx.session.uid}`
		});
	}
});
