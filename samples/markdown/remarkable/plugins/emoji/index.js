
import emoji from 'emojify.js';

export default function (md) {
    md.emoji = md.emoji || {};
    md.block.ruler.after('code', 'emoji', emoji(md), {alt: []});
};

