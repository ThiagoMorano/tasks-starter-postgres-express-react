module.exports = (app) => {
  const db = app.get('db');
  const { posts } = db;
  const module = {};

  // Create
  module.create = async (user, row) => {
    if (!row) throw new Error('No row data given');
    delete row.id;
    return posts.save({ ...row, user_id: user.id });
  };

  // Get all
  module.get = async () => db.query('select p.*, u.email as author from posts p left join users u ON p.user_id=u.id');

  // Get one by id
  module.getOne = async (id) => db.query(
    'select p.*, u.email as author from posts p left join users u ON p.user_id=u.id where p.id=$1',
    [id],
    { single: true }
  );

  // Search by id
  module.searchById = async (id) => db.query(
    'select p.*, u.email as author from posts p left join users u ON p.user_id=u.id where p.id::text like $1',
    [id]
  );

  // Search by author
  module.searchByAuthor = async (email) => db.query(
    'select p.*, u.email as author from posts p left join users u ON p.user_id=u.id where u.email like $1',
    [email]
  );

  // Update
  module.update = async (id, row) => {
    if (!Number(id)) throw new Error('No id given');
    row.id = id;
    return posts.save(row);
  };

  // Delete
  module.delete = async (id) => {
    if (!Number(id)) throw new Error('No id given');
    return posts.destroy({ id });
  };

  return module;
};
