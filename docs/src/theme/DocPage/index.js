import React from 'react';
import {MDXProvider} from '@mdx-js/react';

import classnames from 'classnames';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import renderRoutes from '@docusaurus/renderRoutes';
import Layout from '@theme/Layout';
import DocSidebar from '@theme/DocSidebar';
import MDXComponents from '@theme/MDXComponents';
import NotFound from '@theme/NotFound';
import {matchPath} from '@docusaurus/router';

import styles from './styles.module.css';

function DocPage(props) {
  const {route: baseRoute, docsMetadata, location} = props;
  // case-sensitive route such as it is defined in the sidebar
  const currentRoute =
    baseRoute.routes.find(route => {
      return matchPath(location.pathname, route);
    }) || {};
  const {permalinkToSidebar, docsSidebars, version} = docsMetadata;
  const sidebar = permalinkToSidebar[currentRoute.path];
  const {
    siteConfig: {themeConfig = {}} = {},
    isClient,
  } = useDocusaurusContext();
  const {sidebarCollapsible = true} = themeConfig;

  if (Object.keys(currentRoute).length === 0) {
    return <NotFound {...props} />;
  }

  return (
    <Layout version={version} key={isClient}>
      <div className={classnames(styles.container, 'container', 'container--l')}>
        {sidebar && (
          <div className={classnames(styles.sidebar)}>
            <DocSidebar
              docsSidebars={docsSidebars}
              path={currentRoute.path}
              sidebar={sidebar}
              sidebarCollapsible={sidebarCollapsible}
            />
          </div>
        )}
        <main className={styles.main}>
          <MDXProvider components={MDXComponents}>
            {renderRoutes(baseRoute.routes)}
          </MDXProvider>
        </main>
      </div>
    </Layout>
  );
}

export default DocPage;
