import React from 'react';

import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import PagePaginator from '@theme/PagePaginator';

import _ from 'lodash';
import classnames from 'classnames';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useTOCHighlight from '@theme/hooks/useTOCHighlight';
import styles from './styles.module.css';

const LINK_CLASS_NAME = 'contents__link';
const ACTIVE_LINK_CLASS_NAME = 'contents__link--active';
const TOP_OFFSET = 100;

function Headings({ headings, isChild }) {
  useTOCHighlight(LINK_CLASS_NAME, ACTIVE_LINK_CLASS_NAME, TOP_OFFSET);

  if (!headings.length) return null;

  // We need to track shown headings because the markdown parser will
  // extract duplicate headings if we're using tabs
  const uniqHeadings = _.uniqBy(headings, (heading) => heading.value);

  return (
    <ul className={isChild ? '' : 'contents'}>
      {uniqHeadings.map((heading) => {
        const cleanValue = heading.value
          .replace('<code><', '<code>&lt;')
          .replace('></code>', '&gt;</code>');

        return (
          <li key={heading.id}>
            <a href={`#${heading.id}`} className={LINK_CLASS_NAME}>
              {cleanValue}
            </a>
            <Headings isChild headings={heading.children} />
          </li>
        );
      })}
    </ul>
  );
}

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
            to={useBaseUrl('/docs/reference/plugins/')}
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

function DocItem(props) {
  const { siteConfig = {} } = useDocusaurusContext();
  const { title: siteTitle, url: siteUrl } = siteConfig;
  const { content: DocContent } = props;
  const { metadata } = DocContent;

  const {
    description,
    editUrl,
    image: metaImage,
    keywords,
    lastUpdatedAt,
    lastUpdatedBy,
    permalink,
    title,
    version
  } = metadata;
  const {
    frontMatter: {
      delivery_guarantee: deliveryGuarantee,
      instance,
      issues_url: issuesUrl,
      operating_systems: operatingSystems,
      posts_path: postsPath,
      source_url: sourceUrl,
      status,
      unsupported_operating_systems: unsupportedOperatingSystems
    }
  } = DocContent;

  const metaImageUrl = siteUrl + useBaseUrl(metaImage);
  return (
    <div>
      <Head>
        {title && (
          <title>
            {title} | Docs | {siteTitle}
          </title>
        )}
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
      </Head>
      <div className={styles.container}>
        <div className={styles.leftCol}>
          <div className="docItemContainer_">
            <article>
              {version && (
                <span
                  style={{ verticalAlign: 'top', }}
                  className="badge badge--info"
                >
                  Version: {version}
                </span>
              )}

              {!metadata.hide_title && (
                <header>
                  <h1 className={styles.docTitle}>{metadata.title}</h1>
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
        {DocContent.rightToc && (
          <div className={styles.rightCol}>
            <div
              className={classnames(
                'table-of-contents',
                styles.tableOfContents
              )}
            >
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
                  <Headings headings={DocContent.rightToc} />
                </div>
              )}
              <div className="section">
                <div className="title">Resources</div>
                <ul className="contents">
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
                        <i className="feather icon-book-open" /> View Blog Posts
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
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DocItem;
