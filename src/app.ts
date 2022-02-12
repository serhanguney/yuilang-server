import * as Koa from 'koa';
import * as session from 'koa-session';
import * as cors from 'koa2-cors';
import * as koaBody from 'koa-body';
import { firebaseRouter } from './routes/firebase/index';
import { authRoute } from './routes/auth';
import { translationRouter } from './routes/translate';
import { startFirebase } from './conf/config.firebase';

const app = new Koa();

app.use(koaBody());
app.use(cors());
app.keys = ['newest secret key', 'older secret key'];
app.use(async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		ctx.status = 500;
		ctx.body = { message: err };
	}
});

app.use(async (ctx, next) => {
	await startFirebase();
	await next();
});
app.use(session(app));

// Routes
app.use(firebaseRouter.routes());
app.use(authRoute.routes());
app.use(translationRouter.routes());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Koa started ${PORT}`);
});
