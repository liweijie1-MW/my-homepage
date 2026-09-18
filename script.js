(function () {
  'use strict';

  /* 页脚年份自动填充 */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* 移动端汉堡菜单：展开 / 收起 */
  var toggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // 点击任意导航链接后自动收起菜单
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* 滚动监听：高亮当前区块对应的导航项 */
  var sections = document.querySelectorAll('main section[id]');
  var linkMap = {};

  document.querySelectorAll('.nav-links a[href^="#"]').forEach(function (link) {
    var id = link.getAttribute('href').slice(1);
    if (id) {
      linkMap[id] = link;
    }
  });

  if ('IntersectionObserver' in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            Object.keys(linkMap).forEach(function (id) {
              linkMap[id].classList.toggle('active', id === entry.target.id);
            });
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }
})();
