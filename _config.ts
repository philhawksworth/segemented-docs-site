// Global lume config for the entire site

import lume from "lume/mod.ts";
import sass from "lume/plugins/sass.ts";
import ogImages from "lume/plugins/og_images.ts";

const site = lume({
  src: "./src",
  dest: "./dist",
  emptyDest: false
});

// Default layouts
site.data("layout", "layouts/page.vto");
site.data("layout", "layouts/page-api.vto", "/apis");
site.data("openGraphLayout", "/layouts/og_images.jsx");

// Add data for convenience
site.data("category", "runtime", "/runtime");

// Copy static files to output directory
site.copy("_static/", ".");

// Compile sass
site.use(sass({
  "format": "compressed"
}));

// Generate Open Graph images
site.use(ogImages());


export default site;
