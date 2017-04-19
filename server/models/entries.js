const { db } = require('../../db/config.js');

module.exports.new = entry => {
  return db.one(
    'INSERT INTO entries\
    (user_id, call_id)\
    VALUES (${user_id}, ${call_id})\
    RETURNING entry_id, user_id, call_id, created',
  entry)
};

module.exports.getByCallId = callId => (
  db.oneOrNone('SELECT * FROM entries WHERE call_id = $1', [callId])
);

module.exports.getCallIdByEntryId = entryId => (
  db.oneOrNone('SELECT * FROM entries WHERE entry_id = $1', [entryId])
);

module.exports.findByUserId = userId => (
  db.manyOrNone('SELECT entry_text.text, entries.entry_id, entries.created, entries.user_id FROM entry_text INNER JOIN entries\
    ON entry_text.entry_id = entries.entry_id\
    WHERE entries.user_id = $1', [userId])
);
