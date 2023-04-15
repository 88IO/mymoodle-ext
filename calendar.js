/**
  * /moodle38a/calendar/view.php で適用
  * イベントを取得し、
  *   該当イベントの提出ステータスを参照
  *   提出済であればアイコン色を緑"#66cc66"に変更
  */
$(() => {
  chrome.storage.local.get("status", item => {
    const events = $("#region-main li[data-region='event-item'] a");
    events.each((_, e) => {
      const url = new URL($(e).attr("href"));
      const id = url.searchParams.get("id");
      if (id && item.status[id])
        if (item.status[id].isSubmitted)
          $(e).children("span:first").css(
            "background-color", "#66cc66"
          );
    })
  });
});
