// service worker javascript file

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "744656776250875aea13053fa801e37d"
  },
  {
    "url": "css/main.css",
    "revision": "fa11bb0643f819d8f1f06b7ad4145b76"
  },
  {
    "url": "js/hilitor.js",
    "revision": "366e241b94d65adf8113dafd61b71e8f"
  },
  {
    "url": "js/install.js",
    "revision": "931750c474c54f6ee54a27ee61518399"
  },
  {
    "url": "js/main.js",
    "revision": "07a99477e23cb66287623e92aa5458e5"
  },
  {
    "url": "images/chalice-host-35.png",
    "revision": "f124930d95c2e9550e84aa9441c2feef"
  },
  {
    "url": "images/close-200.png",
    "revision": "7afa9d12f314bcdde904323d8b1ffc90"
  },
  {
    "url": "images/hamburger-black.png",
    "revision": "980ac4904b5f552b17dbe083c41e23d4"
  },
  {
    "url": "images/hamburger-white.png",
    "revision": "5348bd385589c55f28af99645e4b054e"
  },
  {
    "url": "images/icon-minus.png",
    "revision": "9e22618fab54fc3db906d34fdd80e9ca"
  },
  {
    "url": "images/icon-plus.png",
    "revision": "59cf45afe90605e76bbdc940dbe6a4ef"
  },
  {
    "url": "images/icon-undo.png",
    "revision": "41b1415e06f3605f6b53a7a97cdaeee4"
  },
  {
    "url": "images/magnifier-200.png",
    "revision": "fe1b3785c33b9ad3b73c08adda261fde"
  },
  {
    "url": "images/ricepaper_v3.png",
    "revision": "68ad9411a9a6c7a11f7eae2fc713b823"
  },
  {
    "url": "images/rule-of-life-1.png",
    "revision": "23e414c4664b13caff3f71362a874b89"
  },
  {
    "url": "images/julian-eymard-1.jpg",
    "revision": "edc8251fbada1b3c677a28278eb9e012"
  },
  {
    "url": "manifest.json",
    "revision": "bcd9f10e1b06944c28056e898a16cf77"
  },
  {
    "url": "images/icons/splash-512x512.png",
    "revision": "ccf46eb8d963fbbc83d8f6e62332fc88"
  },
  {
    "url": "favicon.ico",
    "revision": "e76a72ddf359da193b22487c1945bb9e"
  }
]);

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
