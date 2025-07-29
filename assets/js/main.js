
// =====================
// ドロワーメニュー
// =====================
document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.querySelector('.js-btn');    // ハンバーガー
  const closeBtn = document.querySelector('.js-close'); // ×ボタン
  const drawer = document.querySelector('.drawer');

  const openDrawer = () => {
    drawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    document.body.style.overflow = '';
    openBtn.setAttribute('aria-expanded', 'false');
    openBtn.focus();
  };

  openBtn.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
});


// =====================
// MVスライダー
// =====================
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.mv__slide');
  let current = 0;
  const interval = 4000; // 4秒ごと

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === index);
    });
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  showSlide(current);
  setInterval(nextSlide, interval);
});


// =====================
// 家族写真の入れ替え
// =====================
function updateFamilyImage() {
  const imgElement = document.querySelector('.mv__slide--family .mv__img');
  if (window.innerWidth >= 768) {
    imgElement.src = "assets/images/MV_family_pc.jpg";
  } else {
    imgElement.src = "assets/images/MV_family_sp.jpg";
  }
}

window.addEventListener('resize', updateFamilyImage);
document.addEventListener('DOMContentLoaded', updateFamilyImage);


// =====================
// ニュースフィルタ
// =====================
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.news__filter-btn');
  const newsItems = document.querySelectorAll('.news__item');

  function filterNews(category) {
    newsItems.forEach(item => {
      item.style.display = 'none';
    });

    if (category === 'all') {
      let count = 0;
      for (let i = 0; i < newsItems.length && count < 3; i++) {
        newsItems[i].style.display = '';
        count++;
      }
    } else {
      newsItems.forEach(item => {
        if (item.classList.contains(`news__item--${category}`)) {
          item.style.display = '';
        }
      });
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('news__filter-btn--active'));
      btn.classList.add('news__filter-btn--active');
      filterNews(btn.dataset.category);
    });
  });

  // 初期表示
  const activeBtn = document.querySelector('.news__filter-btn--active');
  if (activeBtn) {
    filterNews(activeBtn.dataset.category);
  }
});


// =====================
// ニュースサムネ＆矢印
// =====================



$(function () {
  const $thumbs = $('.news__thumb');
  const $arrows = $('.news__arrow');
  const $thumbsWrapper = $('.news__thumbs-wrapper');
  let current = 0;

  const thumbWidth = $thumbs.outerWidth(true); 

  function updateThumbs() {
    $thumbs.removeClass('is-active');
    $thumbs.eq(current).addClass('is-active');
    const scrollPos = thumbWidth * current; 
    $thumbsWrapper.animate({ scrollLeft: scrollPos }, 300); // スクロール位置を更新
  }

 $arrows.on('click', function () {
    if ($(this).hasClass('news__arrow--prev')) {
      current = (current - 1 + $thumbs.length) % $thumbs.length; // 前へ移動（最後から最初に戻る）
    } else {
      current = (current + 1) % $thumbs.length; // 次へ移動（最後から最初に戻る）
    }
    updateThumbs();
  });

  $thumbs.on('click', function () {
    current = $(this).index(); // サムネイルをクリックした場合
    updateThumbs();
  });

  updateThumbs(); // 初期表示
});


document.addEventListener('DOMContentLoaded', function () {
  $('.news__arrow').on('click', function () {
    $('.news__arrow').removeClass('news__arrow--active');
    $(this).addClass('news__arrow--active');
  });
});

// =====================
// ギャラリー Slick 初期化
// =====================



// $('.gallery__row--top').slick({
//   slidesToShow: 4,
//   slidesToScroll: 1,
//   autoplay: true,
//   autoplaySpeed: 0, // ←止まらず流れる
//   speed: 5000,      // ←大きい値でゆっくり流れる
//   cssEase: 'linear',
//   infinite: true,
//   arrows: false,
//   dots: false
// });

// $('.gallery__row--bottom').slick({
//   slidesToShow: 4,
//   slidesToScroll: 1,
//   autoplay: true,
//   autoplaySpeed: 0,
//   speed: 5000,
//   cssEase: 'linear',
//   infinite: true,
//   arrows: false,
//   dots: false,
//   // rtl: true
// });




// =====================
// 追従ボタンの表示/非表示
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const fixedBtns = document.querySelector(".fixed__btns");
  const footer = document.querySelector(".footer");
  const drawer = document.querySelector(".drawer");

  const updateVisibility = () => {
    const footerRect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (footerRect.top <= windowHeight || drawer.classList.contains("is-open")) {
      fixedBtns.classList.add("hidden");
    } else {
      fixedBtns.classList.remove("hidden");
    }
  };

  window.addEventListener("scroll", updateVisibility);

  const observer = new MutationObserver(updateVisibility);
  observer.observe(drawer, { attributes: true, attributeFilter: ["class"] });
});

// =====================
// faqのトグル
// =====================
document.addEventListener("DOMContentLoaded", () => {
    const faqToggles = document.querySelectorAll(".js-faq-toggle");

    faqToggles.forEach((toggle) => {
        toggle.addEventListener("click", () => {
            const answer = toggle.nextElementSibling;

            // トグルの状態を切り替え
            const isExpanded = toggle.getAttribute("aria-expanded") === "true";
            toggle.setAttribute("aria-expanded", !isExpanded);

            // 回答部分の表示・非表示を切り替え
            if (isExpanded) {
                answer.setAttribute("hidden", true);
            } else {
                answer.removeAttribute("hidden");
            }

            // アイコンの切り替え
            const icon = toggle.querySelector(".faq__icon img");
            if (icon) {
                icon.src = isExpanded
                    ? "assets/images/question__open.svg"
                    : "assets/images/question__close.svg";
            }
        });
    });
});







