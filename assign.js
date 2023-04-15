/**
  * /moodle38a/mod/assign/view.php で適用
  * URLからフォームIDを取得
  * フォームIDをキーとして、
  *   {提出ステータス, 終了日時, 提出済判定, ページURL, 講義名}
  * をローカルストレージに追加
  */
$(() => {
  const url = new URL(location.href);
  const id = url.searchParams.get("id");

  // データを取得し、新規データ部分を上書き
  chrome.storage.local.get("status", item => {
    const status = {
      ...item.status,
      [id]: {
        submitStatus: $("table.generaltable td").eq(0).text(),
        deadline: $("table.generaltable td").eq(2).text(),
        isSubmitted: $("td.submissionstatussubmitted")[0] != undefined,
        url: location.href,
        courseName: $(".page-header-headings h1").text()
      }
    };
    chrome.storage.local.set({status: status}, () => console.log("Stored."));
  });
});
