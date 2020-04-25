import React, { useState, useEffect } from 'react';

import Diagram from '@site/src/components/Diagram';
import Heading from '@theme/Heading';
import Jump from '@site/src/components/Jump';
import InstallationCommand from '@site/src/components/InstallationCommand';
import ConfigurationExample from '@site/src/components/ConfigurationExample';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import SVG from 'react-inlinesvg';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

import classnames from 'classnames';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { repoUrl } from '@site/src/exports/repoUrl';

import _ from 'lodash';
import styles from './index.module.css';

import './index.css';

const AnchoredH2 = Heading('h2');

const features = [
  {
    title: 'Fast',
    icon: 'zap',
    description: (
      <>
        SteamSpeak was designed from the ground up to be easily installed and used to get your website/bot up and running quickly.
      </>
    ),
  },
  {
    title: 'Clean Code',
    icon: 'code',
    description: (
      <>
        We follow the standard coding rules. We use Eslint, Airbnb config and Prettier during the development process.
      </>
    ),
  },
  {
    title: 'Powered by NodeJS and Vue.JS',
    icon: 'codepen',
    description: (
      <>
        We use NodeJS as backend language and VueJS as frontend language.
      </>
    ),
  }
];

function Features({features}) {
  let rows = [];

  let i,j,temparray,chunk = 3;
  for (i=0,j=features.length; i<j; i+=chunk) {
    let featuresChunk = features.slice(i,i+chunk);

    rows.push(
      <div key={`features${i}`} className="row">
        {featuresChunk.map((props, idx) => (
          <Feature key={idx} {...props} />
        ))}
      </div>
    );
  }

  return (
    <section className={styles.features}>
      <div className="container">
        <AnchoredH2 id="features">Why SteamSpeak?</AnchoredH2>
        {rows}
      </div>
    </section>
  );
}

function Feature({icon, title, description}) {
  return (
    <div className={classnames('col col--4', styles.feature)}>
      <div className={styles.featureIcon}>
        <i className={classnames('feather', `icon-${icon}`)}></i>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Correctness() {
  return (
    <section className={styles.correctness}>
      <div className="container">
        <AnchoredH2 id="correctness">Alternatives</AnchoredH2>
        <div className="sub-title">Having competitors is the best way to build a better software!</div>

        <div className="table-responsive">
          <table className="comparison">
            <thead>
              <tr>
                <th></th>
                <th className="steamspeak">SteamSpeak</th>
                <th><a href="https://github.com/Classy11/steam-ts" target="_blank">steam-ts</a></th>
                <th><a href="https://github.com/schroffl/alfred-teamspeak" target="_blank">alfred-teamspeak</a></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="row-label">Steam Integration</td>
                <td className="result passed steamspeak"><i className="feather icon-check"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
                <td className="result failed"><i className="feather icon-x"></i></td>
              </tr>
              <tr>
                <td className="row-label">Web panel</td>
                <td className="result passed steamspeak"><i className="feather icon-check"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
              </tr>
              <tr>
              <td className="row-label">Event based</td>
                <td className="result passed steamspeak"><i className="feather icon-check"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
              </tr>
              <tr>
              <td className="row-label">Multi instance</td>
                <td className="result passed steamspeak"><i className="feather icon-check"></i></td>
                <td className="result failed"><i className="feather icon-x"></i></td>
                <td className="result failed"><i className="feather icon-x"></i></td>
              </tr>
              <tr>
                <td className="row-label">Hot reload</td>
                <td className="result passed steamspeak"><i className="feather icon-check"></i></td>
                <td className="result failed"><i className="feather icon-x"></i></td>
                <td className="result failed"><i className="feather icon-x"></i></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Configuration() {
  return (
    <section className="configuration">
      <div className="container">
        <AnchoredH2 id="configuration">Simple To Configure</AnchoredH2>
        <ConfigurationExample />
      </div>
    </section>
  );
}

function InstallationSection() {
  return (
    <section className={styles.installation}>
      <div className="container">

        <h3 className={styles.installSubTitle}>Install with a one-liner:</h3>

        <InstallationCommand />

        <h3 className={styles.installSubTitle}>Or choose your preferred method:</h3>

        <div className="row">
          <div className="col">
            <Jump to={useBaseUrl('/releases')}>Release</Jump>
          </div>
          <div className="col">
            <Jump to={useBaseUrl('/docs/setup/installation/')}>Manual</Jump>
          </div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  const {metadata: {latest_release}} = siteConfig.customFields;

  return (
    <Layout title={`${siteConfig.title} - ${siteConfig.tagline}`} description={siteConfig.tagline}>
      <header className={classnames('hero', 'hero--full-height', styles.indexHeroBanner)}>
        <div className="container container--fluid">
          <h1>{siteConfig.title}</h1>
          <p className="hero--subtitle">
            {siteConfig.tagline}
          </p>
          <div className="hero--buttons">
            <Link to={repoUrl()} className="button button--primary"><i className="feather icon-github"></i> View on Github</Link>
            <Link to={useBaseUrl('download')} className="button button--primary">Download<span className="version"> v{latest_release.version}</span></Link>
          </div>
          <Diagram className={styles.indexHeroDiagram} width="100%" />
          <p className="hero--subsubtitle">
            SteamSpeak is currently in development stage. We recommend you to wait until the v1.0.0 gets released.
          </p>
        </div>
      </header>
      <main>
        {features && features.length && <Features features={features} />}
        <Correctness />
        <Configuration />
        <InstallationSection />
      </main>
    </Layout>
  );
}

export default Home;
