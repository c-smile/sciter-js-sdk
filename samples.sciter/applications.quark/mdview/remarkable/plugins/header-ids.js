/*
type Options = {
  levels: remarkabke.HeadingValue[];
  anchorClassName: string;
  anchorText: string;
  headerId(slug: string): string;
};
*/

const defaultOptions /*: Options */ = {
  levels: [1, 2, 3, 4, 5, 6],
  anchorClassName: "header-anchor",
  anchorText: "#",
  headerId: (slug) /*:string*/ => `heading-#${slug}`,
};

export function HeaderIds(options /*:Partial<Options>*/) {
  const appliedOptions /*: Options*/ = {
    ...defaultOptions,
    ...options,
  };

  return function (remarkable /*:Remarkable*/) {
    const originalOpen =
      remarkable.renderer.rules.heading_open;
    remarkable.renderer.rules.heading_open = function (
      tokens,
      idx /*:number*/
    ) {
      const hLevel = tokens[idx].hLevel;
      const content = tokens[idx + 1].content;
      const slug = slugify(content);
      const href = `#${slug}`;

      // Only anchorize supported header levels
      if (appliedOptions.levels.indexOf(hLevel) !== -1) {
        return (
          `<h${hLevel} id="${slug}">` +
          (appliedOptions.anchorText
            ? `<a class="${appliedOptions.anchorClassName}" title="${href}" href="${href}">${appliedOptions.anchorText}</a>`
            : "")
        );
      }

      return originalOpen(tokens, idx);
    };
  };
}

// Marked.js Slugger: https://github.com/markedjs/marked/blob/master/src/Slugger.js
class Slugger {
  constructor() {
    this.seen /*:Record<string, number>*/ = {};
  }

  /**
   * Convert string to unique id
   */
  slug(value /*: string*/) {
    let slug = value
      .toLowerCase()
      .trim()
      .replace(
        /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,
        ""
      )
      .replace(/\s/g, "-");

    if (this.seen.hasOwnProperty(slug)) {
      const originalSlug = slug;
      do {
        this.seen[originalSlug]++;
        slug = originalSlug + "-" + this.seen[originalSlug];
      } while (this.seen.hasOwnProperty(slug));
    }
    this.seen[slug] = 0;

    return slug;
  }
}

function slugify(str /*: string*/) {
  return new Slugger().slug(str);
}

