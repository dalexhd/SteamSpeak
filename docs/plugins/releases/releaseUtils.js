// eslint-disable-next-line func-names
const __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const fsExtra = __importDefault(require('fs-extra'));
const globby = __importDefault(require('globby'));
const path = __importDefault(require('path'));
const utils = require('@docusaurus/utils');
const semver = __importDefault(require('semver'));

function truncate(fileString, truncateMarker) {
  return fileString.split(truncateMarker, 1).shift();
}
exports.truncate = truncate;
async function generateReleases(releaseDir, { siteConfig, siteDir }, options) {
  const { include, routeBasePath, truncateMarker } = options;
  if (!fsExtra.default.existsSync(releaseDir)) {
    return [];
  }
  const { baseUrl = '' } = siteConfig;
  const releaseFiles = await globby.default(include, {
    cwd: releaseDir
  });
  const releases = [];
  await Promise.all(
    releaseFiles.map(async (relativeSource) => {
      const source = path.default.join(releaseDir, relativeSource);
      const aliasedSource = utils.aliasedSitePath(source, siteDir);
      const fileString = await fsExtra.default.readFile(source, 'utf-8');
      const { frontMatter, content, excerpt } = utils.parse(fileString);
      if (frontMatter.draft && process.env.NODE_ENV === 'production') {
        return;
      }
      const date = new Date(
        frontMatter.date ? Date.parse(frontMatter.date) : Date.now()
      );
      const description = frontMatter.description || excerpt;
      const version = relativeSource.replace(/\.mdx?$/, '');
      const title = frontMatter.title || version;
      releases.push({
        id: frontMatter.id || frontMatter.title,
        metadata: {
          date,
          description,
          permalink: utils.normalizeUrl([
            baseUrl,
            routeBasePath,
            frontMatter.id || version
          ]),
          source: aliasedSource,
          title,
          // eslint-disable-next-line no-void
          truncated:
            (truncateMarker === null || truncateMarker === void 0
              ? void 0
              : truncateMarker.test(content)) || false,
          version
        }
      });
    })
  );
  return releases.sort((a, b) =>
    semver.default.compare(a.metadata.version, b.metadata.version)
  );
}
exports.generateReleases = generateReleases;
function linkify(fileContent, siteDir, releasePath, releases) {
  let fencedBlock = false;
  const lines = fileContent.split('\n').map((line) => {
    if (line.trim().startsWith('```')) {
      fencedBlock = !fencedBlock;
    }
    if (fencedBlock) return line;
    let modifiedLine = line;
    const mdRegex = /(?:(?:\]\()|(?:\]:\s?))(?!https)([^'")\]\s>]+\.mdx?)/g;
    let mdMatch = mdRegex.exec(modifiedLine);
    while (mdMatch !== null) {
      const mdLink = mdMatch[1];
      const aliasedPostSource = `@site/${path.default.relative(
        siteDir,
        path.default.resolve(releasePath, mdLink)
      )}`;
      let releasePermalink = null;
      releases.forEach((release) => {
        if (release.metadata.source === aliasedPostSource) {
          releasePermalink = release.metadata.permalink;
        }
      });
      if (releasePermalink) {
        modifiedLine = modifiedLine.replace(mdLink, releasePermalink);
      }
      mdMatch = mdRegex.exec(modifiedLine);
    }
    return modifiedLine;
  });
  return lines.join('\n');
}
exports.linkify = linkify;
