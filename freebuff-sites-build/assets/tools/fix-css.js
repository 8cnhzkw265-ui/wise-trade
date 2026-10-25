// Fix mangled ** comments in CSS -> proper /* */
const fs = require('fs');
const files = ['assets/css/sections.css','assets/css/components.css'];
files.forEach(f => {
  let s = fs.readFileSync(f,'utf8');
  s = s.replace(/^\uFEFF/, '');
  // multiline headers already fixed, now single-line ** ... ** or ** ...
  s = s.split('\n').map(line => {
    const t = line.trimStart();
    if (t.startsWith('**')) {
      const indent = line.slice(0, line.length - line.trimStart().length);
      let inner = t.replace(/^\*\*\s?/, '').replace(/\s?\*\*$/, '');
      return indent + '/* ' + inner + ' */';
    }
    return line;
  }).join('\n');
  fs.writeFileSync(f, s);
  console.log('fixed ' + f);
});
