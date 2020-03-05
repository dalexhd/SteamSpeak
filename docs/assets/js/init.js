// eslint-disable-next-line no-unused-vars
function setEnvioroment() {
  const domAnimator = new DomAnimator();
  // eslint-disable-next-line no-console
  console.log(
    `%c Docsify %c ${window.Docsify.version} %c  %c Detected environment %c Production %c  %c Panel by: %c Docsify %c`,
    'background:#35495e; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;',
    'background:#1972F5; padding: 1px; border-radius: 0 3px 3px 0; color: #fff;',
    'background:transparent',
    'background: #35495e; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;',
    'background: #1972F5; padding: 1px; border-radius: 0 3px 3px 0; color: #fff;',
    'background:transparent',
    'background: #35495e; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;',
    'background: #1972F5; padding: 1px; border-radius: 0 3px 3px 0; color: #fff;',
    'background:transparent',
  );
  const frame1 = [
    '       .-"-.       𝘿𝙚𝙩𝙚𝙘𝙩𝙚𝙙 𝙚𝙣𝙫𝙞𝙧𝙤𝙣𝙢𝙚𝙣𝙩: Production',
    `     _/.-.-.\\_     𝙑𝙚𝙧𝙨𝙞𝙤𝙣: ${window.Docsify.version}`,
    '    ( ( o o ) )    𝙋𝙖𝙣𝙚𝙡 𝘽𝙮: Docsify',
    '     |/  "  \\|     ',
    "      \\'/^\\'/      ",
    '      /`\\ /`\\      ',
    '     /  /|\\  \\     ',
    '    ( (/ T \\) )    ',
    '     \\__/^\\__/     ',
  ];
  const frame2 = [
    '       .-"-.       𝘿𝙚𝙩𝙚𝙘𝙩𝙚𝙙 𝙚𝙣𝙫𝙞𝙧𝙤𝙣𝙢𝙚𝙣𝙩: Production',
    `     _/_-.-_\\_     𝙑𝙚𝙧𝙨𝙞𝙤𝙣: ${window.Docsify.version}`,
    '    / __> <__ \\    𝙋𝙖𝙣𝙚𝙡 𝘽𝙮: Docsify',
    '   / //  "  \\\\ \\   ',
    "  / / \\'---'/ \\ \\  ",
    '  \\ \\_/`"""`\\_/ /  ',
    '   \\           /   ',
    '    \\         /    ',
    '     |   .   |     ',
  ];
  const frame3 = [
    '       .-"-.       𝘿𝙚𝙩𝙚𝙘𝙩𝙚𝙙 𝙚𝙣𝙫𝙞𝙧𝙤𝙣𝙢𝙚𝙣𝙩: Production',
    `     _/_-.-_\\_     𝙑𝙚𝙧𝙨𝙞𝙤𝙣: ${window.Docsify.version}`,
    '    /|( o o )|\\    𝙋𝙖𝙣𝙚𝙡 𝘽𝙮: Docsify',
    '   | //  "  \\\\ |   ',
    "  / / \\'---'/ \\ \\  ",
    '  \\ \\_/`"""`\\_/ /  ',
    '   \\           /   ',
    '    \\         /    ',
    '     |   .   |     ',
  ];
  domAnimator.addFrame(frame1);
  domAnimator.addFrame(frame2);
  domAnimator.addFrame(frame3);
  domAnimator.animate(1000);
}
