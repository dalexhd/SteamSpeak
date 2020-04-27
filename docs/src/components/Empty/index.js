import React from 'react';

import Vic from '@site/src/components/Vic';

function Empty({ text }) {
  return (
    <section className="empty">
      <Vic text={text} />
    </section>
  );
}

export default Empty;
