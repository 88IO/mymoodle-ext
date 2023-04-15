/**
  * /moodle38a/my/ で適用
  * 講義IDと講義名を紐付け
  * ナビゲーション>マイコース下を講義名に置換
  * 直近イベントに講義名を付加
  */
$(() => {
  // コースIDとコース名を紐付け
  var courses = {};
  // DOM取得まで待機処理が必要
  const getcources = setInterval(() => {
    if ($("a.coursename")[0] == undefined)  return;
    $("a.coursename").each((_, e) => {
      const courseId = $(e).parents("li").attr("data-course-id");
      courses[courseId] = e.innerText.split("\n")[1];
    });

    console.log(courses);

    // 直近イベントに講義名を付加
    $("section.block_calendar_upcoming div.event").each((_, e) => {
      const url = new URL($(e).find("a").attr("href"));
      const courseName = courses[url.searchParams.get("course")];
      console.log(url, url.searchParams.get("course"), courseName);
      $(e).children(".overflow-auto").prepend(`<p>${courseName}</p>`);
    });

    clearInterval(getcources);
  }, 200);

  // ナビゲーションのマイコースを講義名に変更
  $("li.type_course p.tree_item.branch a").each((_, e) => {
    $(e).text($(e).attr("title"));
  });
});
