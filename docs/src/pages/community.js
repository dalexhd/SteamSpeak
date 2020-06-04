import React from 'react';

import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import repoUrl from '@site/src/exports/repoUrl';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './community.module.css';

const AnchoredH2 = Heading('h2');
const AnchoredH3 = Heading('h3');

function Community() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  const {
    metadata: { team },
    chatUrl,
    discordUrl
  } = siteConfig.customFields;
  const filteredTeam = team.filter((member) => {
    return member.show;
  });
  return (
    <Layout
      title="Community"
      description="Join the SteamSpeak community. Connect with other SteamSpeak users and help make SteamSpeak better."
    >
      <header className="hero hero--clean">
        <div className="container container--fluid">
          <h1>SteamSpeak Community</h1>
          <div className="hero--subtitle">
            Join the SteamSpeak community. Connect with other SteamSpeak users
            and help make SteamSpeak better.
          </div>
        </div>
      </header>
      <main>
        <section>
          <div className="container">
            <div className="row">
              <div className="col">
                <a
                  href={chatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panel panel--button"
                >
                  <div className="panel--icon">
                    <i className="feather icon-message-circle" />
                  </div>
                  <div className="panel--title">Chat</div>
                  <div className="panel--description">
                    Ask questions and get help
                  </div>
                </a>
              </div>
              <div className="col">
                <a
                  href={discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panel panel--button"
                >
                  <div className="panel--icon">
                    <i className="fab fa-discord" title="Discord" />
                  </div>
                  <div className="panel--title">Discord</div>
                  <div className="panel--description">
                    Join or Discord server
                  </div>
                </a>
              </div>
              <div className="col">
                <a
                  href="https://github.com/dalexhd/SteamSpeak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panel panel--button"
                >
                  <div className="panel--icon">
                    <i className="feather icon-github" />
                  </div>
                  <div className="panel--title">Github dalexhd/SteamSpeak</div>
                  <div className="panel--description">
                    Issues, code, and development
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <AnchoredH2 id="team">Meet The Team</AnchoredH2>
            <div className="sub-title">
              A simple composable format lets you build flexible pipelines
            </div>

            <div className={styles.coreTeam}>
              {filteredTeam.map((member, idx) => (
                <Link
                  key={idx}
                  to={member.github}
                  className="avatar avatar--vertical"
                >
                  <img
                    className="avatar__photo avatar__photo--xl"
                    alt="Avatar"
                    src={member.avatar}
                  />
                  <div className="avatar__intro">
                    <h4 className="avatar__name">{member.name}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <AnchoredH2 id="faqs">FAQs</AnchoredH2>

            <AnchoredH3 id="contribute" className="header--flush">
              How do I contribute to SteamSpeak?
            </AnchoredH3>

            <p>
              SteamSpeak is <a href={repoUrl()}>open-source</a> and welcomes
              contributions. A few guidelines to help you get started:
            </p>
            <ol>
              <li>
                Read our{' '}
                <a href={repoUrl('/blob/master/CONTRIBUTING.md')}>
                  contribution guide
                </a>
                .
              </li>
              <li>
                Start with{' '}
                <a href={repoUrl('/contribute')}>good first issues</a>.
              </li>
              <li>
                Join our <a href={chatUrl}>chat</a> if you have any questions.
                We are happy to help!
              </li>
            </ol>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Community;
