const { getShoe, getShoes, SHOES_LIST_QUERY, SHOE_DETAIL_QUERY } = require('.');
const { Pool } = require('pg');
jest.mock('pg');

const { query } = Pool.prototype;

test('getShoes', async () => {
  query.mockResolvedValue({
    command: '',
    rows: [],
    rowCount: 0,
  });
  await getShoes();

  // Being that these loader functions call an external dependency,
  // it doesn't make sense to test input/output like we would a simple unit test.
  // Testing that the correct arguments were supplied to `pool.query` is usually sufficient here.
  // If shoes index query uses arguments, such as filter params, we can add additional argument tests.
  expect(query).toHaveBeenCalledWith(SHOES_LIST_QUERY);
});

describe('getShoe', () => {
  const SHOE_MOCK = {
    id: 1,
    name: 'yeezy',
    trueToSize: '2.94',
  };

  test('with result', async () => {
    query.mockResolvedValue({
      command: '',
      rows: [SHOE_MOCK],
      rowCount: 1,
    });
    const result = await getShoe(1);
    expect(query).toHaveBeenCalledWith(SHOE_DETAIL_QUERY, [1]);

    // Because we are returning this value in our db mock as well as testing against it,
    // this will not protect against changes in the API.
    // All this really tests is that `getShoe()` returns a single object, as opposed to a list.
    // We can mitigate this in unit tests by explicitly defining SHOE_DETAIL_QUERY instead of importing it,
    // which protects against changes to the underlying query,
    // or we can use a more sophisticated mock that somehow parses the SQL query and returns object based on its SELECT statement.
    // Outside of that, we could use API integration tests to detect changes, but that is outside the scope of these unit tests.
    expect(result).toEqual(expect.objectContaining(SHOE_MOCK));
  });

  test('with no result', async () => {
    query.mockResolvedValue({
      command: '',
      rows: [],
      rowCount: 0,
    });
    const result = await getShoe(3);

    // We can skip this since we are testing it up above, but this may be desirable to include for loaders of greater complexity.
    // expect(query).toHaveBeenCalledWith(SHOE_DETAIL_QUERY, [3]);

    // We can also use `expect.toBeFalsy()` if we for some reason want to be less strict.
    expect(result).toBeUndefined();
  });
});
