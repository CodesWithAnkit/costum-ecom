const fs = require('fs');

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
}

new UserRepository('user.json');
