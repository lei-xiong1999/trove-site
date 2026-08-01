// 首次访问跟随浏览器语言，之后记住用户的选择。
(function () {
  var stored = null;
  try { stored = localStorage.getItem("trove-lang"); } catch (e) {}
  var lang = stored || ((navigator.language || "en").toLowerCase().indexOf("zh") === 0 ? "zh" : "en");
  document.documentElement.setAttribute("data-lang", lang);

  document.addEventListener("DOMContentLoaded", function () {
    var button = document.getElementById("lang");
    if (!button) return;
    var render = function () {
      button.textContent = document.documentElement.getAttribute("data-lang") === "zh" ? "English" : "中文";
    };
    render();
    button.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-lang") === "zh" ? "en" : "zh";
      document.documentElement.setAttribute("data-lang", next);
      try { localStorage.setItem("trove-lang", next); } catch (e) {}
      render();
    });
  });
})();
