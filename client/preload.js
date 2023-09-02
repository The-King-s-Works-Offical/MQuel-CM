
/* $.getJSON(localeFile, data => {
  
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
    }
  }
}); */