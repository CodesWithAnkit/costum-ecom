const fs = require('fs');
const crypto = require('crypto');

class UserRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error('Creating a repository require a filename');
    }
    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, '[]');
    }
  }
  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: 'utf8'
      })
    );
  }

  async create(attributes) {
    attributes.id = this.rendomId();
    const records = await this.getAll();
    records.push(attributes);

    await this.writeAll(records);
  }

  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }

  rendomId() {
    return crypto.randomBytes(4).toString('hex');
  }

  async getOne(id) {
    const records = await this.getAll();
    return records.find(record => record.id === id);
  }

  async delete(id) {
    const records = await this.getAll();
    const updateRecords = records.filter(record => record.id !== id);

    await this.writeAll(updateRecords);
  }

  async update(id, attrs) {
    const records = await this.getAll();
    const record = records.find(record => record.id === id);

    if (!record) {
      throw new Error(`Record Not found at ${id}`);
    }

    Object.assign(record, attrs);
    await this.writeAll(records);
  }
}

const test = async () => {
  const repo = new UserRepository('user.json');

  // repo.create({ email: 'test@test.com', password: 'asjdflkjalsd' });

  // const user = await repo.delete('e7f5fb40');
  await repo.update('3e992abf', { password: 'ItsPassword' });

  // console.log(user);
};

test();
