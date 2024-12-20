export function getModifiedDate(file: string) { 


  let modifiedDate = null;
    try {
    const dateString = new TextDecoder().decode(
      (new Deno.Command("git", {
        args: [
          "log",
          "-1",
          "--pretty=%cI",
          "./" + file,
        ],
      })).outputSync().stdout,
    );

    modifiedDate = new Date(dateString);
  } catch (e) {
    console.log(e);
  }

}

