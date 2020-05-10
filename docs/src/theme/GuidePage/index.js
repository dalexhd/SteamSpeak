import React, { useState } from 'react';

import Alert from '@site/src/components/Alert';
import Avatar from '@site/src/components/Avatar';
import CodeBlock from '@theme/CodeBlock';
import Heading from '@theme/Heading';
import InstallationCommand from '@site/src/components/InstallationCommand';
import Jump from '@site/src/components/Jump';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Modal from 'react-modal';
import MDXComponents from '@theme/MDXComponents';
import { MDXProvider } from '@mdx-js/react';
import PagePaginator from '@theme/PagePaginator';
import SVG from 'react-inlinesvg';
import Tags from '@site/src/components/Tags';
import useBaseUrl from '@docusaurus/useBaseUrl';

import _ from 'lodash';
import classnames from 'classnames';
import dateFormat from 'dateformat';
import { enrichTags } from '@site/src/exports/tags';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useTOCHighlight from '@theme/hooks/useTOCHighlight';
import styles from './styles.module.css';

Modal.setAppElement('#__docusaurus');

const AnchoredH2 = Heading('h2');
const AnchoredH3 = Heading('h3');

const LINK_CLASS_NAME = 'contents__link';
const ACTIVE_LINK_CLASS_NAME = 'contents__link--active';
const TOP_OFFSET = 100;

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
          <a href="#overview" className={LINK_CLASS_NAME}>
            Overview
          </a>
        </li>
      )}
      {uniqHeadings.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            className={LINK_CLASS_NAME}
            dangerouslySetInnerHTML={{ __html: heading.value }}
          />
          <Headings isChild headings={heading.children} />
        </li>
      ))}
    </ul>
  );
}

function GuidePage(props) {
  //
  // Props
  //

  const { content: GuideContents } = props;
  const { frontMatter, metadata } = GuideContents;
  const {
    author_github: authorGithub,
    id,
    title
  } = frontMatter;
  const {
    categories,
    readingTime,
    tags,
    lastUpdatedAt,
    lastUpdatedBy
  } = metadata;
  const { assumptions } = frontMatter;

  //
  // Site config
  //

  const { siteConfig } = useDocusaurusContext();
  const {
    metadata: { installation }
  } = siteConfig.customFields;
  const { platforms, services } = installation;

  //
  // Variables
  //
  const enrichedTags = enrichTags(tags, 'guides');
  const domainTag = enrichedTags.find((tag) => tag.category === 'domain');
  const domainBG = domainTag ? domainTag.value : 'default';
  const lastModified = Date.parse(lastUpdatedAt);
  const serviceTag = enrichedTags.find((tag) => tag.category === 'service');
  const serviceName = serviceTag ? _.toLower(serviceTag.value) : null;
  const service = serviceName && services[serviceName];
  //
  // Render
  //

  useTOCHighlight(LINK_CLASS_NAME, ACTIVE_LINK_CLASS_NAME, TOP_OFFSET);

  return (
    <Layout title={title} description={`${title}, in minutes, for free`}>
      <header className={`hero domain-bg domain-bg--${domainBG}`}>
        <div className="container">
          {service && (
            <div className="component-icons">
              {service && (
                <div className="icon panel">
                  {service.logo_path ? (
                    <SVG
                      src={useBaseUrl(service.logo_path)}
                      alt={`${service.title} Logo`}
                    />
                  ) : (
                    <i className="feather icon-server" />
                  )}
                </div>
              )}
            </div>
          )}
          {!service && (
            <div className="hero--category">
              <Link to={`${categories[0].permalink}/`}>
                {categories[0].name}
              </Link>
            </div>
          )}
          <h1 className={styles.header}>{title}</h1>
          <div className="hero--subtitle">{frontMatter.description}</div>
          <Tags colorProfile="guides" tags={tags} />
        </div>
      </header>
      <main
        className={classnames('container', 'container--l', styles.container)}
      >
        <aside className={styles.sidebar}>
          <section className={styles.avatar}>
            <Avatar
              bio
              github={authorGithub}
              size="lg"
              rel="author"
              subTitle={false}
              vertical
            />
          </section>
          <section
            className={classnames('table-of-contents', styles.tableOfContents)}
          >
            <div className="section">
              <div className="title">Stats</div>

              <div className="text--secondary text--bold">
                <i className="feather icon-book" /> {readingTime}
              </div>
              <div className="text--secondary text--bold">
                <i className="feather icon-clock" /> Updated{' '}
                <time pubdate="pubdate" dateTime={lastUpdatedAt}>
                  {dateFormat(lastModified, 'mmm dS, yyyy')}
                </time>{' '}
                {lastUpdatedBy && (
                  <>
                    by <strong>{lastUpdatedBy}</strong>
                  </>
                )}
              </div>
            </div>
            {GuideContents.rightToc.length > 0 && (
              <div className="section">
                <div className="title">Contents</div>
                <Headings headings={GuideContents.rightToc} />
              </div>
            )}
          </section>
        </aside>
        <div className={styles.article}>
          {assumptions && assumptions.length > 0 && (
            <Alert
              type="info"
              icon={false}
              className="list--icons list--icons--info"
            >
              <p>Before you begin, this guide assumes the following:</p>
              <ul>
                {assumptions.map((assumption, idx) => (
                  <li key={idx}>{assumption}</li>
                ))}
              </ul>
            </Alert>
          )}
          <article>
            <div className="markdown">
              <a
                aria-hidden="true"
                tabIndex="-1"
                className="anchor"
                id="overview"
              />
              <MDXProvider components={MDXComponents}>
                <GuideContents />
              </MDXProvider>
            </div>
          </article>
          {!frontMatter.hide_pagination && (
            <PagePaginator
              previous={metadata.prevItem}
              next={metadata.nextItem}
              className={styles.paginator}
            />
          )}
        </div>
      </main>
    </Layout>
  );
}

export default GuidePage;
