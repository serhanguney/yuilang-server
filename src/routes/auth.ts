import * as Router from 'koa-router';
import { DefaultState, Context } from 'koa';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../conf/config.firebase';

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
			ctx.body = response.user.uid
		}else{
			ctx.status = 500;
			ctx.body = {message: 'Could not get firebase database', response}
		}
	} catch (err) {
		ctx.throw(`There was an issue with firebase: ${err}`);
	}
});

authRoute.get('/getIdentity', async (ctx) => {
	console.log('@@', ctx.session);
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
