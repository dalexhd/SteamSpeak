import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Fast</>,
    imageUrl: 'img/rocket.png',
    description: (
      <>
        SteamSpeak was designed from the ground up to be easily installed and
        used to get your website/bot up and running quickly.
      </>
    ),
  },
  {
    title: <>Clean Code</>,
    imageUrl: 'img/clean.svg',
    description: (
      <>
        We follow the standard coding rules. We use Eslint, Airbnb config and Prettier during the development process.
      </>
    ),
  },
  {
    title: <>Powered by NodeJS and Vue.JS</>,
    imageUrl: 'img/nodejs-vuejs.svg',
    description: (
      <>
        We use NodeJS as backend language and VueJS as frontend language.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3 className="text--center">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={classnames('hero hero-dark', styles.heroBanner)}>
        <div className="container">
        <img
          className={classnames(styles.heroBannerLogo, 'margin-vert--md')}
          src={'img/logo.png'}
          alt="Metro"
        />
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/setup/installation')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
