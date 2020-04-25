import React, { } from 'react';
//  useEffect
import Diagram from '@site/src/components/Diagram';
import Heading from '@theme/Heading';
import Jump from '@site/src/components/Jump';
import InstallationCommand from '@site/src/components/InstallationCommand';
import ConfigurationExample from '@site/src/components/ConfigurationExample';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

import classnames from 'classnames';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import repoUrl from '@site/src/exports/repoUrl';
// import cloudify from '@site/src/exports/cloudify';
import Alert from '@site/src/components/Alert';

import styles from './index.module.css';

import './index.css';

const AnchoredH2 = Heading('h2');

const features = [
  {
    title: 'Fast',
    icon: 'zap',
    description: (
      <>
        SteamSpeak was designed from the ground up to be easily installed and
        used to get your website/bot up and running quickly.
      </>
    )
  },
  {
    title: 'Clean Code',
    icon: 'code',
    description: (
      <>
        We follow the standard coding rules. We use Eslint, Airbnb config and
        Prettier during the development process.
      </>
    )
  },
  {
    title: 'Powered by NodeJS and Vue.JS',
    icon: 'codepen',
    description: (
      <>We use NodeJS as backend language and VueJS as frontend language.</>
    )
  }
];

function Features({ features }) {
  const rows = [];

  let i;
  let j;
  const chunk = 3;
  for (i = 0, j = features.length; i < j; i += chunk) {
    const featuresChunk = features.slice(i, i + chunk);

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

function Feature({ icon, title, description }) {
  return (
    <div className={classnames('col col--4', styles.feature)}>
      <div className={styles.featureIcon}>
        <i className={classnames('feather', `icon-${icon}`)} />
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
        <div className="sub-title">
          Having competitors is the best way to build a better software!
        </div>

        <div className="table-responsive">
          <table className="comparison">
            <thead>
              <tr>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th />
                <th className="steamspeak">SteamSpeak</th>
                <th>
                  <a
                    href="https://github.com/Classy11/steam-ts"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    steam-ts
                  </a>
                </th>
                <th>
                  <a
                    href="https://github.com/schroffl/alfred-teamspeak"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    alfred-teamspeak
                  </a>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="row-label">Steam Integration</td>
                <td className="result passed steamspeak">
                  <i className="feather icon-check" />
                </td>
                <td className="result passed">
                  <i className="feather icon-check" />
                </td>
                <td className="result failed">
                  <i className="feather icon-x" />
                </td>
              </tr>
              <tr>
                <td className="row-label">Web Panel</td>
                <td className="result passed steamspeak">
                  <i className="feather icon-check" />
                </td>
                <td className="result passed">
                  <i className="feather icon-check" />
                </td>
                <td className="result passed">
                  <i className="feather icon-check" />
                </td>
              </tr>
              <tr>
                <td className="row-label">Event Based</td>
                <td className="result passed steamspeak">
                  <i className="feather icon-check" />
                </td>
                <td className="result passed">
                  <i className="feather icon-check" />
                </td>
                <td className="result passed">
                  <i className="feather icon-check" />
                </td>
              </tr>
              <tr>
                <td className="row-label">Multi Instance</td>
                <td className="result passed steamspeak">
                  <i className="feather icon-check" />
                </td>
                <td className="result failed">
                  <i className="feather icon-x" />
                </td>
                <td className="result failed">
                  <i className="feather icon-x" />
                </td>
              </tr>
              <tr>
                <td className="row-label">Hot Reload</td>
                <td className="result passed steamspeak">
                  <i className="feather icon-check" />
                </td>
                <td className="result failed">
                  <i className="feather icon-x" />
                </td>
                <td className="result failed">
                  <i className="feather icon-x" />
                </td>
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

        <h3 className={styles.installSubTitle}>
          Or choose your preferred method:
        </h3>

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
// function Integrations() {
//   const context = useDocusaurusContext();
//   const { siteConfig = {} } = context;
//   const {
//     metadata: { plugins }
//   } = siteConfig.customFields;

//   const classes = {
//     serverName_plugin: 'large',
//     afkKick_plugin: 'large',
//     afkMove_plugin: 'large',
//     changeChannel_plugin: 'large',
//     hostMessage_plugin: 'large',
//     multiFunction_plugin: 'large',
//   };

//   return (
//     <section className={classnames(styles.integrations, 'integrations')}>
//       <div className="container">
//         <AnchoredH2 id="integrations">
//           Quality Integrations Built Into The Core
//         </AnchoredH2>
//         <div className="sub-title">
//           Actively maintained integrations. Gone are the days of dormant
//           low-quality plugins.
//         </div>

//         <div className={classnames(styles.components, 'components')}>
//           <h3>
//             <div>
//               <span className="line-break">
//                 {Object.keys(plugins).length} plugins
//               </span>
//             </div>
//           </h3>
//           <div className={styles.componentsCanvas} id="component-canvas" />
//           <ul>
//             {Object.keys(plugins).map((key, index) => (
//               <li className={classes[`${key}_plugin`]} key={index}>
//                 <Link to={useBaseUrl(`/docs/reference/plugins/${plugins[key].name}/`)}>
//                   {plugins[key].name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// }
function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  const {
    // eslint-disable-next-line camelcase
    metadata: { latest_release }
  } = siteConfig.customFields;

  // useEffect(() => {
  //   cloudify();
  // }, []);

  return (
    <Layout
      title={`${siteConfig.title} - ${siteConfig.tagline}`}
      description={siteConfig.tagline}
    >
      <header
        className={classnames(
          'hero',
          'hero--full-height',
          styles.indexHeroBanner
        )}
      >
        <div className="container container--fluid">
          <h1>{siteConfig.title}</h1>
          <p className="hero--subtitle">{siteConfig.tagline}</p>
          <div className="hero--buttons">
            <Link to={repoUrl()} className="button button--primary">
              <i className="feather icon-github" /> View on Github
            </Link>
            <Link
              to={useBaseUrl('download')}
              className="button button--primary"
            >
              Download
              <span className="version"> v{latest_release.version}</span>
            </Link>
          </div>
          <Diagram className={styles.indexHeroDiagram} width="100%" />
          <div className="container">
            <Alert type="info" className="list--icons list--icons--infos">
              SteamSpeak is currently in development stage. We recommend you
              to wait until the v1.0.0 gets released.
            </Alert>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && <Features features={features} />}
        <Correctness />
        <Configuration />
        {/* <Integrations /> */}
        <InstallationSection />
      </main>
    </Layout>
  );
}

export default Home;
