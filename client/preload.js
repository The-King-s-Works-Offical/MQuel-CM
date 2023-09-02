const localeFile = path.join(__dirname, '../languages/en.json');

$.getJSON(localeFile, data => {
    const pageName = window.location.href.split("/").pop().split(".")[0];
    const Locale = data[pageName];
    localStorage.setItem("locale", JSON.stringify(Locale))
    for (const key in Locale) {
        if (key === "title") {
            document.title = Locale.title;
        } else if (key === "description") {
            $("meta[name='description']").attr("content", Locale.description);
        } else {
            $(`#${key}`).text(Locale[key]);
        }
    }
});


/* fetch().then((response) => {
    response.json().then((data) => {

      if (data[pageName]) {
        const Locale = data[pageName];
        document.title = Locale.title;

        console.log(document.title)


        console.log(data[pageName]);
      } else {
        console.error(pageName + " No language setting found for the page");
      }

    });
  }).catch((error) => {
    console.error(error)
  }) */