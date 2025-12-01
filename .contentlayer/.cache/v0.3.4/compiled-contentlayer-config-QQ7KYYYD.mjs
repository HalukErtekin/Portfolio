// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
var projectComputedFields = {
  path: {
    type: "string",
    resolve: (doc) => `/${doc.locale}/projects/${doc.slug}`
  }
};
var pageComputedFields = {
  path: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`
  },
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/")
  }
};
var Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: "./projects/**/*.mdx",
  contentType: "mdx",
  fields: {
    locale: {
      type: "enum",
      options: ["tr", "en"],
      required: true
    },
    slug: {
      type: "string",
      required: true
    },
    published: {
      type: "boolean"
    },
    title: {
      type: "string",
      required: true
    },
    description: {
      type: "string",
      required: true
    },
    date: {
      type: "date"
    },
    url: {
      type: "string"
    },
    repository: {
      type: "string"
    }
  },
  computedFields: projectComputedFields
}));
var Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: "pages/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    description: {
      type: "string"
    }
  },
  computedFields: pageComputedFields
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "./content",
  documentTypes: [Page, Project],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ["word--highlighted"];
          }
        }
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section"
          }
        }
      ]
    ]
  }
});
export {
  Page,
  Project,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-QQ7KYYYD.mjs.map
