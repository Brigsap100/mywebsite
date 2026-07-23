/* Kodiak site content overrides.
   Every editable value in the pages is wrapped as:
     <span data-content="some.key">filler value</span>
   This script fetches GET /api/site-content and swaps in any values found,
   so real numbers can be managed in the database without touching HTML.
   Graceful degradation: on GitHub Pages (no /api) or any failure, the
   baked-in filler text simply stays — same pattern as the form wiring. */
(function () {
  var slots = document.querySelectorAll('[data-content]');
  if (!slots.length) return;

  var controller = new AbortController();
  var timer = setTimeout(function () { controller.abort(); }, 4000);
  fetch('/api/site-content', { signal: controller.signal })
    .then(function (res) { return res.ok ? res.json() : null; })
    .then(function (data) {
      if (!data || !data.value) return;
      var map = {};
      data.value.forEach(function (row) {
        if (row && row.key) map[row.key] = row.value;
      });
      slots.forEach(function (el) {
        var key = el.getAttribute('data-content');
        if (Object.prototype.hasOwnProperty.call(map, key) && map[key] != null) {
          el.textContent = map[key];
        }
      });
    })
    .catch(function () { /* keep baked-in filler */ })
    .finally(function () { clearTimeout(timer); });
})();
