import * as Router from 'koa-router';
const { Translate } = require('@google-cloud/translate').v2;
export const translationRouter = new Router();
const CREDENTIALS = JSON.parse(process.env.TRANSLATE_CREDENTIALS);

const translate = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id,
});
translationRouter.post('/translate', async (ctx) => {
  const { phrase, targetLanguage } = JSON.parse(ctx.request.body);
  if (phrase.length === 0) {
    ctx.response.body = 'Phrase is empty';
    console.log('request empty');
    return;
  }
  try {
    const [response] = await translate.translate(phrase, targetLanguage);
    console.log('requesting google');
    ctx.response.body = response;
  } catch (err) {
    ctx.response.body = err;
    throw new Error(`Error while translating phrase: ${err}`);
  }
});
