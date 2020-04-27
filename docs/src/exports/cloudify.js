/* eslint max-classes-per-file: ["error", 3] */
let $ = null;
let SVG = null;

if (typeof document !== 'undefined') {
  $ = require('cash-dom');
  SVG = require('svg.js');
}

export default function cloudify() {
  const SVG_INSTANCE = SVG('component-canvas').size('100%', '100%');
  const CANVAS = SVG_INSTANCE.group();

  // ----------------------------------------
  // PAGE RESIZING
  // Only runs on initial load, not window resize
  let CANVAS_SIZE = 800;
  let CANVAS_OFFSET_X = 400;
  let CANVAS_OFFSET_Y = 400;

  if ($(window).width() >= 1000) {
    CANVAS_SIZE = 1000;
    CANVAS_OFFSET_X = 500;
    CANVAS_OFFSET_Y = 500;
    $('.components').addClass('initial-large');
  } else {
    $('.components').addClass('initial-small');
  }

  function setCanvasOffsets() {
    CANVAS_OFFSET_X = $('.components').innerWidth() / 2;
    CANVAS_OFFSET_Y = $('.components').innerHeight() / 2;
    CANVAS.transform({
      x: CANVAS_OFFSET_X,
      y: CANVAS_OFFSET_Y
    });
  }
  setCanvasOffsets();
  $(window).on('resize', setCanvasOffsets);

  // ----------------------------------------
  // VECTORS
  class Vector {
    constructor(_x, _y) {
      this.x = _x || 0;
      this.y = _y || 0;
      this.dist = (vector) => {
        const dx = this.x - vector.x;
        const dy = this.y - vector.y;
        return Math.sqrt(dx * dx + dy * dy);
      };
      this.minus = (vector) => {
        return new Vector(this.x - vector.x, this.y - vector.y);
      };
      this.scale = (scale) => {
        this.x *= scale;
        this.y *= scale;
      };
      this.apply = (vector) => {
        this.x += vector.x;
        this.y += vector.y;
      };
      this.length = () => {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      };
    }
  }

  // ----------------------------------------
  // NODES

  const NODES = [];
  let RADIUS_SMALL = 18;
  let RADIUS_MEDIUM = 38;
  let RADIUS_LARGE = 50;
  if ($(window).width() >= 1000) {
    RADIUS_SMALL = 25;
    RADIUS_MEDIUM = 45;
    RADIUS_LARGE = 60;
  }
  const RADIUS_ANIMATION_SPEED = 0.15;
  const TEXT_ANIMATION_SPEED = 0.1;
  const GRAY = '#bdbecf';
  class Node {
    constructor(_home, _label) {
      this.home = _home; // Home position
      this.pos = new Vector(_home.x, _home.y); // Current position
      this.radius = RADIUS_SMALL;
      this.targetRadius = this.radius;
      this.textOpacity = 0;
      this.targetTextOpacity = 0;
      this.label = _label;
      this.defaultStyle = 'small';
      this.currentStyle = 'small';
      this.url = null;
      NODES.push(this);

      // Initialize
      this.svgGroup = CANVAS.group();
      this.svgGroup.addClass('item');
      this.svgCircle = this.svgGroup.circle();
      this.svgCircle.fill('#fff').stroke(GRAY);
      this.svgText = this.svgGroup.text(this.label);
      this.svgText.font({
        family: 'open-sans, helvetica neue, helvetica',
        size: 12,
        anchor: 'middle',
        leading: '1.2em'
      });
      if (this.label.indexOf('\n') === -1) {
        this.svgText.transform({
          y: -9
        });
      } else {
        this.svgText.transform({
          y: -16
        });
      }

      // Click events:
      const self = this;
      this.svgGroup.click(() => {
        if (self.url) {
          window.location = self.url;
        }
      });

      this.setStyle = (style) => {
        if (self.currentStyle === style) return;

        let targetStyle = style;
        if (targetStyle === 'default') targetStyle = self.defaultStyle;

        if (targetStyle === 'large') {
          self.targetRadius = RADIUS_LARGE;
          self.targetTextOpacity = 1;
          self.svgGroup.addClass('large');
        } else if (targetStyle === 'large-hover') {
          self.targetRadius = RADIUS_LARGE;
          self.targetTextOpacity = 1;
          self.svgGroup.addClass('large');
        } else if (targetStyle === 'medium') {
          self.targetRadius = RADIUS_MEDIUM;
          self.targetTextOpacity = 1;
          self.svgGroup.removeClass('large');
        } else if (targetStyle === 'small') {
          self.targetRadius = RADIUS_SMALL;
          self.targetTextOpacity = 0;
          self.svgGroup.removeClass('large');
        }

        self.currentStyle = targetStyle;
      };

      this.draw = () => {
        // size
        self.radius +=
          (self.targetRadius - self.radius) * RADIUS_ANIMATION_SPEED;
        const d = self.radius * 2;
        self.svgCircle.size(d, d);
        // text
        self.textOpacity +=
          (self.targetTextOpacity - self.textOpacity) * TEXT_ANIMATION_SPEED;
        self.svgText.opacity(self.textOpacity);
        // position
        self.svgGroup.transform({
          x: self.pos.x,
          y: self.pos.y
        });
      };
    }
  }

  const EDGES = [];
  class Edge {
    constructor(_n1, _n2) {
      this.n1 = _n1;
      this.n2 = _n2;
      this.homeLength = this.n1.home.dist(this.n2.home);
      EDGES.push(this);
      this.length = () => {
        return this.n1.pos.dist(this.n2.pos);
      };
    }
  }

  // ----------------------------------------
  // INITIAL NODE & EDGE CREATION

  const HOME_RADIUS = 0.3 * CANVAS_SIZE;
  const RADIUS_VARIANCE = 0.1;
  const INITIAL_RADIUS_SCALE = 0.1;

  const elements = $('.components li');
  elements.each((i, e) => {
    const el = $(e);
    const p = (i / elements.length) * Math.PI * 2;
    const r =
      HOME_RADIUS + Math.random() * RADIUS_VARIANCE - RADIUS_VARIANCE / 2;

    const home = new Vector(Math.sin(p) * r, Math.cos(p) * r);

    let label = el.text();
    label = label.replace(' ', '\n');
    const n = new Node(home, label);

    n.pos = new Vector(
      Math.sin(p) * r * INITIAL_RADIUS_SCALE,
      Math.cos(p) * r * INITIAL_RADIUS_SCALE
    );

    if (el.hasClass('medium')) {
      n.defaultStyle = 'medium';
    } else if (el.hasClass('large')) {
      n.defaultStyle = 'large';
    }

    const url = $('a', e).attr('href');
    if (url) {
      n.url = url;
    }

    n.setStyle('default');
    n.draw();
  });

  // Create Edges
  const EDGE_SPAN = 12;
  for (let i = 0; i < NODES.length; i++) {
    const n1 = NODES[i];
    for (let j = 1; j < EDGE_SPAN; j++) {
      const n2 = NODES[(i + j) % NODES.length];
      // eslint-disable-next-line no-new
      new Edge(n1, n2);
    }
  }

  // ----------------------------------------
  // FORCES & ANIMATION

  const EDGE_FORCE = 0.3;
  const EDGE_PADDING = 30;

  function applyEdgeForces() {
    for (const e in EDGES) {
      if (Object.prototype.hasOwnProperty.call(EDGES, e)) {
        const edge = EDGES[e];

        // Edge lengths
        const minLength = edge.n1.radius + edge.n2.radius + EDGE_PADDING;
        const length = edge.length();

        // Collisions
        if (length < minLength) {
          // Calculate forces
          const force = edge.n1.pos.minus(edge.n2.pos);
          const stretch = length - minLength;
          force.scale((stretch / length) * EDGE_FORCE);
          // Apply forces
          edge.n2.pos.apply(force);
          force.scale(-1);
          edge.n1.pos.apply(force);
        }
      }
    }
  }

  function applyHomeForces() {
    const HOME_FORCE = 0.1;
    for (const n in NODES) {
      if (Object.prototype.hasOwnProperty.call(NODES, n)) {
        const node = NODES[n];
        const diff = node.home.minus(node.pos);
        diff.scale(HOME_FORCE);
        node.pos.apply(diff);
      }
    }
  }

  function redraw() {
    for (const n in NODES) {
      if (Object.prototype.hasOwnProperty.call(NODES, n)) {
        NODES[n].draw();
      }
    }
  }

  let ANIMATION_INTERVAL = null;
  let ANIMATION_TIMEOUT = null;

  function startAnimation() {
    if (ANIMATION_INTERVAL != null) return;
    ANIMATION_INTERVAL = setInterval(() => {
      applyHomeForces();
      applyEdgeForces();
      redraw();
    }, 1000 / 30);
  }

  function stopAnimation() {
    if (ANIMATION_INTERVAL === null) return;
    clearInterval(ANIMATION_INTERVAL);
    ANIMATION_INTERVAL = null;
  }

  function animate() {
    // Timeout since after a period of time the animation effectively stops.
    // This helps with performance.
    if (ANIMATION_TIMEOUT != null) clearTimeout(ANIMATION_TIMEOUT);
    ANIMATION_TIMEOUT = setTimeout(() => {
      stopAnimation();
    }, 4000);

    startAnimation();
  }

  animate();

  // ----------------------------------------
  // MOUSE MOVEMENTS

  $('#component-canvas').on('mousemove', (e) => {
    animate();

    const offset = $('#component-canvas').offset();
    const mouse = new Vector(
      e.pageX - offset.left - CANVAS_OFFSET_X,
      e.pageY - offset.top - CANVAS_OFFSET_Y
    );

    for (const n in NODES) {
      if (Object.prototype.hasOwnProperty.call(NODES, n)) {
        const node = NODES[n];
        const dist = mouse.dist(node.pos);

        if (dist < 100) {
          node.setStyle('large-hover');
        } else if (dist < 210 && node.defaultStyle !== 'large') {
          node.setStyle('large');
        } else {
          node.setStyle('default');
        }
      }
    }
  });
}
