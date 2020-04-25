// const _ = require('lodash');

// const { getFiles } = require('../packages/server/utils/files');

// const plugins = {};
// getFiles(`../packages/server/core/TeamSpeak/plugins`, true).then(
//   (_instances) => {
//     const instances = Object.assign({}, ..._instances);
//     for (const instance in instances) {
//       if (instances.hasOwnProperty(instance)) {
//         const _plugins = instances[instance];
//         _plugins.forEach((_plugin) => {
//           // eslint-disable-next-line import/no-dynamic-require
//           const plugin = require(_plugin);
//           plugin.info.instance = instance;
//           plugin.info.features = [];
//           plugin.info.name = _.kebabCase(plugin.info.name);
//           plugin.info.operating_systems = ['Linux', 'MacOS', 'Windows'];
//           plugin.info.status = 'prod-ready';
//           plugin.info.title = _.startCase(plugin.info.name);
//           plugin.info.type = 'plugin';
//           plugin.info.unsupported_operating_systems = [];
//           plugins[_.camelCase(plugin.info.name)] = plugin.info;
//         });
//       }
//     }
//   }
// );
// setTimeout(() => {
//   console.log(plugins);
// }, 2000);
module.exports = {
  plugins: {
    hostMessage: {
      name: 'host-message',
      description:
        'This plugin allows you to change default host message with useful server information.',
      instance: 'first-instance',
      features: [],
      operating_systems: ['Linux', 'MacOS', 'Windows'],
      status: 'prod-ready',
      title: 'Host Message',
      type: 'plugin',
      unsupported_operating_systems: []
    },
    multiFunction: {
      name: 'multi-function',
      description:
        'This plugin allows you to display relevant server information on the configured channels.',
      instance: 'first-instance',
      features: [],
      operating_systems: ['Linux', 'MacOS', 'Windows'],
      status: 'prod-ready',
      title: 'Multi Function',
      type: 'plugin',
      unsupported_operating_systems: []
    },
    afkMove: {
      name: 'afk-move',
      description:
        'This plugin allows you to automatically move afk people after x time to your desired channel.',
      instance: 'second-instance',
      features: [],
      operating_systems: ['Linux', 'MacOS', 'Windows'],
      status: 'prod-ready',
      title: 'Afk Move',
      type: 'plugin',
      unsupported_operating_systems: []
    },
    afkKick: {
      name: 'afk-kick',
      description:
        'This plugin allows you to automatically kick afk people after x time.',
      instance: 'second-instance',
      features: [],
      operating_systems: ['Linux', 'MacOS', 'Windows'],
      status: 'prod-ready',
      title: 'Afk Kick',
      type: 'plugin',
      unsupported_operating_systems: []
    },
    changeChannel: {
      name: 'change-channel',
      description:
        'This plugin allows you to change multiple channels name at diferent interval.',
      instance: 'second-instance',
      features: [],
      operating_systems: ['Linux', 'MacOS', 'Windows'],
      status: 'prod-ready',
      title: 'Change Channel',
      type: 'plugin',
      unsupported_operating_systems: []
    },
    serverName: {
      name: 'server-name',
      description:
        'This plugin allows you to provide useful information to your server clients by changing the server name.',
      instance: 'second-instance',
      features: [],
      operating_systems: ['Linux', 'MacOS', 'Windows'],
      status: 'prod-ready',
      title: 'Server Name',
      type: 'plugin',
      unsupported_operating_systems: []
    }
  },
  team: [
    {
      avatar: 'https://github.com/dalexhd.png',
      bio:
        '"Programming is not just for coding, it also changes your way of thinking when tackling problems or challenges in your life"',
      github: 'https://github.com/dalexhd',
      id: 'dalexhd',
      blog: 'www.linkedin.com/in/alex-borbolla',
      name: 'Alex'
    }
  ],
  latest_release: {
    version: '0.5.0'
  },
  releases: {
    '0.0.1': {
      compare_url:
        'https://github.com/dalexhd/steamspeak/compare/v0.0.0...v0.0.1',
      date: '2020-03-06',
      description: '',
      highlights: [],
      commits: [],
      permalink: '/releases/0.0.1/',
      title: 'SteamSpeak v0.0.1',
      type: 'initial dev',
      version: '0.0.1',
      whats_next: []
    },
    '0.0.2': {
      compare_url:
        'https://github.com/dalexhd/steamspeak/compare/v0.0.1...v0.0.2',
      date: '2020-03-06',
      description: '',
      highlights: [],
      commits: [],
      permalink: '/releases/0.0.2/',
      title: 'SteamSpeak v0.0.2',
      type: 'initial dev',
      version: '0.0.2',
      whats_next: []
    },
    '0.0.3': {
      compare_url:
        'https://github.com/dalexhd/steamspeak/compare/v0.0.2...v0.0.3',
      date: '2020-03-08',
      description: '',
      highlights: [],
      commits: [],
      permalink: '/releases/0.0.3/',
      title: 'SteamSpeak v0.0.3',
      type: 'initial dev',
      version: '0.0.3',
      whats_next: []
    },
    '0.0.4': {
      compare_url:
        'https://github.com/dalexhd/steamspeak/compare/v0.0.3...v0.0.4',
      date: '2020-03-08',
      description: '',
      highlights: [],
      commits: [],
      permalink: '/releases/0.0.4/',
      title: 'SteamSpeak v0.0.4',
      type: 'initial dev',
      version: '0.0.4',
      whats_next: []
    },
    '0.0.5': {
      compare_url:
        'https://github.com/dalexhd/steamspeak/compare/v0.0.4...v0.0.5',
      date: '2020-03-08',
      description: '',
      highlights: [],
      commits: [],
      permalink: '/releases/0.0.5/',
      title: 'SteamSpeak v0.0.5',
      type: 'initial dev',
      version: '0.0.5',
      whats_next: []
    },
    '0.0.6': {
      compare_url:
        'https://github.com/dalexhd/steamspeak/compare/v0.0.5...v0.0.6',
      date: '2020-03-23',
      description: '',
      highlights: [],
      commits: [],
      permalink: '/releases/0.0.6/',
      title: 'SteamSpeak v0.0.6',
      type: 'initial dev',
      version: '0.0.6',
      whats_next: []
    },
    '0.0.7': {
      compare_url:
        'https://github.com/dalexhd/steamspeak/compare/v0.0.6...v0.0.7',
      date: '2020-03-27',
      description: '',
      highlights: [],
      commits: [],
      permalink: '/releases/0.0.7/',
      title: 'SteamSpeak v0.0.7',
      type: 'initial dev',
      version: '0.0.7',
      whats_next: []
    },
    '0.0.8': {
      compare_url:
        'https://github.com/dalexhd/steamspeak/compare/v0.0.7...v0.0.8',
      date: '2020-04-03',
      description: '',
      highlights: [],
      commits: [],
      permalink: '/releases/0.0.8/',
      title: 'SteamSpeak v0.0.8',
      type: 'initial dev',
      version: '0.0.8',
      whats_next: []
    },
    '0.1.0': {
      compare_url:
        'https://github.com/dalexhd/steamspeak/compare/v0.0.8...v0.1.0',
      date: '2020-04-05',
      description: '',
      highlights: [],
      commits: [],
      permalink: '/releases/0.1.0/',
      title: 'SteamSpeak v0.1.0',
      type: 'initial dev',
      version: '0.1.0',
      whats_next: []
    },
    '0.1.1': {
      compare_url:
        'https://github.com/dalexhd/steamspeak/compare/v0.1.1...v0.1.1',
      date: '2020-04-06',
      description: '',
      highlights: [],
      commits: [],
      permalink: '/releases/0.1.1/',
      title: 'SteamSpeak v0.1.1',
      type: 'initial dev',
      version: '0.1.1',
      whats_next: []
    },
    '0.2.0': {
      compare_url:
        'https://github.com/dalexhd/steamspeak/compare/v0.1.1...v0.2.0',
      date: '2020-04-15',
      description: '',
      highlights: [],
      commits: [],
      permalink: '/releases/0.2.0/',
      title: 'SteamSpeak v0.2.0',
      type: 'initial dev',
      version: '0.2.0',
      whats_next: []
    },
    '0.3.0': {
      compare_url:
        'https://github.com/dalexhd/steamspeak/compare/v0.2.0...v0.3.0',
      date: '2020-04-18',
      description: '',
      highlights: [],
      commits: [],
      permalink: '/releases/0.3.0/',
      title: 'SteamSpeak v0.3.0',
      type: 'initial dev',
      version: '0.3.0',
      whats_next: []
    },
    '0.3.1': {
      compare_url:
        'https://github.com/dalexhd/steamspeak/compare/v0.3.0...v0.3.1',
      date: '2020-04-19',
      description: '',
      highlights: [],
      commits: [],
      permalink: '/releases/0.3.1/',
      title: 'SteamSpeak v0.3.1',
      type: 'initial dev',
      version: '0.3.1',
      whats_next: []
    },
    '0.4.0': {
      codename: 'Platform Mingling',
      compare_url:
        'https://github.com/dalexhd/steamspeak/compare/v0.3.1...v0.4.0',
      date: '2020-04-20',
      description: '',
      highlights: [],
      commits: [],
      last_version: '0.3.0',
      permalink: '/releases/0.4.0/',
      title: 'SteamSpeak v0.4.0',
      type: 'initial dev',
      version: '0.4.0',
      whats_next: []
    },
    '0.5.0': {
      codename: 'Platform Mingling',
      compare_url:
        'https://github.com/dalexhd/steamspeak/compare/v0.4.0...v0.5.0',
      date: '2020-04-25',
      description: '',
      highlights: [],
      commits: [],
      permalink: '/releases/0.5.0/',
      title: 'SteamSpeak v0.5.0',
      type: 'initial dev',
      version: '0.5.0',
      whats_next: []
    }
  },
  installation: {
    downloads: {
      zip: {
        package_manager: 'zup',
        available_on_latest: true,
        available_on_nightly: true,
        file_type: 'zip',
        os: 'All Platforms',
        type: 'archive'
      },
      'tar.gz': {
        package_manager: 'tar.gz',
        available_on_latest: true,
        available_on_nightly: true,
        file_type: 'tar.gz',
        os: 'All Platforms',
        type: 'archive'
      }
    },
    operating_systems: {},
    package_managers: {},
    platforms: {}
  }
};
