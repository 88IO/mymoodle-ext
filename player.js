$(() => {
  const toc_btn = $("#scorm_toc_toggle_btn");
  if (toc_btn.attr("title") == "非表示")  toc_btn.click();
  $("#scorm_object").on("load", () => {
    const iframe = $("#scorm_object").contents();
    iframe.find("iframe").css({
      "position": "absolute",
      "width": "96%",
      "height": "96%"
    });
  });
});
