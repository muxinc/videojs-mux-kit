import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

function htmlToString(input) {
  input = input.replace(/&/g, '&amp;');
  input = input.replace(/</g, '&lt;');
  input = input.replace(/>/g, '&gt;');
  return input;
}

const codeTemplate = (previewCode) => (`
  <h2>Code</h2>
  <pre><code>${htmlToString(previewCode)}</code></pre>
`);

(() => {
  const sections = document.getElementsByTagName('section');

  [...sections].map(section => {
    // const preview = section.getElementsByClassName('preview')[0];
    // const code = section.getElementsByClassName('code')[0];

    // code.innerHTML = codeTemplate(preview.getElementsByTagName('video')[0].outerHTML);

    // console.log(preview, code);
  });
})();
