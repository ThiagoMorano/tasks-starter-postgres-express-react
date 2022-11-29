const Router = require('express-promise-router');
const PostSummaries = require('../../components/post-summaries');
const auth = require('../../components/auth/helpers');

module.exports = (app) => {
  const router = Router();
  const postSummaries = PostSummaries(app);

  // Get post summaries
  router.get('/', auth.authenticate, async (req, res) => {
    const data = await postSummaries.getPostSummaries();
    res.json(data);
  });

  return Router().use('/', router);
};
