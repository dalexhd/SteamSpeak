import React, { useState, useEffect } from 'react';

import Diagram from '@site/src/components/Diagram';
import Heading from '@theme/Heading';
import Jump from '@site/src/components/Jump';
import InstallationCommand from '@site/src/components/InstallationCommand';
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
    title: 'Lorem ipsum.',
    icon: 'zap',
    description: (
      <>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime porro cum dignissimos illum maiores officiis nulla, quibusdam, dolor consequuntur quas, velit officia sint magni soluta labore suscipit. Soluta, sequi reprehenderit.
      </>
    ),
  },
  {
    title: 'Lorem ipsum.',
    icon: 'unlock',
    description: (
      <>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo minus quaerat veniam consequuntur, dolore assumenda.
      </>
    ),
  },
  {
    title: 'Lorem ipsum.',
    icon: 'codepen',
    description: (
      <>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam obcaecati cumque facilis ipsam minima magni non deleniti.
      </>
    ),
  },
  {
    title: 'Lorem ipsum.',
    icon: 'shuffle',
    description: (
      <>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam magni dolor consectetur temporibus totam!
      </>
    ),
  },
  {
    title: 'Lorem ipsum.',
    icon: 'code',
    description: (
      <>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, quo tempore? Est adipisci autem delectus! Culpa magni ea eveniet?
      </>
    ),
  },
  {
    title: 'Lorem ipsum.',
    icon: 'shield',
    description: (
      <>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, debitis, quisquam eligendi odit cum voluptatibus, vel ipsum aspernatur quas itaque molestias?
      </>
    ),
  },
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
        <AnchoredH2 id="correctness">Lorem ipsum dolor sit amet.</AnchoredH2>
        <div className="sub-title">Lorem ipsum dolor sit amet consectetur.</div>

        <div className="table-responsive">
          <table className="comparison">
            <thead>
              <tr>
                <th></th>
                <th className="steamspeak">SteamSpeak</th>
                <th>Lorem.</th>
                <th>Lorem.</th>
                <th>Lorem.</th>
                <th>Lorem.</th>
                <th>Lorem.</th>
                <th>Lorem.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="row-label"><a target="_blank" href="https://github.com/dalexhd/steamspeak">Lorem, ipsum.</a></td>
                <td className="result passed steamspeak"><i className="feather icon-check"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
                <td className="result failed"><i className="feather icon-x"></i></td>
                <td className="result failed"><i className="feather icon-x"></i></td>
                <td className="result warning"><i className="feather icon-alert-triangle"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
              </tr>
              <tr>
                <td className="row-label"><a target="_blank" href="https://github.com/dalexhd/steamspeak">Lorem, ipsum dolor.</a></td>
                <td className="result passed steamspeak"><i className="feather icon-check"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
              </tr>
              <tr>
                <td className="row-label"><a target="_blank" href="https://github.com/dalexhd/steamspeak">Lorem, ipsum.</a></td>
                <td className="result passed steamspeak"><i className="feather icon-check"></i></td>
                <td className="result failed"><i className="feather icon-x"></i></td>
                <td className="result failed"><i className="feather icon-x"></i></td>
                <td className="result failed"><i className="feather icon-x"></i></td>
                <td className="result failed"><i className="feather icon-x"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
              </tr>
              <tr>
                <td className="row-label"><a target="_blank" href="https://github.com/dalexhd/steamspeak">Lorem, ipsum.</a></td>
                <td className="result passed steamspeak"><i className="feather icon-check"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
              </tr>
              <tr>
                <td className="row-label"><a target="_blank" href="https://github.com/dalexhd/steamspeak">Lorem, ipsum dolor.</a></td>
                <td className="result passed steamspeak"><i className="feather icon-check"></i></td>
                <td className="result failed"><i className="feather icon-x"></i></td>
                <td className="result failed"><i className="feather icon-x"></i></td>
                <td className="result failed"><i className="feather icon-x"></i></td>
                <td className="result warning"><i className="feather icon-alert-triangle"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
              </tr>
              <tr>
                <td className="row-label"><a target="_blank" href="https://github.com/dalexhd/steamspeak">Lorem ipsum dolor sit.</a></td>
                <td className="result passed steamspeak"><i className="feather icon-check"></i></td>
                <td className="result failed"><i className="feather icon-x"></i></td>
                <td className="result failed"><i className="feather icon-x"></i></td>
                <td className="result failed"><i className="feather icon-x"></i></td>
                <td className="result failed"><i className="feather icon-x"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
              </tr>
              <tr>
                <td className="row-label"><a target="_blank" href="https://github.com/dalexhd/steamspeak">Lorem, ipsum.</a></td>
                <td className="result passed steamspeak"><i className="feather icon-check"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
                <td className="result failed"><i className="feather icon-x"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
                <td className="result passed"><i className="feather icon-check"></i></td>
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
        <div className="sub-title">Lorem ipsum dolor sit amet consectetur.</div>

        <div className="configuration__diagram">
          <SVG src="img/configuration.svg" />
        </div>
      </div>
    </section>
  );
}

function InstallationSection() {
  return (
    <section className={styles.installation}>
      <div className="container">
        <AnchoredH2 id="installation">Installs Everywhere</AnchoredH2>
        <div className="sub-title">Fully static, no dependencies, no runtime, memory safe</div>

        <div className={styles.installationPlatforms}>
          <Link to={useBaseUrl('/docs/setup/installation/')}><SVG src="img/operative-systems/linux.svg" /></Link>
          <Link to={useBaseUrl('/docs/setup/installation/')}><SVG src="img/operative-systems/windows.svg" /></Link>
          <Link to={useBaseUrl('/docs/setup/installation/')}><SVG src="img/operative-systems/apple.svg" /></Link>
        </div>

        <div className={styles.installationChecks}>
          <div>
            <i className="feather icon-package"></i> Tempor ea nostrud.
          </div>
          <div>
            <i className="feather icon-cpu"></i> Mollit commodo.
          </div>
          <div>
            <i className="feather icon-feather"></i> Est aliquip est.
          </div>
          <div>
            <i className="feather icon-zap"></i> Quis est non nulla et.
          </div>
        </div>

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
          <h1>${siteConfig.tagline}</h1>
          <p className="hero--subtitle">
            <Link to={useBaseUrl('plugins')}>Lorem, ipsum.</Link> <i>lorem</i> Lorem ipsum dolor sit amet consectetur.
          </p>
          <div className="hero--buttons">
            <Link to={repoUrl()} className="button button--primary"><i className="feather icon-github"></i> View on Github</Link>
            <Link to={useBaseUrl('download')} className="button button--primary">Download<span className="version"> v{latest_release.version}</span></Link>
          </div>
          <Diagram className={styles.indexHeroDiagram} width="100%" />
          <p className="hero--subsubtitle">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam accusamus qui laudantium totam.
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
