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

site.data("date", "Git Last Modified");

// Copy static files to output directory
site.copy("_static/", ".");

// Compile sass
site.use(sass({
  "format": "compressed"
}));

// Generate Open Graph images
site.use(ogImages());


if (Deno.env.get("BUILD_TYPE") =="FULL") {

  site.preprocess([".html"], (pages) => {
  
    // Gather and stash the timestamps for each page
    const timestamps: Record<string, Date> = {};
    for (const page of pages) {

        let modifiedDate = null;
        try {
        const dateString = new TextDecoder().decode(
          (new Deno.Command("git", {
            args: [
              "log",
              "-1",
              "--pretty=%cI",
              "./" + page,
            ],
          })).outputSync().stdout,
        );
    
        modifiedDate = new Date(dateString);
        timestamps[page.src.path] = modifiedDate   
      } catch (e) {
        console.log(e);
      }


    }
    if(pages && pages.length) {
      Deno.writeTextFile("src/_data/timestamps.json", JSON.stringify(timestamps, null, 2));
    }
  });
  
}

export default site;
