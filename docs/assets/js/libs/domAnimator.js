/*!
 * DomAnimator.js
 *
 * MIT licensed
 * Copyright (C) 2015 Tim Holman, http://tholman.com
 */

/** *******************************************
 * DomAnimator
 ******************************************** */

const DomAnimator = (function () {
  let currentFrame = 0;
  const frames = [];
  const nodes = [];

  // Chrome console shows new lines, others don't...
  // so multiple comments are used on others, to look good.
  const multiNode = !window.chrome;

  let interval = null;
  const defaultTime = 500; // ms
  const attached = false;
  const whiteSpaceString = '\u00A0';

  // Soft object augmentation
  function extend(target, source) {
    for (const key in source) {
      if (!(key in target)) {
        target[key] = source[key];
      }
    }
    return target;
  }

  function swapWhitespace(array) {
    let i = 0;

    for (i; i < array.length; i++) {
      array[i] = array[i].replace(/ /g, whiteSpaceString);
    }
    return array;
  }

  function padString(string) {
    return `\n${string}\n`;
  }

  // Frame passed through as a list []
  function parseMultilineFrame(frame) {
    if (multiNode) {
      return swapWhitespace(frame);
    }
    return padString(frame.join('\n'));
  }

  // Frame passed through as a string.
  function parseSingleLineFrame(frame) {
    if (multiNode) {
      return swapWhitespace(frame.split('\n'));
    }
    return padString(frame);
  }

  function renderFrame() {
    const frameData = frames[currentFrame];

    if (multiNode) {
      let i = 0;
      for (i; i < nodes.length; i++) {
        nodes[i].nodeValue = frameData[i];
      }
    } else {
      nodes[0].nodeValue = frameData;
    }

    currentFrame += 1;
    if (currentFrame === frames.length) {
      currentFrame = 0;
    }
  }

  function attachToDocument() {
    const { head } = document;
    const parent = head.parentNode;

    // This assumes you have the same amount of frames in each section.
    if (multiNode) {
      let i = 0;
      const totalNodes = frames[0].length;
      for (i; i < totalNodes; i++) {
        const node = document.createComment('');
        nodes.push(node);
        parent.insertBefore(node, head);
      }
    } else {
      const node = document.createComment('');
      nodes.push(node);
      parent.insertBefore(node, head);
    }
  }

  function animate(time) {
    // No time set, just use default!
    if (!time) {
      time = defaultTime;
    }

    // No frames
    if (frames.length === 0) {
      return;
    }

    if (attached === false) {
      attachToDocument();
    }

    interval = setInterval(() => {
      renderFrame();
    }, time);
  }

  function stop() {
    clearInterval(interval);
  }

  function addFrame(frameData = 'no frame data') {
    const frameType = typeof (frameData);

    // Multi line data.
    if (frameType === 'object') {
      frames.push(parseMultilineFrame(frameData));

      // String data
    } else if (frameType === 'string') {
      frames.push(parseSingleLineFrame(frameData));
    }
  }

  function main() {
  }

  return extend(main, {
    addFrame,
    animate,
    stop,
  });
});
