const fs = require('node:fs/promises');
const path = require('node:path');

const dataFilePath = path.join(__dirname, '..', 'events.json');

async function readData() {
  const data = await fs.readFile(dataFilePath, 'utf8');
  return JSON.parse(data);
}

async function writeData(data) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}

exports.readData = readData;
exports.writeData = writeData;
