/**
  * popup.html で動作するJavaScript
  */

/** ローカルストレージから提出ステータスを取得し、一覧を表示 */
const update = () => {
  // tbodyの置換、子要素の削除に用いる
  const tbody = document.getElementById("status");
  tbody.parentNode.replaceChild(tbody.cloneNode(false), tbody);

  // ローカルストレージからデータ取得
  chrome.storage.local.get("status", (items) => {
    for (let [key, value] of Object.entries(items.status)) {
      // 以下DOMを構築し追加
      const tr = document.createElement("tr");
      tr.setAttribute("class", "status-item");

      const td1 = document.createElement("td");
      if (value.courseName)
        td1.textContent = value.courseName.substring(0, 5);

      const td2 = document.createElement("td");
      const a = document.createElement("a");
      a.textContent = key;
      a.setAttribute("href", value.url);
      td2.appendChild(a);

      const td3 = document.createElement("td");
      td3.textContent = value.submitStatus;

      const td4 = document.createElement("td");
      td4.textContent = value.deadline;

      const td5 = document.createElement("td");
      td5.textContent = value.isSubmitted;

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);

      document.getElementById("status").appendChild(tr);
    }
  });
};

/** ローカルストレージに保存されている提出ステータスを消去 */
const clear = () => {
  chrome.storage.local.remove("status", () => console.log("removed."));
};

const json_export = () => {
  const blob = new Blob([""], {type: "application/json"});
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "submit_status.json";
  link.click();
};

// 読み込み時とボタンクリック時にupdate実行
window.onload = update;
document.getElementById("update").addEventListener("click", update);
// ボタンクリック時にclear実行
document.getElementById("clear").addEventListener("click", clear);
