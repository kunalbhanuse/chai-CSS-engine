(function () {
  "use strict";

  function setupDemo() {
    var zone = document.getElementById("dynamic-zone");
    var button = document.getElementById("add-sample");

    if (!zone || !button || !window.ChaiCSS) {
      return;
    }

    window.ChaiCSS.observe(zone);

    button.addEventListener("click", function () {
      var card = document.createElement("div");
      card.className = "chai-bg-blue chai-text-white chai-p-16 chai-rounded-lg chai-mt-12 chai-flex chai-items-center chai-justify-between chai-gap-12";
      card.innerHTML = [
        "<strong>New DOM node</strong>",
        "<span class=\"chai-bg-white chai-text-blue chai-px-8 chai-py-4 chai-rounded-full chai-text-sm\">styled</span>"
      ].join("");
      zone.appendChild(card);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupDemo);
  } else {
    setupDemo();
  }
})();
