const { isNil } = require("ramda");
const Result = require("folktale/result");

const getValidFile = (filePath) =>
  isNil(filePath) ? Result.Error("No file name") : Result.Ok(filePath);

const getFilePath = (node) => {
  switch (node.internal.type) {
    case "File":
      return getValidFile(node.absolutePath);
    case "MarkdownRemark":
    case "Mdx":
      return getValidFile(node.fileAbsolutePath);
    default:
      return Result.Error("Skiping file type: " + node.internal.type);
  }
};

module.exports = { getFilePath };
