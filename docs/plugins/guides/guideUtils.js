
const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const globby_1 = __importDefault(require("globby"));
const humanize_string_1 = __importDefault(require("humanize-string"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("@docusaurus/utils");
const reading_time_1 = __importDefault(require("reading-time"));
const titleize_1 = __importDefault(require("titleize"));

function truncate(fileString, truncateMarker) {
    return fileString.split(truncateMarker, 1).shift();
}
exports.truncate = truncate;
async function generateGuides(guideDir, { siteConfig, siteDir }, options) {
    const { include, routeBasePath, truncateMarker } = options;
    if (!fs_extra_1.default.existsSync(guideDir)) {
        return [];
    }
    const { baseUrl = '' } = siteConfig;
    const guideFiles = await globby_1.default(include, {
        cwd: guideDir,
    });
    const guides = [];
    await Promise.all(guideFiles.map(async (relativeSource) => {
        const source = path_1.default.join(guideDir, relativeSource);
        const aliasedSource = utils_1.aliasedSitePath(source, siteDir);
        const fileString = await fs_extra_1.default.readFile(source, 'utf-8');
        const readingStats = reading_time_1.default(fileString);
        const { frontMatter, content, excerpt } = utils_1.parse(fileString);
        if (frontMatter.draft && process.env.NODE_ENV === 'production') {
            return;
        }
        const categoryParts = relativeSource.split('/').slice(0, -1);
        const categories = [];
        while (categoryParts.length > 0) {
            const name = categoryParts[categoryParts.length - 1];
            const title = titleize_1.default(humanize_string_1.default(name));
            let description = null;
            switch (name) {
                case 'getting-started':
                    description = 'Take SteamSpeak from zero to production in under 20 minutes.';
                    break;
                case 'installation':
                    description = 'Learn how to install SteamSpeak.';
                    break;
            }
            categories.unshift({
                name,
                title,
                description,
                permalink: utils_1.normalizeUrl([baseUrl, routeBasePath, categoryParts.join('/')])
            });
            categoryParts.pop();
        }
        const linkName = relativeSource.replace(/\.mdx?$/, '');
        const seriesPosition = frontMatter.series_position;
        const tags = frontMatter.tags || [];
        const title = frontMatter.title || linkName;
        const coverLabel = frontMatter.cover_label || title;
        guides.push({
            id: frontMatter.id || frontMatter.title,
            metadata: {
                categories,
                coverLabel,
                description: frontMatter.description || excerpt,
                permalink: utils_1.normalizeUrl([
                    baseUrl,
                    routeBasePath,
                    frontMatter.id || linkName,
                ]),
                readingTime: readingStats.text,
                seriesPosition,
                sort: frontMatter.sort,
                source: aliasedSource,
                tags,
                title,
                truncated: (truncateMarker === null || truncateMarker === void 0 ? void 0 : truncateMarker.test(content)) || false,
            },
        });
    }));
    return lodash_1.default.sortBy(guides, [
        ((guide) => {
            const {categories} = guide.metadata;
            if (categories[0].name == 'getting-started') {
                return ['AA'].concat(categories.map(category => category.name).slice(1));
            }
            
                return categories;
            
        }),
        'metadata.seriesPosition',
        ((guide) => guide.metadata.coverLabel.toLowerCase())
    ]);
}
exports.generateGuides = generateGuides;
function linkify(fileContent, siteDir, guidePath, guides) {
    let fencedBlock = false;
    const lines = fileContent.split('\n').map(line => {
        if (line.trim().startsWith('```')) {
            fencedBlock = !fencedBlock;
        }
        if (fencedBlock)
            return line;
        let modifiedLine = line;
        const mdRegex = /(?:(?:\]\()|(?:\]:\s?))(?!https)([^'")\]\s>]+\.mdx?)/g;
        let mdMatch = mdRegex.exec(modifiedLine);
        while (mdMatch !== null) {
            const mdLink = mdMatch[1];
            const aliasedPostSource = `@site/${path_1.default.relative(siteDir, path_1.default.resolve(guidePath, mdLink))}`;
            let guidePermalink = null;
            guides.forEach(guide => {
                if (guide.metadata.source === aliasedPostSource) {
                    guidePermalink = guide.metadata.permalink;
                }
            });
            if (guidePermalink) {
                modifiedLine = modifiedLine.replace(mdLink, guidePermalink);
            }
            mdMatch = mdRegex.exec(modifiedLine);
        }
        return modifiedLine;
    });
    return lines.join('\n');
}
exports.linkify = linkify;
