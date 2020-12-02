"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.linkify = exports.generateGuides = exports.truncate = void 0;
var lodash_1 = require("lodash");
var fs = __importStar(require("fs-extra"));
var globby_1 = __importDefault(require("globby"));
var humanize_string_1 = __importDefault(require("humanize-string"));
var path = __importStar(require("path"));
var utils_1 = require("@docusaurus/utils");
var reading_time_1 = __importDefault(require("reading-time"));
var titleize_1 = __importDefault(require("titleize"));
function truncate(fileString, truncateMarker) {
    return fileString.split(truncateMarker, 1).shift();
}
exports.truncate = truncate;
function generateGuides(guideDir, _a, options) {
    var siteConfig = _a.siteConfig, siteDir = _a.siteDir;
    return __awaiter(this, void 0, void 0, function () {
        var include, routeBasePath, truncateMarker, _b, baseUrl, guideFiles, guides;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    include = options.include, routeBasePath = options.routeBasePath, truncateMarker = options.truncateMarker;
                    if (!fs.existsSync(guideDir)) {
                        return [2 /*return*/, []];
                    }
                    _b = siteConfig.baseUrl, baseUrl = _b === void 0 ? '' : _b;
                    return [4 /*yield*/, globby_1["default"](include, {
                            cwd: guideDir
                        })];
                case 1:
                    guideFiles = _c.sent();
                    guides = [];
                    return [4 /*yield*/, Promise.all(guideFiles.map(function (relativeSource) { return __awaiter(_this, void 0, void 0, function () {
                            var source, aliasedSource, fileString, readingStats, _a, frontMatter, content, excerpt, categoryParts, categories, name_1, title_1, description, linkName, seriesPosition, tags, title, coverLabel;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        source = path.join(guideDir, relativeSource);
                                        aliasedSource = utils_1.aliasedSitePath(source, siteDir);
                                        return [4 /*yield*/, fs.readFile(source, 'utf-8')];
                                    case 1:
                                        fileString = _b.sent();
                                        readingStats = reading_time_1["default"](fileString);
                                        _a = utils_1.parseMarkdownString(fileString), frontMatter = _a.frontMatter, content = _a.content, excerpt = _a.excerpt;
                                        if (frontMatter.draft && process.env.NODE_ENV === 'production') {
                                            return [2 /*return*/];
                                        }
                                        categoryParts = relativeSource.split('/').slice(0, -1);
                                        categories = [];
                                        while (categoryParts.length > 0) {
                                            name_1 = categoryParts[categoryParts.length - 1];
                                            title_1 = titleize_1["default"](humanize_string_1["default"](name_1));
                                            description = null;
                                            switch (name_1) {
                                                case 'getting-started':
                                                    description =
                                                        'Take SteamSpeak from zero to production in under 20 minutes.';
                                                    break;
                                                case 'installation':
                                                    description = 'Learn how to install SteamSpeak.';
                                                    break;
                                            }
                                            categories.unshift({
                                                name: name_1,
                                                title: title_1,
                                                description: description,
                                                permalink: utils_1.normalizeUrl([
                                                    baseUrl,
                                                    routeBasePath,
                                                    categoryParts.join('/')
                                                ])
                                            });
                                            categoryParts.pop();
                                        }
                                        linkName = relativeSource.replace(/\.mdx?$/, '');
                                        seriesPosition = frontMatter.series_position;
                                        tags = frontMatter.tags || [];
                                        title = frontMatter.title || linkName;
                                        coverLabel = frontMatter.cover_label || title;
                                        guides.push({
                                            id: frontMatter.id || frontMatter.title,
                                            metadata: {
                                                categories: categories,
                                                coverLabel: coverLabel,
                                                description: frontMatter.description || excerpt,
                                                permalink: utils_1.normalizeUrl([
                                                    baseUrl,
                                                    routeBasePath,
                                                    frontMatter.id || linkName
                                                ]),
                                                readingTime: readingStats.text,
                                                seriesPosition: seriesPosition,
                                                sort: frontMatter.sort,
                                                source: aliasedSource,
                                                tags: tags,
                                                title: title,
                                                truncated: (truncateMarker === null || truncateMarker === void 0 ? void 0 : truncateMarker.test(content)) || false
                                            }
                                        });
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 2:
                    _c.sent();
                    return [2 /*return*/, lodash_1.sortBy(guides, [
                            function (guide) {
                                var categories = guide.metadata.categories;
                                if (categories[0].name === 'getting-started') {
                                    return ['AA'].concat(categories.map(function (category) { return category.name; }).slice(1));
                                }
                                else {
                                    return categories;
                                }
                            },
                            'metadata.seriesPosition',
                            function (guide) { return guide.metadata.coverLabel.toLowerCase(); }
                        ])];
            }
        });
    });
}
exports.generateGuides = generateGuides;
function linkify(fileContent, siteDir, guidePath, guides) {
    var fencedBlock = false;
    var lines = fileContent.split('\n').map(function (line) {
        if (line.trim().startsWith('```')) {
            fencedBlock = !fencedBlock;
        }
        if (fencedBlock)
            return line;
        var modifiedLine = line;
        var mdRegex = /(?:(?:\]\()|(?:\]:\s?))(?!https)([^'")\]\s>]+\.mdx?)/g;
        var mdMatch = mdRegex.exec(modifiedLine);
        var _loop_1 = function () {
            var mdLink = mdMatch[1];
            var aliasedPostSource = "@site/" + path.relative(siteDir, path.resolve(guidePath, mdLink));
            var guidePermalink = null;
            guides.forEach(function (guide) {
                if (guide.metadata.source === aliasedPostSource) {
                    guidePermalink = guide.metadata.permalink;
                }
            });
            if (guidePermalink) {
                modifiedLine = modifiedLine.replace(mdLink, guidePermalink);
            }
            mdMatch = mdRegex.exec(modifiedLine);
        };
        while (mdMatch !== null) {
            _loop_1();
        }
        return modifiedLine;
    });
    return lines.join('\n');
}
exports.linkify = linkify;
