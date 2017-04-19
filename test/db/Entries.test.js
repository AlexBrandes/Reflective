require('dotenv').config();

if (process.env.IS_ON === 'development') {
  process.env.DATABASE_URL = 'postgres://@localhost:5432/reflectivetest';
}
const Entry = require('../../server/models/entries.js');
const EntryText = require('../../server/models/entry-text.js');
const User = require('../../server/models/users.js');
const db = require('../../db/config.js').db;

const newEntry = {
  user_id: null,
  call_id: '5dsFD351234FDS'
};

beforeAll(() => {
  return User.new({
    email: 'terencetmac2@gmail.com',
    first_name: 'Terence',
    last_name: 'Tham',
    password: 'Password',
    phone: '6505421376'
  })
    .then((user) => {
      newEntry.user_id = user.user_id;
    });
});

afterAll(() => (
  User.delete(newEntry.user_id)
));

describe('Entries', () => {
  it('should add an entry', () => {
    return Entry.new(newEntry)
      .then((result) => {
        expect(result).toBeDefined();
        return EntryText.new(result.entry_id, 'sample text');
      });
  });

  it('should get an entry by call_id', () => {
    return Entry.getByCallId(newEntry.call_id)
      .then((result) => {
        expect(result).toBeDefined();
        expect(result.call_id).toEqual(newEntry.call_id);
      });
  });

  it('should get entries by user_id', () => {
    return Entry.findByUserId(newEntry.user_id)
      .then((result) => {
        expect(result).toBeDefined();
        expect(result[0].user_id).toEqual(newEntry.user_id);
      });
  });
});