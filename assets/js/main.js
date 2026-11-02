/* =========================================================
   张威个人作品集 · 交互脚本
   ========================================================= */
(function () {
  'use strict';

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 年份 ---------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- 滚动进度条 ---------- */
  var progress = $('.scroll-progress i');
  var ticking = false;
  function updateProgress() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var ratio = max > 0 ? (window.scrollY / max) : 0;
    if (progress) progress.style.width = Math.min(1, Math.max(0, ratio)) * 100 + '%';
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(updateProgress); }
  }, { passive: true });
  updateProgress();

  /* ---------- 移动端菜单 ---------- */
  var menuBtn = $('.menu-btn');
  var mobileMenu = $('#mobileMenu');
  function setMenu(open) {
    if (!menuBtn || !mobileMenu) return;
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
    mobileMenu.classList.toggle('is-open', open);
    mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
  }
  $$('.menu-link, .menu-resume', mobileMenu).forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 1080) setMenu(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  /* ---------- 导航高亮 ---------- */
  var navLinks = $$('.nav-link[data-nav]');
  var navMap = {};
  navLinks.forEach(function (a) { navMap[a.dataset.nav] = a; });
  var sections = $$('section[id]');

  if ('IntersectionObserver' in window && sections.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        navLinks.forEach(function (a) { a.classList.toggle('is-active', a.dataset.nav === id); });
      });
    }, { rootMargin: '-45% 0px -48% 0px', threshold: 0 });
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* ---------- 滚动出现 ---------- */
  var revealTargets = $$('.sec-head, .card, .showcase, .account, .shot, .result, .result-grid > figure, .aigen-item, .longframe, .aigen-shot, .account-grid, .grid-note');

  if ('IntersectionObserver' in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });

    revealTargets.forEach(function (el) {
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  }

  /* ---------- 视频画廊 ---------- */
  var allVideos = $$('video');

  function initGallery(root) {
    var video = $('.video', root);
    var poster = $('[data-poster]', root);
    var posterNum = $('.poster-num', root);
    var posterLabel = $('.poster-label', root);
    var ui = $('.video-ui', root);
    var screen = $('.phone-screen', root);
    var clips = $$('.clip', root);
    var progressBar = $('[data-progress]', root);
    var progressFill = progressBar ? $('i', progressBar) : null;
    var soundBtn = $('.ui-sound', root);
    var fullBtn = $('.ui-full', root);
    var fallbackLabel = root.dataset.label || '作品';
    var phone = $('.phone', root);
    var index = 0;

    if (!video || !clips.length) return;

    /* 横屏视频自动换成宽屏幕框 */
    if (phone && root.dataset.wide === '1') phone.classList.add('is-wide');
    video.addEventListener('loadedmetadata', function () {
      if (!phone) return;
      var isWide = video.videoWidth > video.videoHeight * 1.15;
      phone.classList.toggle('is-wide', isWide);
    });

    video.muted = true;
    if (ui) ui.classList.add('is-muted');

    function loadClip(i, autoplay, initial) {
      var clip = clips[i];
      if (!clip) return;
      var src = clip.dataset.src;

      if (initial) {
        /* 首屏只更新封面文案，不预加载视频文件，避免一开始就请求大文件 */
        if (posterNum) posterNum.textContent = clip.dataset.num || ('0' + (i + 1));
        if (posterLabel) posterLabel.textContent = clip.dataset.title || fallbackLabel;
      } else if (video.getAttribute('data-current') !== src) {
        video.setAttribute('data-current', src);
        video.src = src;
        video.load();
        if (progressFill) progressFill.style.width = '0%';
        if (posterNum) posterNum.textContent = clip.dataset.num || ('0' + (i + 1));
        if (posterLabel) posterLabel.textContent = clip.dataset.title || fallbackLabel;
        if (poster) poster.classList.remove('is-missing');
        var hintEl = $('.poster-hint', root);
        if (hintEl) hintEl.textContent = '点击播放';
      }

      clips.forEach(function (c, k) { c.classList.toggle('is-active', k === i); });
      index = i;

      if (!initial && autoplay) {
        var p = video.play();
        if (p && typeof p.catch === 'function') {
          p.catch(function () {
            if (poster) poster.classList.remove('is-hidden');
          });
        }
      }
    }

    clips.forEach(function (clip, i) {
      clip.addEventListener('click', function () {
        var same = clip.classList.contains('is-active') && !video.paused;
        if (same) {
          video.pause();
        } else {
          loadClip(i, true);
        }
      });
    });

    if (poster) {
      poster.addEventListener('click', function (e) {
        if (e.target.closest('.poster-play') || poster === e.currentTarget) {
          loadClip(index, true);
        }
      });
    }

    if (screen) {
      screen.addEventListener('click', function (e) {
        if (e.target.closest('.ui-btn') || e.target.closest('[data-progress]') || e.target.closest('[data-poster]')) return;
        if (!video.getAttribute('data-current')) return;
        if (video.paused) { video.play(); } else { video.pause(); }
      });
    }

    function syncPlaying(on) {
      clips.forEach(function (c, k) { c.classList.toggle('is-playing', !!on && k === index); });
    }

    video.addEventListener('playing', function () {
      if (poster) poster.classList.add('is-hidden');
      if (screen) { screen.classList.add('is-playing'); screen.classList.remove('is-paused'); }
      syncPlaying(true);
    });
    /* 视频文件缺失（如云端未上传）时给出提示，避免点了没反应 */
    video.addEventListener('error', function () {
      if (!video.getAttribute('data-current')) return;
      if (poster) { poster.classList.remove('is-hidden'); poster.classList.add('is-missing'); }
      if (screen) screen.classList.remove('is-paused', 'is-playing');
      var hint = $('.poster-hint', root);
      if (hint) hint.textContent = '该视频尚未上传，稍后补充';
      syncPlaying(false);
    });
    video.addEventListener('pause', function () {
      if (screen) { screen.classList.remove('is-playing'); screen.classList.add('is-paused'); }
      syncPlaying(false);
    });
    video.addEventListener('ended', function () {
      if (screen) { screen.classList.remove('is-playing'); screen.classList.add('is-paused'); }
      syncPlaying(false);
    });
    video.addEventListener('play', function () {
      allVideos.forEach(function (v) { if (v !== video) v.pause(); });
    });
    video.addEventListener('timeupdate', function () {
      if (!progressFill || !video.duration) return;
      progressFill.style.width = (video.currentTime / video.duration) * 100 + '%';
    });

    if (soundBtn) {
      soundBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        video.muted = !video.muted;
        if (!video.muted) { video.volume = 1; }
        if (ui) ui.classList.toggle('is-muted', video.muted);
        soundBtn.setAttribute('aria-label', video.muted ? '开启声音' : '关闭声音');
      });
    }

    if (fullBtn) {
      fullBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var target = screen || video;
        if (document.fullscreenElement) { document.exitFullscreen(); return; }
        if (target.requestFullscreen) { target.requestFullscreen(); }
        else if (target.webkitRequestFullscreen) { target.webkitRequestFullscreen(); }
        else if (video.webkitEnterFullscreen) { video.webkitEnterFullscreen(); }
      });
    }

    if (progressBar) {
      progressBar.addEventListener('click', function (e) {
        e.stopPropagation();
        if (!video.duration) return;
        var rect = progressBar.getBoundingClientRect();
        var ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
        video.currentTime = ratio * video.duration;
      });
    }

    /* 离开视口时暂停，避免后台播放 */
    if ('IntersectionObserver' in window) {
      var visObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting && !video.paused) video.pause();
        });
      }, { threshold: 0.05 });
      visObserver.observe(root);
    }

    loadClip(0, false, true);
  }

  $$('[data-gallery]').forEach(initGallery);

  /* ---------- 大图查看 ---------- */
  var lightbox = $('#lightbox');
  var lbBody = $('.lb-body', lightbox);
  var lbImg = $('.lb-body img', lightbox);
  var lbClose = $('.lb-close', lightbox);
  var lastFocus = null;

  function openLightbox(src, alt, tall) {
    if (!lightbox) return;
    lbImg.src = src;
    lbImg.alt = alt || '作品大图';
    lbBody.classList.toggle('is-tall', !!tall);
    lbBody.scrollTop = 0;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lastFocus = document.activeElement;
    if (lbClose) lbClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(function () { if (!lightbox.classList.contains('is-open')) lbImg.src = ''; }, 350);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  $$('[data-zoom]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      var img = $('img', el);
      if (!img) return;
      openLightbox(img.currentSrc || img.src, img.alt, el.classList.contains('longframe'));
    });
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        var img = $('img', el);
        if (img) openLightbox(img.currentSrc || img.src, img.alt, el.classList.contains('longframe'));
      }
    });
  });

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target === lbBody) closeLightbox();
    });
    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
    });
  }

  /* ---------- 图片解码优化 ---------- */
  $$('img[loading="lazy"]').forEach(function (img) {
    img.decoding = 'async';
  });
})();
