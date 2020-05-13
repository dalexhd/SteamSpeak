import React from 'react';

import Link from '@docusaurus/Link';
import SVG from 'react-inlinesvg';

import { enrichTags } from '@site/src/exports/tags';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { toLower } from 'lodash';

import './styles.css';

function GuideItem(props) {
  const { frontMatter, metadata = false } = props;
  const { categories, permalink, seriesPosition, tags } = metadata;
  const { cover_label: coverLabel, title } = frontMatter;
  const enrichedTags = enrichTags(tags, 'guides');
  const domainTag = enrichedTags.find((tag) => tag.category === 'domain');
  const domainBG = domainTag ? domainTag.value : 'default';
  const serviceTag = enrichedTags.find((tag) => tag.category === 'service');
  const serviceName = serviceTag ? toLower(serviceTag.value) : null;

  const { siteConfig } = useDocusaurusContext();
  const {
    metadata: { installation }
  } = siteConfig.customFields;
  const { services } = installation;
  const service = serviceName && services[serviceName];

  return (
    <Link to={`${permalink}/`} className="guide-item">
      <article>
        <div className={`domain-bg domain-bg--${domainBG} domain-bg--hover`}>
          <header>
            <div className="category">{categories[0].name}</div>
            <h2 title={title}>
              {seriesPosition && `${seriesPosition}. `}
              {coverLabel || title}
            </h2>
          </header>
          <footer>
            {service && (
              <SVG src={useBaseUrl(service.icon_path)} className="logo" />
            )}
            <div className="action">read now</div>
          </footer>
        </div>
      </article>
    </Link>
  );
}

export default GuideItem;
