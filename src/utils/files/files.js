const { isNil } = require('ramda');
const Result = require('folktale/result');

const getValidFile = (filePath) =>
  isNil(filePath) ? Result.Error('No file name') : Result.Ok(filePath);

const getFilePath = (filePath) => {
  return getValidFile(filePath);
};

module.exports = { getFilePath };
