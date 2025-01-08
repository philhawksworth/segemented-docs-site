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
site.data("openGraphLayout", "/layouts/og_images.jsx");

// Add data for convenience
site.data("category", "runtime", "/runtime");

// Do more expensive operations if we're building the full site
if (Deno.env.get("BUILD_TYPE") =="FULL") {

  // Use Lume's built in date function to get the last modified date of the file
  site.data("date", "Git Last Modified");;

  // Generate Open Graph images
  site.use(ogImages());
  
}

// Copy static files to output directory
site.copy("_static/", ".");

// Compile sass
site.use(sass({
  "format": "compressed"
}));




export default site;
