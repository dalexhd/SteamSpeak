/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import renderRoutes from '@docusaurus/renderRoutes';
import Layout from '@theme/Layout';
import DocSidebar from '@theme/DocSidebar';
import MDXComponents from '@theme/MDXComponents';
import NotFound from '@theme/NotFound';
import { matchPath } from '@docusaurus/router';
import Head from '@docusaurus/Head';
import clsx from 'clsx';
import styles from './styles.module.css';

// This theme is not coupled to Algolia, but can we do something else?
// Note the last version is also indexed with "last", to avoid breaking search on new releases
// See https://github.com/facebook/docusaurus/issues/3391
function DocSearchVersionHeader({ version, isLast }) {
  const versions = isLast ? [version, 'latest'] : [version];
  return (
    <Head>
      <meta
        name="docsearch:version"
        content={
          // See https://github.com/facebook/docusaurus/issues/3391#issuecomment-685594160
          versions.join(',')
        }
      />
    </Head>
  );
}

function DocPageContent({ currentDocRoute, versionMetadata, children }) {
  const { siteConfig, isClient } = useDocusaurusContext();
  const { permalinkToSidebar, docsSidebars, version, isLast } = versionMetadata;
  const sidebarName = permalinkToSidebar[currentDocRoute.path];
  const sidebar = docsSidebars[sidebarName];
  return (
    <>
      <DocSearchVersionHeader version={version} isLast={isLast} />
      <Layout version={version} key={isClient}>
        <div className={clsx(styles.container, 'container', 'container--l')}>
          {sidebar && (
            <div className={styles.sidebar} role="complementary">
              <DocSidebar
                docsSidebars={docsSidebars}
                path={currentDocRoute.path}
                sidebar={sidebar}
                sidebarCollapsible={
                  siteConfig.themeConfig?.sidebarCollapsible ?? true
                }
              />
            </div>
          )}
          <main className={styles.main}>
            <MDXProvider components={MDXComponents}>{children}</MDXProvider>
          </main>
        </div>
      </Layout>
    </>
  );
}

function DocPage(props) {
  const {
    route: { routes: docRoutes },
    versionMetadata,
    location
  } = props;
  const currentDocRoute = docRoutes.find((docRoute) =>
    matchPath(location.pathname, docRoute)
  );

  if (!currentDocRoute) {
    return <NotFound {...props} />;
  }

  return (
    <DocPageContent
      currentDocRoute={currentDocRoute}
      versionMetadata={versionMetadata}
    >
      {renderRoutes(docRoutes)}
    </DocPageContent>
  );
}

export default DocPage;
