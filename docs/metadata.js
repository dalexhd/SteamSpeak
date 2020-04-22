module.exports = {
  "plugins": {
    "serverName": {
      "beta": false,
      "config_examples": {
        "toml": "[sources.in]\n  type = \"docker\" # required"
      },
      "delivery_guarantee": "best_effort",
      "description": "Elit nulla veniam est ea pariatur exercitation quis occaecat.",
      "instance": "first-instance",
      "features": [
        "Collect Docker container logs.",
        "Filter which containers you collect them from.",
        "Automatically merge logs that Docker splits.",
        "Enrich your logs with useful Docker context."
      ],
      "id": "docker_source",
      "logo_path": "/img/logos/docker.svg",
      "name": "server-name",
      "noun": "Server Name",
      "operating_systems": [
        "Linux",
        "MacOS",
        "Windows"
      ],
      "output_types": [
        "log"
      ],
      "service_providers": [

      ],
      "short_description": "Ingests data through the Docker engine daemon and outputs log events.",
      "status": "prod-ready",
      "through_description": "the Docker engine daemon",
      "title": "Server Name",
      "type": "plugin",
      "unsupported_operating_systems": [

      ]
    }
  },
  "team": [
    {
      "avatar": "https://github.com/dalexhd.png",
      "bio": "\"Programming is not just for coding, it also changes your way of thinking when tackling problems or challenges in your life\"",
      "github": "https://github.com/dalexhd",
      "id": "dalexhd",
      "blog": "www.linkedin.com/in/alex-borbolla",
      "name": "Alex"
    }
  ],
  "latest_release": {
    "version": "0.4.0"
  },
  "releases": {
    "0.0.3": {
      "compare_url": "https://github.com/dalexhd/steamspeak/compare/v0.0.0...v0.4.1",
      "date": "2019-10-10",
      "deletions_count": 3038,
      "description": "",
      "highlights": [
      ],
      "commits": [],
      "insertions_count": 6839,
      "last_version": "0.3.0",
      "permalink": "/releases/0.0.3/",
      "title": "SteamSpeak v0.0.3",
      "type": "initial dev",
      "type_url": "https://semver.org/#spec-item-4",
      "version": "0.0.3",
      "whats_next": [

      ]
    },
    "0.4.0": {
      "codename": "Platform Mingling",
      "compare_url": "https://github.com/dalexhd/steamspeak/compare/v0.0.3...v0.4.0",
      "date": "2019-10-10",
      "deletions_count": 3038,
      "description": "",
      "highlights": [],
      "commits": [],
      "insertions_count": 6839,
      "last_version": "0.3.0",
      "permalink": "/releases/0.4.0/",
      "title": "SteamSpeak v0.4.0",
      "type": "initial dev",
      "type_url": "https://semver.org/#spec-item-4",
      "version": "0.4.0",
      "whats_next": []
    },
  },
  "installation": {
    "downloads": {
      "zip": {
        "package_manager": "zup",
        "available_on_latest": true,
        "available_on_nightly": true,
        "file_type": "zip",
        "os": "All Platforms",
        "type": "archive"
      },
      "tar.gz": {
        "package_manager": "tar.gz",
        "available_on_latest": true,
        "available_on_nightly": true,
        "file_type": "tar.gz",
        "os": "All Platforms",
        "type": "archive"
      }
    },
    "operating_systems": {},
    "package_managers": {},
    "platforms": {}
  },
};
