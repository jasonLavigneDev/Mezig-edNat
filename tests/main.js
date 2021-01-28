import assert from 'assert';

describe('EduCard', function x() {
  it('package.json has correct name', async function y() {
    const { name } = await import('../package.json');
    assert.strictEqual(name, 'EduCard');
  });

  if (Meteor.isClient) {
    it('client is not server', function z() {
      assert.strictEqual(Meteor.isServer, false);
    });
  }

  if (Meteor.isServer) {
    it('server is not client', function t() {
      assert.strictEqual(Meteor.isClient, false);
    });
  }
});
