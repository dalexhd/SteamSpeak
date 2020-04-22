import React, { useState, useEffect } from 'react';

import SteamSpeakComponents from '@site/src/components/SteamSpeakComponents';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

import animatedGraph from '@site/src/exports/animatedGraph';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function Components(props) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      let canvas = document.querySelector("canvas");
      let timer = animatedGraph(canvas);
      return () => {
        timer.stop();
      }
    }
  }, []);

  return (
    <Layout title="Plugins" description="Browse and search all SteamSpeak's plugins.">
      <header className="hero hero--animated-graph">
        <div className="container container--fluid container--flush">
          <canvas width="2000" height="200"></canvas>
          <div className="overlay">
            <h1>SteamSpeak Plugins</h1>
            <div className="hero--subtitle">
              Qui ullamco cillum id minim duis laboris laborum irure adipisicing tempor.
            </div>
          </div>
        </div>
      </header>
      <main className="container">
        <SteamSpeakComponents filterColumn={true} headingLevel={2} location={props.location} />
      </main>
    </Layout>
  );
}

export default Components;
