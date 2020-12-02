/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import _ from 'lodash';
import Head from '@docusaurus/Head';
import PagePaginator from '@theme/PagePaginator';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import DocVersionSuggestions from '@theme/DocVersionSuggestions';
import TOC from '@theme/TOC';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import {
  useActivePlugin,
  useVersions,
  useActiveVersion
} from '@theme/hooks/useDocs';
import styles from './styles.module.css';

function DocItem(props) {
  const { siteConfig = {} } = useDocusaurusContext();
  const { url: siteUrl, title: siteTitle } = siteConfig;
  const { content: DocContent } = props;
  const { metadata } = DocContent;
  const {
    description,
    title,
    permalink,
    editUrl,
    lastUpdatedAt,
    lastUpdatedBy
  } = metadata;
  const {
    frontMatter: {
      image: metaImage,
      keywords,
      hide_title: hideTitle,
      hide_table_of_contents: hideTableOfContents,
      instance,
      status,
      delivery_guarantee: deliveryGuarantee,
      issues_url: issuesUrl,
      operating_systems: operatingSystems,
      posts_path: postsPath,
      source_url: sourceUrl,
      unsupported_operating_systems: unsupportedOperatingSystems
    }
  } = DocContent;
  const { pluginId } = useActivePlugin({
    failfast: true
  });
  function Statuses({
    deliveryGuarantee,
    instance,
    operatingSystems,
    status,
    unsupportedOperatingSystems
  }) {
    if (
      !status &&
      !deliveryGuarantee &&
      !operatingSystems &&
      !unsupportedOperatingSystems
    )
      return null;

    return (
      <div className="section">
        <div className="title">Information</div>
        {status === 'beta' && (
          <div>
            <Link
              to="/docs/about/guarantees/#beta"
              className="text--warning"
              title="This plugin is in beta and is not recommended for production environments. Click to learn more."
            >
              <i className="feather icon-alert-triangle" /> Beta Status
            </Link>
          </div>
        )}
        {status === 'prod-ready' && (
          <div>
            <Link
              to={useBaseUrl('/docs/about/what-is-steamspeak')}
              className="text--primary"
              title="This plugin has passed reliability standards that make it production ready. Click to learn more."
            >
              <i className="feather icon-award" /> Prod-Ready Status
            </Link>
          </div>
        )}
        {instance && (
          <div>
            <Link
              to={useBaseUrl('/docs/reference/plugins')}
              title={`This plugin works on ${_.startCase(instance)} instance.`}
            >
              <i className="feather icon-cpu" />{' '}
              <span key={instance} className="text--primary">
                {_.startCase(instance)}
              </span>
            </Link>
          </div>
        )}
      </div>
    );
  }

  const versions = useVersions(pluginId);
  const version = useActiveVersion(pluginId); // If site is not versioned or only one version is included
  // we don't show the version badge
  // See https://github.com/facebook/docusaurus/issues/3362

  const showVersionBadge = versions.length > 1;
  const metaTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaImageUrl = useBaseUrl(metaImage, {
    absolute: true
  });
  return (
    <div>
      <Head>
        <title>{metaTitle}</title>
        <meta property="og:title" content={metaTitle} />
        {description && <meta name="description" content={description} />}
        {description && (
          <meta property="og:description" content={description} />
        )}
        {keywords && keywords.length && (
          <meta name="keywords" content={keywords.join(',')} />
        )}
        {metaImage && <meta property="og:image" content={metaImageUrl} />}
        {metaImage && <meta property="twitter:image" content={metaImageUrl} />}
        {metaImage && (
          <meta name="twitter:image:alt" content={`Image for ${title}`} />
        )}
        {permalink && <meta property="og:url" content={siteUrl + permalink} />}
        {permalink && <link rel="canonical" href={siteUrl + permalink} />}
      </Head>
      <div
        className={clsx('container padding-vert--lg', styles.docItemWrapper)}
      >
        <div className="row">
          <div
            className={clsx('col', {
              [styles.docItemCol]: !hideTableOfContents
            })}
          >
            <DocVersionSuggestions />
            <div className={styles.docItemContainer}>
              <article>
                {showVersionBadge && (
                  <div>
                    <span className="badge badge--secondary">
                      Version: {version.label}
                    </span>
                  </div>
                )}
                {!hideTitle && (
                  <header>
                    <h1 className={styles.docTitle}>{title}</h1>
                  </header>
                )}
                <div className="markdown">
                  <DocContent />
                </div>
              </article>
            </div>
            {!metadata.hide_pagination && (metadata.next || metadata.previous) && (
              <div className={styles.paginator}>
                <PagePaginator
                  next={metadata.next}
                  previous={metadata.previous}
                />
              </div>
            )}
          </div>
          {!hideTableOfContents && DocContent.rightToc && (
            <div className={clsx('table-of-contents', styles.tableOfContents)}>
              <div className={styles.rightCol}>
                <Statuses
                  deliveryGuarantee={deliveryGuarantee}
                  instance={instance}
                  operatingSystems={operatingSystems}
                  status={status}
                  unsupportedOperatingSystems={unsupportedOperatingSystems}
                />
                {DocContent.rightToc.length > 0 && (
                  <div className="section">
                    <div className="title">Contents</div>
                    <TOC headings={DocContent.rightToc} />
                  </div>
                )}
                <div className="section">
                  <div className="title">Resources</div>
                  <ul className="table-of-contents">
                    {editUrl && (
                      <li>
                        <a
                          href={editUrl}
                          className="contents__link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="feather icon-edit-1" /> Edit this page
                        </a>
                      </li>
                    )}
                    {postsPath && (
                      <li>
                        <Link to={postsPath} className="contents__link">
                          <i className="feather icon-book-open" /> View Blog
                          Posts
                        </Link>
                      </li>
                    )}
                    {issuesUrl && (
                      <li>
                        <a
                          href={issuesUrl}
                          className="contents__link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="feather icon-message-circle" /> View
                          Issues
                        </a>
                      </li>
                    )}
                    {sourceUrl && (
                      <li>
                        <a
                          href={sourceUrl}
                          className="contents__link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="feather icon-github" /> View Source
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
                {(lastUpdatedAt || lastUpdatedBy) && (
                  <div className="section">
                    Last updated{' '}
                    {lastUpdatedAt && (
                      <>
                        on{' '}
                        <strong>
                          {new Date(lastUpdatedAt * 1000).toLocaleDateString()}
                        </strong>
                        {lastUpdatedBy && ' '}
                      </>
                    )}
                    {lastUpdatedBy && (
                      <>
                        by <strong>{lastUpdatedBy}</strong>
                      </>
                    )}
                    {process.env.NODE_ENV === 'development' && (
                      <div>
                        <small> (Simulated during dev for better perf)</small>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DocItem;
