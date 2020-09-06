import React, { useState } from 'react';

import Alert from '@site/src/components/Alert';
import DownloadDiagram from '@site/src/components/DownloadDiagram';
import Jump from '@site/src/components/Jump';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Select from 'react-select';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

import classnames from 'classnames';
import groupBy from 'lodash/groupBy';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { viewedNewRelease } from '@site/src/exports/newRelease';
import useBaseUrl from '@docusaurus/useBaseUrl';
import repoUrl from '@site/src/exports/repoUrl';
import styles from './styles.module.css';

function Downloads({ browsePath, downloads }) {
  const groupedDownloads = groupBy(downloads, (download) => {
    return [download.os, download.package_manager];
  });
  return (
    <ul className={styles.downloadFiles}>
      {Object.keys(groupedDownloads)
        .sort()
        .map((key, catIdx) => (
          <li key={catIdx}>
            <span>
              {groupedDownloads[key][0].os}{' '}
              <code>.{groupedDownloads[key][0].file_type}</code>
            </span>
            <ul>
              {groupedDownloads[key].map((download, downloadIdx) => (
                <li key={downloadIdx}>
                  <a
                    key={downloadIdx}
                    href={repoUrl(
                      `/archive/${browsePath}.${download.file_type}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="feather icon-download" /> Download
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      <li>
        <a
          href={repoUrl(`/releases`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          browse all files&hellip;
        </a>
      </li>
    </ul>
  );
}

function DownloadTable({
  browsePath,
  date,
  downloads,
  releaseNotesPath,
  version
}) {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  const {
    metadata: { installation }
  } = siteConfig.customFields;
  const { platforms, operating_systems: operatingSystems } = installation;

  return (
    <div className={styles.downloadTable}>
      <div>
        <div>Version</div>
        <div>
          {version} • {date}
          {releaseNotesPath && (
            <>
              {' '}
              • <Link to={useBaseUrl(releaseNotesPath)}>release notes</Link>
            </>
          )}
        </div>
      </div>
      <div>
        <div>License</div>
        <div>
          <a
            href={repoUrl('/blob/master/LICENSE')}
            target="_blank"
            rel="noopener noreferrer"
          >
            MIT
          </a>
        </div>
      </div>
      <div>
        <div>Downloads</div>
        <div>
          <Downloads downloads={downloads} browsePath={browsePath} />
        </div>
      </div>
      {platforms.length > 0 && (
        <div>
          <div>Platforms</div>
          <div>
            {Object.values(platforms).map((platform, idx) => (
              <span key={idx}>
                {idx > 0 ? ' • ' : ''}
                <Link
                  to={useBaseUrl(
                    `/docs/setup/installation/platforms/${platform.name}`
                  )}
                >
                  {' '}
                  {platform.title}
                </Link>
              </span>
            ))}
          </div>
        </div>
      )}
      {operatingSystems.length > 0 && (
        <div>
          <div>Operating Systems</div>
          <div>
            {Object.values(operatingSystems).map((operatingSystem, idx) => (
              <span key={idx}>
                {idx > 0 ? ' • ' : ''}
                <Link
                  to={`/docs/setup/installation/operating-systems/${operatingSystem.name}/`}
                >
                  {operatingSystem.title}
                </Link>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ReleaseDownload({ version }) {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  const {
    metadata: {
      installation,
      latest_release: latestRelease,
      releases: releasesObj
    }
  } = siteConfig.customFields;
  const { downloads } = installation;

  const latestDownloads = Object.values(downloads).filter(
    (download) => download.available_on_latest
  );
  const nightlyDownloads = Object.values(downloads).filter(
    (download) => download.available_on_nightly
  );
  const nightlyDate = new Date().toISOString().substr(0, 10);

  const releases = Object.values(releasesObj).slice(0);
  releases.reverse();
  const releaseOptions = releases.map((release) => ({
    value: release.version,
    label: `v${release.version} - ${release.date}`
  }));

  viewedNewRelease();

  const [selectedVersion, setVersion] = useState(
    version || latestRelease.version
  );
  const release = releases.find(
    (release) => release.version === selectedVersion
  );

  return (
    <Layout
      title="Download"
      description="Download SteamSpeak for your platform."
    >
      <header className="hero hero--clean hero--flush">
        <div className="container">
          <DownloadDiagram />
          <h1>Download SteamSpeak</h1>
        </div>
      </header>
      <main>
        <section>
          <div
            className={classnames('container', styles.downloadTableContainer)}
          >
            <Tabs
              block
              className="rounded"
              defaultValue={version === 'nightly' ? 'nightly' : 'stable'}
              values={[
                { label: `Stable`, value: 'stable' },
                { label: 'Nightly', value: 'nightly' }
              ]}
            >
              <TabItem value="stable">
                <Select
                  className={classnames(
                    'react-select-container',
                    styles.releaseSelect
                  )}
                  classNamePrefix="react-select"
                  options={releaseOptions}
                  isClearable={false}
                  placeholder="Select a version..."
                  value={releaseOptions.find(
                    (option) => release && option.value === release.version
                  )}
                  onChange={(selectedOption) =>
                    setVersion(selectedOption ? selectedOption.value : null)
                  }
                />
                {release && release.version !== releases[0].version && (
                  <Alert fill type="warning">
                    This is an outdated version. Outdated versions maybe contain
                    bugs. It is recommended to use the latest version. Please
                    proceed with caution.
                  </Alert>
                )}
                {release && (
                  <DownloadTable
                    browsePath={`v${release.version}`}
                    date={release.date}
                    downloads={latestDownloads}
                    releaseNotesPath={`/releases/${release.version}/`}
                    version={release.version}
                  />
                )}
              </TabItem>
              <TabItem value="nightly">
                <Alert fill type="warning">
                  Nightly versions contain bleeding edge changes that may
                  contain bugs. Proceed with caution.
                </Alert>
                <DownloadTable
                  browsePath="master"
                  date={nightlyDate}
                  downloads={nightlyDownloads}
                  version="nightly"
                />
              </TabItem>
            </Tabs>
          </div>
        </section>
        <section>
          <div
            className={classnames(
              'container',
              styles.downloadGetStartedContainer
            )}
          >
            <h2>Ready to get started?</h2>
            <Jump to={useBaseUrl('/docs/setup/installation')}>
              <i className="feather icon-book-open" /> Follow the installation
              guide
            </Jump>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default ReleaseDownload;
