import React, { useState } from 'react';

import Empty from '@site/src/components/Empty';
import GuideItems from '@theme/GuideItems';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

import qs from 'qs';

import './styles.css';

const AnchoredH2 = Heading('h2');

function Guides({ filtering, items }) {
  if (items.length === 0) {
    return <Empty text="no guides found" />;
  }
  if (filtering) {
    return <GuideItems items={items} />;
  }
  const gettingStartedGuides = items.filter(
    (item) => item.content.metadata.categories[0].name === 'getting-started'
  );
  const installationGuides = items.filter(
    (item) => item.content.metadata.categories[0].name === 'installation'
  );
  const installationCategory =
    installationGuides[0].content.metadata.categories[0];
  return (
    <>
      <section>
        <GuideItems items={gettingStartedGuides} staggered />
      </section>
      <section>
        <AnchoredH2 id={installationCategory.permalink}>
          {installationCategory.title}
        </AnchoredH2>
        {installationCategory.description && (
          <div className="sub-title">{installationCategory.description}</div>
        )}
        <GuideItems items={installationGuides} large />
      </section>
    </>
  );
}

function GuideListPage(props) {
  const { items, location } = props;
  const queryObj = location
    ? qs.parse(location.search, { ignoreQueryPrefix: true })
    : {};
  const [searchTerm, setSearchTerm] = useState(queryObj.search);
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  let filtering = false;
  let filteredItems = items.filter((item) => {
    const { tags } = item.content.metadata;
    const hasPlatform = tags.some((tag) => tag.label.startsWith('platform: '));
    return hasPlatform;
  });

  if (searchTerm) {
    filtering = true;

    filteredItems = filteredItems.filter((item) => {
      const normalizedTerm = searchTerm.toLowerCase();
      const { metadata } = item.content;
      const normalizedLabel = metadata.coverLabel.toLowerCase();

      if (normalizedLabel.includes(normalizedTerm)) {
        return true;
      }
      if (
        metadata.tags.some((tag) =>
          tag.label.toLowerCase().includes(normalizedTerm)
        )
      ) {
        return true;
      }
      return false;
    });
  }
  return (
    <Layout title="Guides" description="Guides, tutorials, and education.">
      <header className="hero hero--clean">
        <div className="container">
          <h1>{siteConfig.title} Guides</h1>
          <div className="hero--subtitle">
            Thoughtful guides to help you get the most out of {siteConfig.title}
            . Created and curated by the{' '}
            <Link to={useBaseUrl('/community#team')}>
              {siteConfig.title} team
            </Link>
            .
          </div>
          <div className="hero--search">
            <input
              type="text"
              className="input--text input--xl"
              onChange={(event) => setSearchTerm(event.currentTarget.value)}
              placeholder="🔍 Search by guide name or tag..."
            />
          </div>
        </div>
      </header>
      <main className="container container--s">
        <Guides filtering={filtering} items={filteredItems} />
      </main>
    </Layout>
  );
}

export default GuideListPage;
