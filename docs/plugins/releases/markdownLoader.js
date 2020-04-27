const { parseQuery, getOptions } = require('loader-utils');
const releaseUtils = require('./releaseUtils');

// eslint-disable-next-line func-names
module.exports = function (fileString) {
  const callback = this.async();
  const { truncateMarker, siteDir, contentPath, releases } = getOptions(this);
  // Linkify posts
  let finalContent = releaseUtils.linkify(
    fileString,
    siteDir,
    contentPath,
    releases
  );
  // Truncate content if requested (e.g: file.md?truncated=true).
  const { truncated } = this.resourceQuery && parseQuery(this.resourceQuery);
  if (truncated) {
    finalContent = releaseUtils.truncate(finalContent, truncateMarker);
  }
  return callback && callback(null, finalContent);
};
