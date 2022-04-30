import * as Router from 'koa-router';
import { Context, DefaultState } from 'koa';

export const firebaseRouter = new Router<DefaultState, Context>();
import './practice';
import './addCategory';
import './addPhrase'
import './getDatabase';
import './demo';
import './deletePhrase';

//TODO add /editPhrase
//TODO add /editCategory
//TODO add /editLanguage
//TODO add /removeCategory
//TODO add /removeLanguage
