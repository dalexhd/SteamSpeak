"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var lodash_1 = require("lodash");
var path = __importStar(require("path"));
var utils_1 = require("@docusaurus/utils");
var guideUtils_1 = require("./guideUtils");
var DEFAULT_OPTIONS = {
    path: 'guides',
    routeBasePath: 'guides/',
    include: ['**/*.md', '**/*.mdx'],
    guideListComponent: '@theme/GuideListPage',
    guideComponent: '@theme/GuidePage',
    guideTagListComponent: '@theme/GuideTagListPage',
    guideTagComponent: '@theme/GuideTagPage',
    guideCategoryComponent: '@theme/GuideCategoryPage',
    remarkPlugins: [],
    rehypePlugins: [],
    truncateMarker: /<!--\s*(truncate)\s*-->/
};
function pluginContentGuide(context, opts) {
    var options = __assign(__assign({}, DEFAULT_OPTIONS), opts);
    var siteDir = context.siteDir, generatedFilesDir = context.generatedFilesDir;
    var contentPath = path.resolve(siteDir, options.path);
    var dataDir = path.join(generatedFilesDir, 'guides');
    var guides = [];
    return {
        name: 'guides',
        getPathsToWatch: function () {
            var _a = options.include, include = _a === void 0 ? [] : _a;
            var globPattern = include.map(function (pattern) { return contentPath + "/" + pattern; });
            return __spreadArrays(globPattern);
        },
        loadContent: function () {
            return __awaiter(this, void 0, void 0, function () {
                var routeBasePath, _a, baseUrl, basePageUrl, guideTags, tagsPath, guideCategories;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            routeBasePath = options.routeBasePath;
                            _a = context.siteConfig.baseUrl, baseUrl = _a === void 0 ? '' : _a;
                            basePageUrl = utils_1.normalizeUrl([baseUrl, routeBasePath]);
                            return [4 /*yield*/, guideUtils_1.generateGuides(contentPath, context, options)];
                        case 1:
                            //
                            // Guides
                            //
                            guides = _b.sent();
                            if (!guides.length) {
                                return [2 /*return*/, null];
                            }
                            // Colocate next and prev metadata.
                            guides.forEach(function (guide, index) {
                                var prevItem = index > 0 ? guides[index - 1] : null;
                                if (prevItem) {
                                    guide.metadata.prevItem = {
                                        title: prevItem.metadata.title,
                                        permalink: prevItem.metadata.permalink
                                    };
                                }
                                var nextItem = index < guides.length - 1 ? guides[index + 1] : null;
                                if (nextItem) {
                                    guide.metadata.nextItem = {
                                        title: nextItem.metadata.title,
                                        permalink: nextItem.metadata.permalink
                                    };
                                }
                            });
                            guideTags = {};
                            tagsPath = utils_1.normalizeUrl([basePageUrl, 'tags']);
                            guides.forEach(function (guide) {
                                var tags = guide.metadata.tags;
                                if (!tags || tags.length === 0) {
                                    // TODO: Extract tags out into a separate plugin.
                                    // eslint-disable-next-line no-param-reassign
                                    guide.metadata.tags = [];
                                    return;
                                }
                                // eslint-disable-next-line no-param-reassign
                                guide.metadata.tags = tags.map(function (tag) {
                                    if (typeof tag === 'string') {
                                        var normalizedTag = lodash_1.kebabCase(tag);
                                        var permalink = utils_1.normalizeUrl([tagsPath, normalizedTag]);
                                        if (!guideTags[normalizedTag]) {
                                            guideTags[normalizedTag] = {
                                                // Will only use the name of the first occurrence of the tag.
                                                name: tag.toLowerCase(),
                                                items: [],
                                                permalink: permalink
                                            };
                                        }
                                        guideTags[normalizedTag].items.push(guide.id);
                                        return {
                                            label: tag,
                                            permalink: permalink
                                        };
                                    }
                                    else {
                                        return tag;
                                    }
                                });
                            });
                            guideCategories = lodash_1.flatMap(guides, (function (guide) { return guide.metadata.categories; }));
                            guideCategories = lodash_1.uniqBy(guideCategories, (function (guideCategory) { return guideCategory.permalink; }));
                            return [2 /*return*/, {
                                    guides: guides,
                                    guideTags: guideTags,
                                    guideCategories: guideCategories
                                }];
                    }
                });
            });
        },
        contentLoaded: function (_a) {
            var guideContents = _a.content, actions = _a.actions;
            return __awaiter(this, void 0, void 0, function () {
                var guideListComponent, guideComponent, guideTagListComponent, guideTagComponent, guideCategoryComponent, aliasedSource, addRoute, createData, guides, guideTags, guideCategories, guideItemsToMetadata, routeBasePath, _b, baseUrl, basePageUrl, tagsPath, tagsModule, tagsListPath, guidePermalinks_1;
                var _this = this;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!guideContents) {
                                return [2 /*return*/];
                            }
                            guideListComponent = options.guideListComponent, guideComponent = options.guideComponent, guideTagListComponent = options.guideTagListComponent, guideTagComponent = options.guideTagComponent, guideCategoryComponent = options.guideCategoryComponent;
                            aliasedSource = function (source) {
                                return "~guide/" + path.relative(dataDir, source);
                            };
                            addRoute = actions.addRoute, createData = actions.createData;
                            guides = guideContents.guides, guideTags = guideContents.guideTags, guideCategories = guideContents.guideCategories;
                            guideItemsToMetadata = {};
                            guides.map(function (guide) {
                                guideItemsToMetadata[guide.id] = guide.metadata;
                            });
                            routeBasePath = options.routeBasePath;
                            _b = context.siteConfig.baseUrl, baseUrl = _b === void 0 ? '' : _b;
                            basePageUrl = utils_1.normalizeUrl([baseUrl, routeBasePath]);
                            //
                            // Guides
                            //
                            addRoute({
                                path: basePageUrl,
                                component: guideListComponent,
                                exact: true,
                                modules: {
                                    items: guides.filter(function (guide) { return guide.metadata.categories.length <= 2; }).map(function (guide) {
                                        var metadata = guide.metadata;
                                        // To tell routes.js this is an import and not a nested object to recurse.
                                        return {
                                            content: {
                                                __import: true,
                                                path: metadata.source,
                                                query: {
                                                    truncated: true
                                                }
                                            }
                                        };
                                    })
                                }
                            });
                            tagsPath = utils_1.normalizeUrl([basePageUrl, 'tags']);
                            tagsModule = {};
                            return [4 /*yield*/, Promise.all(Object.keys(guideTags).map(function (tag) { return __awaiter(_this, void 0, void 0, function () {
                                    var _a, name, items, permalink, tagsMetadataPath;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                _a = guideTags[tag], name = _a.name, items = _a.items, permalink = _a.permalink;
                                                tagsModule[tag] = {
                                                    allTagsPath: tagsPath,
                                                    slug: tag,
                                                    name: name,
                                                    count: items.length,
                                                    permalink: permalink
                                                };
                                                return [4 /*yield*/, createData(utils_1.docuHash(permalink) + ".json", JSON.stringify(tagsModule[tag], null, 2))];
                                            case 1:
                                                tagsMetadataPath = _b.sent();
                                                addRoute({
                                                    path: permalink,
                                                    component: guideTagComponent,
                                                    exact: true,
                                                    modules: {
                                                        items: items.map(function (guideID) {
                                                            var metadata = guideItemsToMetadata[guideID];
                                                            return {
                                                                content: {
                                                                    __import: true,
                                                                    path: metadata.source,
                                                                    query: {
                                                                        truncated: true
                                                                    }
                                                                }
                                                            };
                                                        }),
                                                        metadata: aliasedSource(tagsMetadataPath)
                                                    }
                                                });
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }))];
                        case 1:
                            _c.sent();
                            return [4 /*yield*/, createData(utils_1.docuHash(tagsPath + "-tags") + ".json", JSON.stringify(tagsModule, null, 2))];
                        case 2:
                            tagsListPath = _c.sent();
                            addRoute({
                                path: tagsPath,
                                component: guideTagListComponent,
                                exact: true,
                                modules: {
                                    tags: aliasedSource(tagsListPath)
                                }
                            });
                            if (!(guideCategories.length > 0)) return [3 /*break*/, 4];
                            guidePermalinks_1 = lodash_1.uniq(guides.map(function (guide) { return guide.metadata.permalink; }));
                            return [4 /*yield*/, Promise.all(guideCategories.
                                    filter(function (category) { return !guidePermalinks_1.includes(category.permalink); }).
                                    map(function (category) { return __awaiter(_this, void 0, void 0, function () {
                                    var permalink, metadata, categoryMetadataPath;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                permalink = category.permalink;
                                                metadata = { category: category };
                                                return [4 /*yield*/, createData(utils_1.docuHash(permalink) + ".json", JSON.stringify(metadata, null, 2))];
                                            case 1:
                                                categoryMetadataPath = _a.sent();
                                                addRoute({
                                                    path: permalink,
                                                    component: guideCategoryComponent,
                                                    exact: true,
                                                    modules: {
                                                        items: guides.
                                                            filter(function (guide) { return guide.metadata.categories.map(function (category) { return category.permalink; }).includes(category.permalink); }).
                                                            map(function (guide) {
                                                            var metadata = guideItemsToMetadata[guide.id];
                                                            // To tell routes.js this is an import and not a nested object to recurse.
                                                            return {
                                                                content: {
                                                                    __import: true,
                                                                    path: metadata.source,
                                                                    query: {
                                                                        truncated: true
                                                                    }
                                                                }
                                                            };
                                                        }),
                                                        metadata: aliasedSource(categoryMetadataPath)
                                                    }
                                                });
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }))];
                        case 3:
                            _c.sent();
                            _c.label = 4;
                        case 4: 
                        //
                        // Guides
                        //
                        return [4 /*yield*/, Promise.all(guides.map(function (guide) { return __awaiter(_this, void 0, void 0, function () {
                                var metadata;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            metadata = guide.metadata;
                                            return [4 /*yield*/, createData(
                                                // Note that this created data path must be in sync with
                                                // metadataPath provided to mdx-loader.
                                                utils_1.docuHash(metadata.source) + ".json", JSON.stringify(metadata, null, 2))];
                                        case 1:
                                            _a.sent();
                                            addRoute({
                                                path: metadata.permalink,
                                                component: guideComponent,
                                                exact: true,
                                                modules: {
                                                    content: metadata.source
                                                }
                                            });
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                        case 5:
                            //
                            // Guides
                            //
                            _c.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        configureWebpack: function (_config, isServer, _a) {
            var getBabelLoader = _a.getBabelLoader, getCacheLoader = _a.getCacheLoader;
            var rehypePlugins = options.rehypePlugins, remarkPlugins = options.remarkPlugins, truncateMarker = options.truncateMarker;
            return {
                resolve: {
                    alias: {
                        '~guide': dataDir
                    }
                },
                module: {
                    rules: [
                        {
                            test: /(\.mdx?)$/,
                            include: [contentPath],
                            use: [
                                getCacheLoader(isServer),
                                getBabelLoader(isServer),
                                {
                                    loader: '@docusaurus/mdx-loader',
                                    options: {
                                        remarkPlugins: remarkPlugins,
                                        rehypePlugins: rehypePlugins,
                                        // Note that metadataPath must be the same/in-sync as
                                        // the path from createData for each MDX.
                                        metadataPath: function (mdxPath) {
                                            var aliasedSource = utils_1.aliasedSitePath(mdxPath, siteDir);
                                            return path.join(dataDir, 'default/', utils_1.docuHash(aliasedSource) + ".json");
                                        }
                                    }
                                },
                                {
                                    loader: path.resolve(__dirname, './markdownLoader.js'),
                                    options: {
                                        siteDir: siteDir,
                                        contentPath: contentPath,
                                        truncateMarker: truncateMarker,
                                        guides: guides
                                    }
                                },
                            ].filter(Boolean)
                        },
                    ]
                }
            };
        },
        injectHtmlTags: function () {
            return {};
        }
    };
}
exports["default"] = pluginContentGuide;
