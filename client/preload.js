const localeFile = path.join(__dirname, '../languages/en.json');
console.log(localeFile);
$.getJSON(localeFile, data => {
  const pageName = window.location.href.split("/").pop().split(".")[0];
  const Locale = data[pageName];
  console.log(Locale);

  //localStorage.setItem("locale", JSON.stringify(Locale))
  for (const key in Locale) {
    console.log(key);
    if (key === "title") {
      document.title = Locale.title;
    } else if (key === "description") {
      $("meta[name='description']").attr("content", Locale.description);
    } else {
      $(`#${key}`).html(Locale[key]);
      log.info($(`#${key}`))
    }
  }
});