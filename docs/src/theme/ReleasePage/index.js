import React from 'react';

import Alert from '@site/src/components/Alert';
import CTA from '@site/src/components/CTA';
import DownloadDiagram from '@site/src/components/DownloadDiagram';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import MDXComponents from '@theme/MDXComponents';
import { MDXProvider } from '@mdx-js/react';
import PagePaginator from '@theme/PagePaginator';
import TimeAgo from 'timeago-react';

import classnames from 'classnames';
import dateFormat from 'dateformat';
import pluralize from 'pluralize';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import _ from 'lodash';
import useBaseUrl from '@docusaurus/useBaseUrl';

/* eslint-disable jsx-a11y/control-has-associated-label */
function Headings({ headings, isChild }) {
  if (!headings.length) return null;

  // We need to track shown headings because the markdown parser will
  // extract duplicate headings if we're using tabs
  const uniqHeadings = _.uniqBy(headings, (heading) => heading.value);

  return (
    <ul className={isChild ? '' : 'contents'}>
      {!isChild && (
        <li>
          <a
            href="#overview"
            // eslint-disable-next-line no-undef
            className={LINK_CLASS_NAME}
          >
            Overview
          </a>
        </li>
      )}
      {uniqHeadings.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            // eslint-disable-next-line no-undef
            className={LINK_CLASS_NAME}
          >
            {heading.value}
          </a>
          <Headings isChild headings={heading.children} />
        </li>
      ))}
    </ul>
  );
}

function ReleasePage(props) {
  //
  // Props
  //

  const { content: ReleaseContents } = props;
  const { frontMatter, metadata } = ReleaseContents;
  const { codename, title } = frontMatter;
  const { date: dateString, description, version } = metadata;
  const date = new Date(Date.parse(dateString));
  const formattedDate = dateFormat(date, 'mmm dS, yyyy');

  //
  // Context
  //

  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  const {
    metadata: { latest_release: latestRelease, releases }
  } = siteConfig.customFields;

  //
  // Vars
  //

  const release = releases[version];
  const latest = latestRelease.version !== release.version;
  const warnings = [];

  if (latest) {
    warnings.push(
      <li>
        This is an outdated version. Outdated versions maybe contain bugs. It is
        recommended to use the{' '}
        <Link to={latestRelease.permalink}>
          latest version ({latestRelease.version})
        </Link>
        .
      </li>
    );
  }

  const enhancements = release.commits.filter(
    (commit) => commit.type === 'enhancement'
  );
  const features = release.commits.filter((commit) => commit.type === 'feat');
  const fixes = release.commits.filter((commit) => commit.type === 'fix');

  //
  // Render
  //

  return (
    <Layout title={title} description={description}>
      <main>
        <header className="hero hero--clean hero--flush">
          <div className="container">
            <DownloadDiagram />
            <h1>{title}</h1>
            <div className="hero--subtitle">{codename}</div>
            <div className="hero--subsubtitle">
              {formattedDate} /{' '}
              <TimeAgo
                pubdate="pubdate"
                title={formattedDate}
                datetime={date}
              />
            </div>
            <div className="hero--buttons margin-vert--md">
              <Link
                to={useBaseUrl(`/releases/${version}/download/`)}
                className="button button--highlight"
              >
                <i className="feather icon-download" /> Download
              </Link>
            </div>
            <div className="hero--toc">
              <ul>
                {release.highlights.length > 0 && (
                  <li>
                    <a href="#highlights">
                      {pluralize('highlight', release.highlights.length, true)}
                    </a>
                  </li>
                )}
                {features.length > 0 && (
                  <li>
                    <a href="#feat">
                      {pluralize('new feature', features.length, true)}
                    </a>
                  </li>
                )}
                {enhancements.length > 0 && (
                  <li>
                    <a href="#enhancement">
                      {pluralize('enhancement', enhancements.length, true)}
                    </a>
                  </li>
                )}
                {fixes.length > 0 && (
                  <li>
                    <a href="#fix">
                      {pluralize('bug fix', fixes.length, true)}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </header>
        <div className={classnames('container', 'container--xs')}>
          <article>
            {warnings.length > 0 && (
              <Alert
                icon={false}
                fill
                type="warning"
                className="list--icons list--icons--warnings margin-bottom--lg"
              >
                <ul>{warnings}</ul>
              </Alert>
            )}
            <section className="markdown">
              <MDXProvider components={MDXComponents}>
                <ReleaseContents />
              </MDXProvider>
            </section>
            <section>
              <h2>Like What You See?</h2>

              <CTA />
            </section>
          </article>
          {(metadata.nextItem || metadata.prevItem) && (
            <div className="margin-bottom--lg">
              <PagePaginator
                next={metadata.nextItem}
                previous={metadata.prevItem}
              />
            </div>
          )}
        </div>
      </main>
      <nav className="pagination-controls">
        {metadata.prevItem && (
          <Link to={metadata.prevItem.permalink} className="prev">
            <i className="feather icon-chevron-left" />
          </Link>
        )}
        {metadata.nextItem && (
          <Link to={metadata.nextItem.permalink} className="next">
            <i className="feather icon-chevron-right" />
          </Link>
        )}
      </nav>
    </Layout>
  );
}

export default ReleasePage;
