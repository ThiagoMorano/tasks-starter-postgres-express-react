const Router = require('express-promise-router');
const _ = require('lodash');
const Posts = require('../../components/posts');
const auth = require('../../components/auth/helpers');

module.exports = (app) => {
  const router = Router();
  const posts = Posts(app);

  // Create
  router.post('/', auth.authenticate, async (req, res) => {
    const data = await posts.create(req.user, _.pick(req.body, 'content', 'title'));
    res.json(data);
  });

  // Get all
  router.get('/', auth.authenticate, async (req, res) => {
    const data = await posts.get();
    res.json(data);
  });

  // Get one by id
  router.get('/:id(\\d+)', auth.authenticate, async (req, res) => {
    const data = await posts.getOne(req.params.id);
    res.json(data);
  });

  // Get matching id
  router.get('/search/:id(\\d+)', auth.authenticate, async (req, res) => {
    const data = await posts.searchById(`%${req.params.id}%`);
    res.json(data);
  });

  // Get matching author
  router.get('/search/:author', auth.authenticate, async (req, res) => {
    const data = await posts.searchByAuthor(`%${req.params.author}%`);
    res.json(data);
  });

  // Update
  router.put('/:id(\\d+)', auth.authenticate, async (req, res) => {
    const data = await posts.update(req.params.id, _.pick(req.body, 'content', 'title'));
    res.json(data);
  });

  // Delete
  router.delete('/:id(\\d+)', auth.authenticate, async (req, res) => {
    const data = await posts.delete(req.params.id);
    res.json(data);
  });

  return Router().use('/posts', router);
};
