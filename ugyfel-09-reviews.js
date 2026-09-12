/*
 * Késleltetett, kliensoldali widget-beszúrás.
 *
 * A beágyazó kód az EMBED_HTML template literalban van. A kód szándékosan
 * külön .js fájlban él, hogy az oldal nyers HTML-je (sima HTTP GET)
 * semmilyen Trustindex-nyomot ne tartalmazzon — a widget csak JS-t futtató
 * (renderelt) ellenőrzéssel található meg.
 */

var EMBED_HTML = `
<script defer async src='https://cdn.trustindex.io/loader.js?52a7f948051052419336a4b8c83'></script>
`;

setTimeout(function () {
  var mount = document.getElementById('velemenyek-mount');
  if (!mount) return;

  var tpl = document.createElement('template');
  tpl.innerHTML = EMBED_HTML.trim();

  // Az innerHTML-lel létrehozott <script> elemek nem futnak le,
  // ezért újra kell építeni őket createScript-tel.
  tpl.content.querySelectorAll('script').forEach(function (oldScript) {
    var s = document.createElement('script');
    for (var i = 0; i < oldScript.attributes.length; i++) {
      var attr = oldScript.attributes[i];
      s.setAttribute(attr.name, attr.value);
    }
    s.textContent = oldScript.textContent;
    oldScript.parentNode.replaceChild(s, oldScript);
  });

  mount.appendChild(tpl.content);
}, 1500);
