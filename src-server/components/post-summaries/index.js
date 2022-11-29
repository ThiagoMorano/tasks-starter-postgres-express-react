module.exports = (app) => {
  const db = app.get('db');
  const module = {};

  // Get post summaries
  module.getPostSummaries = async () => db.query(
    'select p.title, count(p.title) as number_of_posts from posts p group by p.title order by p.title'
  );

  return module;
};
