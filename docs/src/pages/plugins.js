/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';

import SteamSpeakComponents from '@site/src/components/SteamSpeakComponents';
import Layout from '@theme/Layout';

import animatedGraph from '@site/src/exports/animatedGraph';

function Components(props) {
  useEffect(() => {
    const canvas = document.querySelector('canvas');
    const timer = animatedGraph(canvas);
    return () => {
      timer.stop();
    };
  }, []);

  return (
    <Layout
      title="Plugins"
      description="Browse and search all SteamSpeak's plugins."
    >
      <header className="hero hero--animated-graph">
        <div className="container container--fluid container--flush">
          <canvas width="2000" height="200" />
          <div className="overlay">
            <h1>SteamSpeak Plugins</h1>
            <div className="hero--subtitle">
              SteamSpeak provides you multiple plugins to automatize your teamspeak server.
            </div>
          </div>
        </div>
      </header>
      <main className="container">
        <SteamSpeakComponents
          filterColumn
          headingLevel={2}
          location={props.location}
        />
      </main>
    </Layout>
  );
}

export default Components;
