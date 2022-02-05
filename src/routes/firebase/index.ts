import * as Router from 'koa-router';
import { Context, DefaultState } from 'koa';

export const firebaseRouter = new Router<DefaultState, Context>();
import './practice';
import './addCategory';
import './addPhrase';
import './getSession';
import './demo';

//TODO add /editPhrase
//TODO add /editCategory
//TODO add /editLanguage
//TODO add /removePhrase
//TODO add /removeCategory
//TODO add /removeLanguage
