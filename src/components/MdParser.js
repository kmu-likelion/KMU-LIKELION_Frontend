import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import MarkdownIt from 'markdown-it';

const MdParser = new MarkdownIt({
    html: false,
    linkify: true,
    typographer: true,
    highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
            try {
                console.log(str, lang);
                console.log(hljs.highlight(lang, str).value)
                return hljs.highlight(lang, str).value
            } catch (__) { console.log("error") }
        }
        return '' // use external default escaping
    },
});

export default MdParser;