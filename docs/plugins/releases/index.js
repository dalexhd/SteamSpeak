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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var utils_1 = require("@docusaurus/utils");
var releaseUtils_1 = require("./releaseUtils");
var DEFAULT_OPTIONS = {
    path: 'releases',
    routeBasePath: 'releases',
    include: ['*.md', '*.mdx'],
    releaseComponent: '@theme/ReleasePage',
    releaseDownloadComponent: '@theme/ReleaseDownloadPage',
    remarkPlugins: [],
    rehypePlugins: [],
    truncateMarker: /<!--\s*(truncate)\s*-->/
};
function pluginContentRelease(context, opts) {
    var options = __assign(__assign({}, DEFAULT_OPTIONS), opts);
    var siteDir = context.siteDir, generatedFilesDir = context.generatedFilesDir;
    var contentPath = path_1["default"].resolve(siteDir, options.path);
    var dataDir = path_1["default"].join(generatedFilesDir, 'releases');
    var releases = [];
    return {
        name: 'releases',
        getPathsToWatch: function () {
            var _a = options.include, include = _a === void 0 ? [] : _a;
            var releasesGlobPattern = include.map(function (pattern) { return contentPath + "/" + pattern; });
            return __spreadArrays(releasesGlobPattern);
        },
        loadContent: function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, releaseUtils_1.generateReleases(contentPath, context, options)];
                        case 1:
                            //
                            // Releases
                            //
                            releases = _a.sent();
                            // Colocate next and prev metadata.
                            releases.forEach(function (release, index) {
                                var prevItem = index > 0 ? releases[index - 1] : null;
                                if (prevItem) {
                                    release.metadata.prevItem = {
                                        title: prevItem.metadata.title,
                                        permalink: prevItem.metadata.permalink
                                    };
                                }
                                var nextItem = index < releases.length - 1 ? releases[index + 1] : null;
                                if (nextItem) {
                                    release.metadata.nextItem = {
                                        title: nextItem.metadata.title,
                                        permalink: nextItem.metadata.permalink
                                    };
                                }
                            });
                            //
                            // Return
                            //
                            return [2 /*return*/, {
                                    releases: releases
                                }];
                    }
                });
            });
        },
        contentLoaded: function (_a) {
            var releaseContents = _a.content, actions = _a.actions;
            return __awaiter(this, void 0, void 0, function () {
                var releaseComponent, releaseDownloadComponent, addRoute, createData, releases;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!releaseContents) {
                                return [2 /*return*/];
                            }
                            releaseComponent = options.releaseComponent, releaseDownloadComponent = options.releaseDownloadComponent;
                            addRoute = actions.addRoute, createData = actions.createData;
                            releases = releaseContents.releases;
                            //
                            // Release pages
                            //
                            return [4 /*yield*/, Promise.all(releases.map(function (release) { return __awaiter(_this, void 0, void 0, function () {
                                    var metadata, downloadPath;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                metadata = release.metadata;
                                                return [4 /*yield*/, createData(
                                                    // Note that this created data path must be in sync with
                                                    // metadataPath provided to mdx-loader.
                                                    utils_1.docuHash(metadata.source) + ".json", JSON.stringify(metadata, null, 2))];
                                            case 1:
                                                _a.sent();
                                                addRoute({
                                                    path: metadata.permalink,
                                                    component: releaseComponent,
                                                    exact: true,
                                                    modules: {
                                                        content: metadata.source
                                                    }
                                                });
                                                downloadPath = utils_1.normalizeUrl([metadata.permalink, 'download']);
                                                addRoute({
                                                    path: downloadPath,
                                                    component: releaseDownloadComponent,
                                                    exact: true,
                                                    modules: {
                                                        content: metadata.source
                                                    }
                                                });
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }))];
                        case 1:
                            //
                            // Release pages
                            //
                            _b.sent();
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
                        '~release': dataDir
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
                                            return path_1["default"].join(dataDir, 'default/', utils_1.docuHash(aliasedSource) + ".json");
                                        }
                                    }
                                },
                                {
                                    loader: path_1["default"].resolve(__dirname, './markdownLoader.js'),
                                    options: {
                                        siteDir: siteDir,
                                        contentPath: contentPath,
                                        truncateMarker: truncateMarker,
                                        releases: releases
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
exports["default"] = pluginContentRelease;
