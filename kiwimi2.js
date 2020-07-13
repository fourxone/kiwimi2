// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// Author: Skvortsov Nikita Dmitrievich (nikita@4x1.pw)

window.onload = function() {
  const k_options = {
    slider: 'k_slider', // Включить слайдер (слайдер будет в блоке, для этого нужно прописать его 'id'): 0 - no, 'id' - yes;
    sliderAutoPlay: 1, // Включить автоматическое переключение изображений: 0 - off, 1 - on (по умолчанию 0);
      sliderAutoPlayTime: 3, // Через сколько секунд переключать изображения (по умолчанию 3 секунды);
    modalWindow: 1, // Включить режим полного экрана (при нажатии на изображение, будет открываться полный экран): 0 - no, 1 - yes;
  }

  // Основные элементы
  const k_version = 'v0.0.8'
  let k_images = document.querySelectorAll('img[k_modal="1"]');
  if (k_images.length == 0) {
    k_images = document.querySelectorAll('img');
  }
  const k_slider_images = document.querySelectorAll(`div#${k_options['slider']} img`);
  // console.log(k_images);
  // console.log(k_slider_images);
  const k_meta = document.querySelector('meta[name="viewport"]');
  k_screen_width = document.documentElement.clientWidth;
  k_screen_height = document.documentElement.clientHeight;
  let k_position;

  // [Модальное окно]
  if (k_options['modalWindow'] == 1) {
    // Создаём каркас модального окна;
    const k_body = document.querySelector('body'); // Ищем тело сайта;
    const k_modal_window = document.createElement('div'); // Создаём модальное окно;
    const k_modal_window_fullscreen_box = document.createElement('div'); // Создаём div в модальном окне;

    const k_modal_window_goleft = document.createElement('div'); // Создаём левый навигационный блок;
    const k_modal_window_goright = document.createElement('div'); // Создаём правый навигационный блок;

    const k_modal_window_navigation = document.createElement('div'); // Создаём блок с навигацией и текущим положением;
    const k_modal_window_description = document.createElement('div'); // Создаём блок с навигацией и текущим положением;

    // Прописываем id в созданные теги;
    k_modal_window.setAttribute('id', 'k_modal_window');
    k_modal_window_fullscreen_box.setAttribute('id', 'k_modal_window_fullscreen_box');
    k_modal_window_goleft.setAttribute('id', 'k_modal_window_goleft');
    k_modal_window_goleft.innerHTML = '<svg id="57ffe82a-b38f-4b7d-8c43-39576884824a" class="k_svg_shadow" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 106.4 199.64"><defs><style>.efffb7a8-d69f-448f-90c5-d972f71b1dcd{fill:#fff;}</style></defs><title>Go left</title><line class="efffb7a8-d69f-448f-90c5-d972f71b1dcd" x1="99.68" y1="192.92" x2="6.72" y2="99.95"/><path class="efffb7a8-d69f-448f-90c5-d972f71b1dcd" d="M48.66,95.3,80,64,130.17,13.8,141.63,2.34c6.11-6.11,15.6,3.37,9.48,9.48L119.79,43.14,69.61,93.33l-6.86,6.85,26.72,26.71,50.18,50.19,11.46,11.46c6.12,6.11-3.37,15.6-9.48,9.49l-31.32-31.32L60.12,116.52,48.66,105.06a7.06,7.06,0,0,1,0-9.76Z" transform="translate(-46.69 -0.36)"/></svg>';
    k_modal_window_goright.setAttribute('id', 'k_modal_window_goright');
    k_modal_window_goright.innerHTML = '<svg id="9a970390-43da-49a1-b58a-78cf160b8dc8" class="k_svg_shadow" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 106.4 199.64"><defs><style>.b9cf38c3-007c-44b8-b55c-a7334b9179df{fill:#fff;}</style></defs><title>Go right</title><line class="b9cf38c3-007c-44b8-b55c-a7334b9179df" x1="6.72" y1="192.92" x2="99.68" y2="99.95"/><path class="b9cf38c3-007c-44b8-b55c-a7334b9179df" d="M151.11,95.3,119.8,64,69.61,13.8,58.15,2.34C52-3.77,42.55,5.71,48.66,11.82L80,43.14l50.19,50.19,6.85,6.85-26.71,26.71L60.12,177.08,48.66,188.54c-6.11,6.11,3.37,15.6,9.49,9.49l31.32-31.32,50.18-50.19,11.46-11.46a7.06,7.06,0,0,0,0-9.76Z" transform="translate(-46.69 -0.36)"/></svg>';

    k_modal_window_navigation.setAttribute('id', 'k_modal_window_navigation');
    k_modal_window_description.setAttribute('id', 'k_modal_window_description');

    // Прописываем стиль к созданным тегам;
    k_modal_window.setAttribute('style', 'display: none');
    k_modal_window_fullscreen_box.setAttribute('position', '0');

    // Вставляем созданный каркас в тело сайта;
    k_body.append(k_modal_window); // Вставляем модальное окно в тело сайта;
    k_modal_window.append(k_modal_window_fullscreen_box); // Вставляем блок с изображениями в модальное окно;
    for (let i=0; i < k_images.length; i++) {
      const k_modal_window_fullscreen_box_block = document.createElement('div'); // Создаём блоки для изображений;
      k_modal_window_fullscreen_box_block.setAttribute('class', 'k_modal_window_fullscreen_box_block');
      k_modal_window_fullscreen_box_block.setAttribute('style', `display: inline-block; width: ${k_screen_width}px; height: ${k_screen_height}px; background-image: url('${k_images[i].getAttribute('src')}');`);
      // const k_modal_window_fullscreen_box_image = document.createElement('img'); // Создаём изображение в модальном окне;
      // k_modal_window_fullscreen_box_image.setAttribute('src', `${k_images[i].getAttribute('src')}`); // Для созданных изображений копируем путь с исходных;
      // k_modal_window_fullscreen_box_block.append(k_modal_window_fullscreen_box_image); // Вставляем созданные изображения в модальное окно;
      k_modal_window_fullscreen_box.append(k_modal_window_fullscreen_box_block);
    }
    k_modal_window.prepend(k_modal_window_goleft);
    k_modal_window.prepend(k_modal_window_goright);
    k_modal_window.prepend(k_modal_window_navigation);
    k_modal_window.prepend(k_modal_window_description);

    k_modal_window_fullscreen_box.setAttribute('style', `width: ${k_screen_width * k_images.length}px; position: absolute; z-index: 5;`);
    const k_modal_window_fullscreen_box_blocks = document.querySelectorAll('div.k_modal_window_fullscreen_box_block');

    // Сколько всего картинок и текущая позиция. Миниатюры;
    for (let i=0; i < k_modal_window_fullscreen_box_blocks.length; i++) {
      const k_block_miniatur = document.createElement('div');
      k_block_miniatur.setAttribute('class', 'k_block_miniatur');
      k_modal_window_navigation.append(k_block_miniatur);
    }

    const k_block_miniaturs = document.querySelectorAll('div.k_block_miniatur');

    // Навигационные кнопки;
    function k_slides_go(e) {
      k_position = k_modal_window_fullscreen_box.getAttribute('position'); // Читаем текущее положение слайдера;
      k_modal_window_fullscreen_box.style.left = `calc(${k_position}px + ${e}px)`; // Листаем влево/вправо;
      k_modal_window_fullscreen_box.setAttribute('position', `${+k_position + e}`); // Записываем текущее положение слайдера;
      if (k_position <= (0 - (k_screen_width * k_images.length - k_screen_width)) && e < 0) { // Если значение k_position < max и мы листаем вправо, то
        // console.log('yes')
        k_modal_window_fullscreen_box.setAttribute('position', `0`);
        k_modal_window_fullscreen_box.style.left = `0px`;
      }
      if (k_position >= 0 && e > 0) { // Если значение k_position = 0 и мы листаем влевво, то
        k_modal_window_fullscreen_box.setAttribute('position', `-${k_screen_width * k_images.length - k_screen_width}`);
        k_modal_window_fullscreen_box.style.left = `-${k_screen_width * k_images.length - k_screen_width}px`;
      }
      // Переключение Миниатюр;
      k_position = k_modal_window_fullscreen_box.getAttribute('position');
      let m_num = Math.round(k_position / window.innerWidth);
      if (m_num < 0) {
        m_num *= -1;
      }
      k_modal_window_description.innerHTML = `${k_images[m_num].getAttribute('alt')}<br><span class="k_slide_num">Slide: ${(m_num + 1) + ' / ' + k_block_miniaturs.length}</span>`;
      // console.log('m_num = ' + m_num)
      if (e < 0) {
        if (m_num > 0) {
          k_block_miniaturs[m_num - 1].style.background = 'rgba(255, 255, 255, 0)';
          k_block_miniaturs[m_num - 1].style.boxShadow = '0 0 4px rgba(0,0,0,0.4)';
        }
        if (m_num == 0) {
          k_block_miniaturs[k_block_miniaturs.length - 1].style.background = 'rgba(255, 255, 255, 0)';
          k_block_miniaturs[k_block_miniaturs.length - 1].style.boxShadow = '0 0 4px rgba(0,0,0,0.4)';
        }
        k_block_miniaturs[m_num].style.background = '#fff';
        k_block_miniaturs[m_num].style.boxShadow = '0 0 4px rgba(0,0,0,0.8)';
      } else {
        if (m_num > 0) {
          if (m_num != (k_block_miniaturs.length - 1)) {
            k_block_miniaturs[m_num + 1].style.background = 'rgba(255, 255, 255, 0)';
            k_block_miniaturs[m_num + 1].style.boxShadow = '0 0 4px rgba(0,0,0,0.4)';
          }
        }
        if (m_num == 0) {
          k_block_miniaturs[k_block_miniaturs.length - 1].style.background = 'rgba(255, 255, 255, 0)';
          k_block_miniaturs[k_block_miniaturs.length - 1].style.boxShadow = '0 0 4px rgba(0,0,0,0.4)';
          k_block_miniaturs[m_num + 1].style.background = 'rgba(255, 255, 255, 0)';
          k_block_miniaturs[m_num + 1].style.boxShadow = '0 0 4px rgba(0,0,0,0.4)';
        }
        if (m_num == (k_block_miniaturs.length - 1)) {
          k_block_miniaturs[0].style.background = 'rgba(255, 255, 255, 0)';
          k_block_miniaturs[0].style.boxShadow = '0 0 4px rgba(0,0,0,0.4)';
        }
        k_block_miniaturs[m_num].style.background = '#fff';
        k_block_miniaturs[m_num].style.boxShadow = '0 0 4px rgba(0,0,0,0.8)';
      }
    }

    // Переход к слайду по клику миниатюры;
    for (let i=0; i < k_block_miniaturs.length; i++) {
      k_block_miniaturs[i].addEventListener('click', function() {
        // console.log('click i = ' + i);
        k_modal_window_description.innerHTML = `${k_images[i].getAttribute('alt')}<br><span class="k_slide_num">Slide: ${(i + 1) + ' / ' + k_block_miniaturs.length}</span>`;
        if (i == 0) {
          k_modal_window_fullscreen_box.style.left = `0px`; // Листаем влево/вправо;
          k_modal_window_fullscreen_box.setAttribute('position', `0`); // Записываем текущее положение слайдера;
          for (let h=0; h < k_block_miniaturs.length; h++) {
            k_block_miniaturs[h].style.background = 'rgba(255, 255, 255, 0)';
            k_block_miniaturs[h].style.boxShadow = '0 0 4px rgba(0,0,0,0.4)';
          }
          k_block_miniaturs[i].style.background = '#fff';
          k_block_miniaturs[i].style.boxShadow = '0 0 4px rgba(0,0,0,0.8)';
        } else {
          k_modal_window_fullscreen_box.style.left = `calc(${-k_screen_width * i}px)`; // Листаем влево/вправо;
          k_modal_window_fullscreen_box.setAttribute('position', `${-k_screen_width * i}`); // Записываем текущее положение слайдера;
          for (let j=0; j < k_block_miniaturs.length; j++) {
            k_block_miniaturs[j].style.background = 'rgba(255, 255, 255, 0)';
            k_block_miniaturs[j].style.boxShadow = '0 0 4px rgba(0,0,0,0.4)';
          }
          k_block_miniaturs[i].style.background = '#fff';
          k_block_miniaturs[i].style.boxShadow = '0 0 4px rgba(0,0,0,0.8)';
        }
      })
    }

    k_modal_window_goleft.addEventListener('click', function() { // Кнопка влево;
      k_slides_go(k_screen_width);
    })

    k_modal_window_goright.addEventListener('click', function() { // Кнопка вправо;
      k_slides_go(-k_screen_width);
    })

    // Автоплэй;
    if (k_options['modalAutoPlay'] == 1) {
      setInterval(function() {k_slides_go(-k_screen_width)}, k_options['modalAutoPlayTime']*1000);
    }

    let checkOpen = 0;
    let k_current_scroll_y;

    // Открытие модального окна;
    if (checkOpen == 0) {
      for (let i=0; i < k_images.length; i++) {
        k_images[i].addEventListener('click', function() {
          document.body.setAttribute('style', 'touch-action: none;')
          // k_modal_window.style.touchAction = 'auto';
          k_modal_window.setAttribute('style', 'display: block;'); // Меняем стиль и открываем модальное окно;
          k_slides_go(-k_screen_width * i);
          k_modal_window_description.innerHTML = `${k_images[i].getAttribute('alt')}<br><span class="k_slide_num">Slide: ${(i + 1) + ' / ' + k_block_miniaturs.length}</span>`;
          k_block_miniaturs[i].style.background = '#fff';
          // Позиция и размеры;
          k_screen_width = document.documentElement.clientWidth;
          k_screen_height = document.documentElement.clientHeight;
          k_current_scroll_y = document.documentElement.scrollTop;

          // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
          let vh = window.innerHeight * 0.01;
          // Then we set the value in the --vh custom property to the root of the document
          document.documentElement.style.setProperty('--vh', `${vh}px`);

          k_modal_window_fullscreen_box.style.width = `${k_screen_width * k_images.length}px`; // Прописываем ширину полноэкранному блоку в модальном окне;
            const k_modal_window_fullscreen_box_block_resize = document.querySelectorAll('div.k_modal_window_fullscreen_box_block')
            for (let i=0; i < k_modal_window_fullscreen_box_block_resize.length; i++) {
              // Прописываем новую ширину блокам с картинками;
              k_modal_window_fullscreen_box_block_resize[i].setAttribute('style', `display: inline-block; width: ${k_screen_width}px; height: calc(var(--vh, 1vh) * 100); background-image: url('${k_images[i].getAttribute('src')}');`);
          }
          // Анимация / Animation;
          setTimeout(function(){k_modal_window_description.style.top = '20px';},400);
          setTimeout(function(){k_modal_window_fullscreen_box_close.style.top = '20px';},400);
          setTimeout(function(){k_modal_window_scale_plus.style.top = '20px';},400);
          setTimeout(function(){k_modal_window_goleft.style.left = '20px';},600);
          setTimeout(function(){k_modal_window_goright.style.right = '20px';},600);
          setTimeout(function(){k_modal_window_navigation.style.opacity = '1';},800);
          // Ставим новый meta тег;
          k_meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
          checkOpen = 1;
        });
      };
    };

    // Закрытие модального окна
    const k_modal_window_fullscreen_box_close = document.createElement('div');
    k_modal_window_fullscreen_box_close.setAttribute('id', 'k_modal_window_fullscreen_box_close');
    k_modal_window_fullscreen_box_close.innerHTML = '<svg id="a51f4591-2ad0-4603-b2c0-b1c20b87f54f" class="k_svg_shadow" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 198.16 200.01"><defs><style>.c703cfc0-9255-4dfd-b9f6-392939d6d582{fill:#fff;}</style></defs><title>Close</title><line class="c703cfc0-9255-4dfd-b9f6-392939d6d582" x1="185.62" y1="200.01" x2="98.89" y2="113.29"/><path class="c703cfc0-9255-4dfd-b9f6-392939d6d582" d="M195.16,177.38l-75.72-75.71-2.29-2.29q33.49-33.51,67-67l11-11c11.41-11.41-6.29-29.11-17.7-17.7L101.74,79.39l-2.29,2.29L33.09,15.31l-11-11C10.67-7.11-7,10.58,4.37,22L80.09,97.71,82.38,100l-67,67-11,11c-11.4,11.4,6.29,29.11,17.7,17.7L97.79,120l2.29-2.29,66.37,66.37,11,11C188.87,206.49,206.57,188.79,195.16,177.38Z" transform="translate(-0.69 0.01)"/></svg>';
    k_modal_window.prepend(k_modal_window_fullscreen_box_close);

    const k_modal_window_scale_img = document.createElement('div');
    k_modal_window_scale_img.setAttribute('id', 'k_modal_window_scale_img');
    k_modal_window.append(k_modal_window_scale_img);

    const k_modal_window_scale_plus = document.createElement('div');
    k_modal_window_scale_plus.setAttribute('id', 'k_modal_window_scale_plus');
    k_modal_window_scale_plus.innerHTML = '<svg id="c445040e-14fa-499c-85bb-6a5773eae12d" class="k_svg_shadow" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 199.84 199.77"><defs><style>.cfda8cc8-a710-4356-887f-b4ac988b64d1{fill:#fff;}</style></defs><title>Scale</title><path class="cfda8cc8-a710-4356-887f-b4ac988b64d1" d="M196.16,178.38C173.41,155.64,180.75,162.75,158,140l-.51,0a87.53,87.53,0,1,0-17.41,17.42c0,.19-.06.37-.08.56,18.86,18.86,8.59,8.21,27.45,27.07l11,11C189.87,207.49,207.57,189.79,196.16,178.38ZM87.5,155A67.5,67.5,0,1,1,155,87.5,67.5,67.5,0,0,1,87.5,155Z"/><path class="cfda8cc8-a710-4356-887f-b4ac988b64d1" d="M122.67,77H96V51.22a8,8,0,0,0-16,0V77H50.67a8,8,0,0,0,0,16H80v30.22a8,8,0,0,0,16,0V93h26.67a8,8,0,0,0,0-16Z"/></svg>';
    k_modal_window.prepend(k_modal_window_scale_plus);

    const k_modal_window_scale_plus_two = document.createElement('div');
    k_modal_window_scale_plus_two.setAttribute('id', 'k_modal_window_scale_plus_two');
    k_modal_window_scale_plus_two.innerHTML = '<svg id="c445040e-14fa-499c-85bb-6a5773eae12d" class="k_svg_shadow" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 199.84 199.77"><defs><style>.cfda8cc8-a710-4356-887f-b4ac988b64d1{fill:#fff;}</style></defs><title>scaleplus</title><path class="cfda8cc8-a710-4356-887f-b4ac988b64d1" d="M196.16,178.38C173.41,155.64,180.75,162.75,158,140l-.51,0a87.53,87.53,0,1,0-17.41,17.42c0,.19-.06.37-.08.56,18.86,18.86,8.59,8.21,27.45,27.07l11,11C189.87,207.49,207.57,189.79,196.16,178.38ZM87.5,155A67.5,67.5,0,1,1,155,87.5,67.5,67.5,0,0,1,87.5,155Z"/><path class="cfda8cc8-a710-4356-887f-b4ac988b64d1" d="M122.67,77H96V51.22a8,8,0,0,0-16,0V77H50.67a8,8,0,0,0,0,16H80v30.22a8,8,0,0,0,16,0V93h26.67a8,8,0,0,0,0-16Z"/></svg>';
    k_modal_window_scale_img.prepend(k_modal_window_scale_plus_two);

    const k_modal_window_scale_minus = document.createElement('div');
    k_modal_window_scale_minus.setAttribute('id', 'k_modal_window_scale_minus');
    k_modal_window_scale_minus.innerHTML = '<svg id="a0d0bda2-9f32-496e-a241-550898f274da" class="k_svg_shadow" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 199.84 199.77"><defs><style>.bda92906-6b15-4118-81cb-a852ea6c71d1{fill:#fff;}</style></defs><title>Безымянный-2</title><path class="bda92906-6b15-4118-81cb-a852ea6c71d1" d="M196.16,178.38C173.41,155.64,180.75,162.75,158,140l-.51,0a87.53,87.53,0,1,0-17.41,17.42c0,.19-.06.37-.08.56,18.86,18.86,8.59,8.21,27.45,27.07l11,11C189.87,207.49,207.57,189.79,196.16,178.38ZM87.5,155A67.5,67.5,0,1,1,155,87.5,67.5,67.5,0,0,1,87.5,155Z"/><path class="bda92906-6b15-4118-81cb-a852ea6c71d1" d="M123,77H51a8,8,0,0,0,0,16h72a8,8,0,0,0,0-16Z"/></svg>';
    k_modal_window_scale_img.prepend(k_modal_window_scale_minus);

    const k_modal_window_info = document.createElement('div');
    k_modal_window_info.setAttribute('id', 'k_modal_window_info');
    k_modal_window_info.setAttribute('data-title', `Kiwi MI 2 ${k_version} © Skvortsov Nikita Dmitrievich 2020`);
    k_modal_window_info.innerHTML = '<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="k_svg_shadow" viewBox="0 0 48 48" version="1.1"><g id="surface4624411"><path style=" stroke:none;fill-rule:nonzero;fill:#808080;fill-opacity:1;" d="M 24 0 C 10.742188 0 0 10.742188 0 24 C 0 37.257812 10.742188 48 24 48 C 37.257812 48 48 37.257812 48 24 C 48 10.742188 37.257812 0 24 0 Z M 24 4 C 35.046875 4 44 12.953125 44 24 C 44 35.046875 35.046875 44 24 44 C 12.953125 44 4 35.046875 4 24 C 4 12.953125 12.953125 4 24 4 Z M 24 11.625 C 23.632812 11.625 23.328125 11.617188 23 11.6875 C 22.671875 11.757812 22.367188 11.9375 22.125 12.125 C 21.882812 12.3125 21.703125 12.570312 21.5625 12.875 C 21.421875 13.179688 21.375 13.539062 21.375 14 C 21.375 14.453125 21.421875 14.8125 21.5625 15.125 C 21.703125 15.4375 21.882812 15.6875 22.125 15.875 C 22.367188 16.0625 22.671875 16.171875 23 16.25 C 23.328125 16.328125 23.632812 16.375 24 16.375 C 24.359375 16.375 24.742188 16.328125 25.0625 16.25 C 25.382812 16.171875 25.632812 16.0625 25.875 15.875 C 26.117188 15.6875 26.296875 15.4375 26.4375 15.125 C 26.578125 14.820312 26.6875 14.453125 26.6875 14 C 26.6875 13.539062 26.578125 13.179688 26.4375 12.875 C 26.296875 12.570312 26.117188 12.3125 25.875 12.125 C 25.632812 11.9375 25.382812 11.757812 25.0625 11.6875 C 24.742188 11.617188 24.359375 11.625 24 11.625 Z M 21.5625 18.3125 L 21.5625 36.25 L 26.4375 36.25 L 26.4375 18.3125 Z M 21.5625 18.3125 "/></g></svg>';
    k_modal_window.prepend(k_modal_window_info);

    function k_modal_window_close() {
      document.body.removeAttribute('style');
      k_modal_window.setAttribute('style', 'display: none');
      k_modal_window_fullscreen_box.setAttribute('position', `0`);
      k_modal_window_fullscreen_box.style.left = `0px`;
      for (let i=0; i < k_block_miniaturs.length; i++) {
        k_block_miniaturs[i].style.background = 'rgba(255, 255, 255, 0)';
        k_block_miniaturs[i].style.boxShadow = '0 0 4px rgba(0,0,0,0.4)';
      }
      k_modal_window_fullscreen_box.style.top = '0';
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
      k_meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1');
      k_modal_window_description.style.top = '-40px';
      k_modal_window_fullscreen_box_close.style.top = '-40px';
      k_modal_window_scale_plus.style.top = '-40px';
      k_modal_window_goleft.style.left = '-40px';
      k_modal_window_goright.style.right = '-40px';
      k_modal_window_navigation.style.opacity = '0';
      checkOpen = 0;
      document.documentElement.scrollTop = k_current_scroll_y;
      if (k_options['slider'] != 0) {
        k_slider_screen_resize();
      }
    }

    k_modal_window_fullscreen_box_close.addEventListener('click', function() {
      k_modal_window_close();
    });

    k_modal_window_scale_plus.addEventListener('click', function() {
      k_position = k_modal_window_fullscreen_box.getAttribute('position');
      let m_num = Math.round(k_position / window.innerWidth);
      if (m_num < 0) {
        m_num *= -1;
      }
      // console.log(m_num)
      k_modal_window_scale_img.style.display = 'block';
      k_modal_window_scale_img.style.backgroundImage = `url('${k_images[m_num].getAttribute('src')}')`;
      k_modal_window_scale_minus.style.display = 'block';
      k_modal_window_scale_minus.style.transition = 'null';
      k_modal_window_scale_plus_two.style.transition = 'null';
    });

    k_modal_window_scale_img.setAttribute('zoom', '200');

    k_modal_window_scale_plus_two.addEventListener('click', function() {
      let k_zoom = k_modal_window_scale_img.getAttribute('zoom');
      k_modal_window_scale_img.style.width = `calc(100% + ${k_zoom}px`;
      k_modal_window_scale_img.style.height = `calc(100% + ${k_zoom}px`;
      k_modal_window_scale_minus.style.right = `calc(20px + ${k_zoom}px)`;
      k_modal_window_scale_plus_two.style.right = `calc(100px + ${k_zoom}px)`;
      k_zoom = +k_zoom + 200;
      k_modal_window_scale_img.setAttribute('zoom', `${k_zoom}`);
    });

    let k_i = 0;

    k_modal_window_scale_minus.addEventListener('click', function() {
      k_zoom = k_modal_window_scale_img.getAttribute('zoom');
      if (k_i == 0) {
        k_zoom = +k_zoom - 400;
      } else {
        k_zoom = +k_zoom - 200;
      }
      k_i += 1;
      if (k_zoom > 0) {
        k_modal_window_scale_img.style.width = `calc(100% + ${k_zoom}px`;
        k_modal_window_scale_img.style.height = `calc(100% + ${k_zoom}px`;
        k_modal_window_scale_minus.style.right = `calc(20px + ${k_zoom}px)`;
        k_modal_window_scale_plus_two.style.right = `calc(100px + ${k_zoom}px)`;
        k_modal_window_scale_img.setAttribute('zoom', `${k_zoom}`);
      } else {
        k_modal_window_scale_img.style.display = 'none';
        k_modal_window_scale_img.style.backgroundImage = `url('')`;
        k_modal_window_scale_minus.style.display = 'none';
        k_modal_window_scale_img.setAttribute('x', '0');
        k_modal_window_scale_img.setAttribute('y', '0');
        k_modal_window_scale_img.style.backgroundPosition = `0px 0px`;
        k_modal_window_scale_img.style.width = `100%`;
        k_modal_window_scale_img.style.height = `100%`;
        k_modal_window_scale_minus.style.right = `20px`;
        k_modal_window_scale_plus_two.style.right = `100px`;
        k_modal_window_scale_minus.style.transition = 'all 0.3s cubic-bezier(0.46, 0.03, 0.52, 0.96)';
        k_modal_window_scale_plus_two.style.transition = 'all 0.3s cubic-bezier(0.46, 0.03, 0.52, 0.96)';
        k_i = 0;
      }
    })

    let scaleStartX;
    let scaleStartY;
    let scaleCheck = 0;

    let scaleCurrentX;
    let scaleCurrentY;

    k_modal_window_scale_img.setAttribute('x', '0');
    k_modal_window_scale_img.setAttribute('y', '0');

    k_modal_window_scale_img.addEventListener('mousedown', function(e) {
      const k_img_x = k_modal_window_scale_img.getAttribute('x');
      const k_img_y = k_modal_window_scale_img.getAttribute('y');
      scaleStartX = e.pageX - +k_img_x;
      scaleStartY = e.pageY - +k_img_y;
      // console.log(e.pageX, e.pageY, scaleStartX, scaleStartY)
      scaleCheck = 1;
    })

    k_modal_window_scale_img.addEventListener('mousemove', function(e) {
      if (scaleCheck == 1) {
        scaleCurrentX = e.pageX - scaleStartX;
        scaleCurrentY = e.pageY - scaleStartY;
        k_modal_window_scale_img.style.backgroundPosition = `${scaleCurrentX}px ${scaleCurrentY}px`;
      }
    })

    k_modal_window_scale_img.addEventListener('mouseup', function(e) {
      scaleCheck = 0;
      k_modal_window_scale_img.style.backgroundPosition = `${scaleCurrentX}px ${scaleCurrentY}px`;
      if (scaleCurrentX >= 1 || scaleCurrentX <= -1) {
        k_modal_window_scale_img.setAttribute('x', `${scaleCurrentX}`);
        k_modal_window_scale_img.setAttribute('y', `${scaleCurrentY}`);
        scaleCurrentX = 0;
        scaleCurrentY = 0;
      }
    })

    let vvscale;

    k_modal_window_scale_img.addEventListener('touchstart', function(e) {
      const k_img_x = k_modal_window_scale_img.getAttribute('x');
      const k_img_y = k_modal_window_scale_img.getAttribute('y');
      scaleStartX = e.changedTouches[0].pageX - +k_img_x;
      scaleStartY = e.changedTouches[0].pageY - +k_img_y;
      if (e.touches.length === 2) {
        alert("touch zoom action not working yet");
      }
      scaleCheck = 1;
    })

    // let k_zoom_check = 1;

    k_modal_window_scale_img.addEventListener('touchmove', function(e) {
      if (scaleCheck == 1 && e.touches.length !== 2) {
        scaleCurrentX = e.changedTouches[0].pageX - scaleStartX;
        scaleCurrentY = e.changedTouches[0].pageY - scaleStartY;
        k_modal_window_scale_img.style.backgroundPosition = `${scaleCurrentX}px ${scaleCurrentY}px`;
      }
    })

    k_modal_window_scale_img.addEventListener('touchend', function(e) {
      scaleCheck = 0;
      // k_zoom_check = 1;
      k_modal_window_scale_img.style.backgroundPosition = `${scaleCurrentX}px ${scaleCurrentY}px`;
      if (scaleCurrentX >= 1 || scaleCurrentX <= -1) {
        k_modal_window_scale_img.setAttribute('x', `${scaleCurrentX}`);
        k_modal_window_scale_img.setAttribute('y', `${scaleCurrentY}`);
        // k_modal_window_scale_img.setAttribute('zoom', `${+k_touch_zoom + scale_img_hypotenuse}`);
      }
    })

    // Перелистывания с помощью мышки и тач действий;
    let startX;
    let moveX;
    let simpleMoveX;
    let newMoveX;

    let startY;
    let moveY;
    let simpleMoveY;

    let switchX = 0;
    let switchY = 0;

    for (let k_block of k_modal_window_fullscreen_box_blocks) {
      // Мышка;

      k_block.addEventListener('mousedown', function(e) {
        startX = e.pageX;
        startY = e.pageY;
        // console.log(startX, startY);
        k_position = k_modal_window_fullscreen_box.getAttribute('position'); // Читаем текущее положение слайдера;
      });

      k_block.addEventListener('mousemove', function(e) {
        if (startX > 0 || startY > 0) {
          moveX = e.pageX;
          moveY = e.pageY;
          simpleMoveX = moveX - startX;
          simpleMoveY = moveY - startY;
        }
        if (startX > 0 && (simpleMoveX > 25 || simpleMoveX < -25) && switchX == 0) {
          // console.log('simpleMoveX = ' + simpleMoveX);
          switchY = 1;
          k_modal_window_fullscreen_box.style.transition = 'null';
          newMoveX = +k_position + ((moveX - startX) * 1.2);
          k_modal_window_fullscreen_box.style.top = `0px`;
          k_modal_window_fullscreen_box.style.left = `calc(${newMoveX}px)`; // Листаем до новой позиции;
        }
        if (startY > 0 && (simpleMoveY > 50 || simpleMoveY < -50) && switchY == 0) {
          // console.log('simpleMoveY = ' + simpleMoveY);
          switchX = 1;
          k_modal_window_fullscreen_box.style.transition = 'null';
          k_modal_window_fullscreen_box.style.left = `calc(${k_position}px)`; // Листаем до новой позиции;
          k_modal_window_fullscreen_box.style.top = `calc(${simpleMoveY}px)`; // Листаем до новой позиции;
          if (simpleMoveY < 0) {
            simpleMoveY *= (-1);
          }
          k_modal_window.style.opacity = `${1 - (simpleMoveY / 1000)}`
        }
      });

      k_block.addEventListener('mouseup', function(e) {
        startX = 0;
        if (simpleMoveX > 50 && switchX == 0) {
          k_slides_go(k_screen_width)
        } else if (simpleMoveX >= -50 && simpleMoveX <= 50 && switchX == 0) {
          k_position = k_modal_window_fullscreen_box.getAttribute('position'); // Читаем текущее положение слайдера;
          k_modal_window_fullscreen_box.style.left = `${k_position}px`; // Листаем до новой позиции;
        } else if (simpleMoveX < -50 && switchX == 0) {
          k_slides_go(-k_screen_width)
        }
        startY = 0;
        if (simpleMoveY > 50 && switchY == 0) {
          // alert('1')
          k_modal_window_close();
        } else if (simpleMoveY < -50 && switchY == 0) {
          // alert('2')
          k_modal_window_close();
        } else {
          k_modal_window_fullscreen_box.style.top = `0px`;
        }
        switchX = 0;
        switchY = 0;
        simpleMoveX = 0;
        simpleMoveY = 0;
        k_modal_window.style.opacity = '1';
        // k_modal_window_fullscreen_box.setAttribute('position', `${newMoveX}`); // Записываем текущее положение слайдера;
        k_modal_window_fullscreen_box.style.transition = 'all 0.6s cubic-bezier(0.46, 0.03, 0.52, 0.96)';
      });

      // Тач;

      k_block.addEventListener('touchstart', function(e) {
        startX = e.changedTouches[0].pageX;
        startY = e.changedTouches[0].pageY;
        // console.log(startX);
        k_position = k_modal_window_fullscreen_box.getAttribute('position'); // Читаем текущее положение слайдера;
        if (e.touches.length === 2) {
          alert("touch zoom action not working yet");
        }
      }, false);

      k_block.addEventListener('touchmove', function(e) {
        if (startX > 0 || startY > 0) {
          moveX = e.changedTouches[0].pageX;
          moveY = e.changedTouches[0].pageY;
          simpleMoveX = moveX - startX;
          simpleMoveY = moveY - startY;
        }
        if (startX > 0 && (simpleMoveX > 25 || simpleMoveX < -25) && switchX == 0) {
          switchY = 1;
          k_modal_window_fullscreen_box.style.transition = 'null';
          newMoveX = +k_position + ((moveX - startX) * 1.2);
          // console.log('simpleMoveX = ' + simpleMoveX);
          k_modal_window_fullscreen_box.style.top = `0px`;
          k_modal_window_fullscreen_box.style.left = `calc(${newMoveX}px)`; // Листаем до новой позиции;
        }
        if (startY > 0 && (simpleMoveY > 50 || simpleMoveY < -50) && switchY == 0) {
          switchX = 1;
          k_modal_window_fullscreen_box.style.transition = 'null';
          // console.log('simpleMoveY = ' + simpleMoveY);
          k_modal_window_fullscreen_box.style.left = `calc(${k_position}px)`; // Листаем до новой позиции;
          k_modal_window_fullscreen_box.style.top = `calc(${simpleMoveY}px)`; // Листаем до новой позиции;
          if (simpleMoveY < 0) {
            simpleMoveY *= (-1);
          }
          k_modal_window.style.opacity = `${1 - (simpleMoveY / 1000)}`
        }
      }, false);

      k_block.addEventListener('touchend', function(e) {
        startX = 0;
        if (simpleMoveX > 50 && switchX == 0) {
          k_slides_go(k_screen_width)
        } else if (simpleMoveX >= -50 && simpleMoveX <= 50 && switchX == 0) {
          k_position = k_modal_window_fullscreen_box.getAttribute('position'); // Читаем текущее положение слайдера;
          k_modal_window_fullscreen_box.style.left = `${k_position}px`; // Листаем до новой позиции;
        } else if (simpleMoveX < -50 && switchX == 0) {
          k_slides_go(-k_screen_width)
        }
        startY = 0;
        if (simpleMoveY > 50 && switchY == 0) {
          k_modal_window_close();
        } else if (simpleMoveY < -50 && switchY == 0) {
          k_modal_window_close();
        } else {
          k_modal_window_fullscreen_box.style.top = `0px`;
        }
        switchX = 0;
        switchY = 0;
        simpleMoveX = 0;
        simpleMoveY = 0;
        k_modal_window.style.opacity = '1';
        // k_modal_window_fullscreen_box.setAttribute('position', `${newMoveX}`); // Записываем текущее положение слайдера;
        k_modal_window_fullscreen_box.style.transition = 'all 0.6s cubic-bezier(0.46, 0.03, 0.52, 0.96)';
      }, false);
    }

    // Изменение размера экрана
    window.addEventListener('resize',function() {
      k_meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1');
      k_modal_window_fullscreen_box.style.transition = 'null';
      const k_position_old = k_modal_window_fullscreen_box.getAttribute('position') / k_screen_width; // Узнаём номер слайда из старых данных позиции
      k_screen_width = document.documentElement.clientWidth;
      k_screen_height = document.documentElement.clientHeight;

      // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
      let vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`);

        k_modal_window_fullscreen_box.style.width = `${k_screen_width * k_images.length}px`; // Прописываем ширину полноэкранному блоку в модальном окне;
        const k_modal_window_fullscreen_box_block_resize = document.querySelectorAll('div.k_modal_window_fullscreen_box_block')
        for (let i=0; i < k_modal_window_fullscreen_box_block_resize.length; i++) {
          // Прописываем новую ширину блокам с картинками;
          k_modal_window_fullscreen_box_block_resize[i].setAttribute('style', `display: inline-block; width: ${k_screen_width}px; height: calc(var(--vh, 1vh) * 100); background-image: url('${k_images[i].getAttribute('src')}');`);
        }

      const k_position_new = k_position_old * k_screen_width; // Узнаём позицию и положение текущего слайда с новыми данными позиции;
      k_modal_window_fullscreen_box.style.left = `calc(${k_position_new}px)`; // Листаем до новой позиции;
      k_modal_window_fullscreen_box.setAttribute('position', `${k_position_new}`); // Записываем текущее положение слайдера;
      k_meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
      setTimeout(function() {k_modal_window_fullscreen_box.style.transition = 'all 0.6s cubic-bezier(0.46, 0.03, 0.52, 0.96)'}, 100);
    })
  }

  // [Слайдер]
  if (k_options['slider'] != 0) {
    let k_slider_position;

    // Создаём каркас слайдера;
    const k_slider = document.querySelector(`div#${k_options['slider']}`); // Ищем блок для слайдера;
    k_slider.style = 'background-color: #000; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;'

    let k_slider_width = k_slider.offsetWidth;
    let k_slider_height = k_slider.offsetHeight;

    const k_slider_box = document.createElement('div'); // Создаём div в блоке для слайдера;
    const k_slider_box_back = document.createElement('div'); // Создаём фон для slider_box;

    const k_slider_goleft = document.createElement('div'); // Создаём левый навигационный блок;
    const k_slider_goright = document.createElement('div'); // Создаём правый навигационный блок;

    const k_slider_navigation = document.createElement('div'); // Создаём блок с навигацией и текущим положением;
    const k_slider_description = document.createElement('div'); // Создаём блок с навигацией и текущим положением;

    const k_slider_autoplay = document.createElement('div') // Создаём блок с переключением авто режима;
    const k_slider_autoplay_check = document.createElement('div') // Создаём переключение;
    const k_slider_autoplay_name = document.createElement('div') // Создаём блок с названием переключателя;
    const k_slider_url_block = document.createElement('div') // Создаём блок с ссылкой (если указано в атрибутах);

    // Прописываем id в созданные теги;
    k_slider_box.setAttribute('id', 'k_slider_box');
    k_slider_box_back.setAttribute('id', 'k_slider_box_back');
    k_slider_goleft.setAttribute('id', 'k_slider_goleft');
    k_slider_goleft.innerHTML = '<svg id="57ffe82a-b38f-4b7d-8c43-39576884824a" class="k_svg_shadow" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 106.4 199.64"><defs><style>.efffb7a8-d69f-448f-90c5-d972f71b1dcd{fill:#fff;}</style></defs><title>Go left</title><line class="efffb7a8-d69f-448f-90c5-d972f71b1dcd" x1="99.68" y1="192.92" x2="6.72" y2="99.95"/><path class="efffb7a8-d69f-448f-90c5-d972f71b1dcd" d="M48.66,95.3,80,64,130.17,13.8,141.63,2.34c6.11-6.11,15.6,3.37,9.48,9.48L119.79,43.14,69.61,93.33l-6.86,6.85,26.72,26.71,50.18,50.19,11.46,11.46c6.12,6.11-3.37,15.6-9.48,9.49l-31.32-31.32L60.12,116.52,48.66,105.06a7.06,7.06,0,0,1,0-9.76Z" transform="translate(-46.69 -0.36)"/></svg>';
    k_slider_goright.setAttribute('id', 'k_slider_goright');
    k_slider_goright.innerHTML = '<svg id="9a970390-43da-49a1-b58a-78cf160b8dc8" class="k_svg_shadow" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 106.4 199.64"><defs><style>.b9cf38c3-007c-44b8-b55c-a7334b9179df{fill:#fff;}</style></defs><title>Go right</title><line class="b9cf38c3-007c-44b8-b55c-a7334b9179df" x1="6.72" y1="192.92" x2="99.68" y2="99.95"/><path class="b9cf38c3-007c-44b8-b55c-a7334b9179df" d="M151.11,95.3,119.8,64,69.61,13.8,58.15,2.34C52-3.77,42.55,5.71,48.66,11.82L80,43.14l50.19,50.19,6.85,6.85-26.71,26.71L60.12,177.08,48.66,188.54c-6.11,6.11,3.37,15.6,9.49,9.49l31.32-31.32,50.18-50.19,11.46-11.46a7.06,7.06,0,0,0,0-9.76Z" transform="translate(-46.69 -0.36)"/></svg>';

    const k_slider_info = document.createElement('div');
    k_slider_info.setAttribute('id', 'k_slider_info');
    k_slider_info.setAttribute('data-title', `Kiwi MI 2 ${k_version} © Skvortsov Nikita Dmitrievich 2020`);
    k_slider_info.innerHTML = '<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="k_svg_shadow" viewBox="0 0 48 48" version="1.1"><g id="surface4624411"><path style=" stroke:none;fill-rule:nonzero;fill:#808080;fill-opacity:1;" d="M 24 0 C 10.742188 0 0 10.742188 0 24 C 0 37.257812 10.742188 48 24 48 C 37.257812 48 48 37.257812 48 24 C 48 10.742188 37.257812 0 24 0 Z M 24 4 C 35.046875 4 44 12.953125 44 24 C 44 35.046875 35.046875 44 24 44 C 12.953125 44 4 35.046875 4 24 C 4 12.953125 12.953125 4 24 4 Z M 24 11.625 C 23.632812 11.625 23.328125 11.617188 23 11.6875 C 22.671875 11.757812 22.367188 11.9375 22.125 12.125 C 21.882812 12.3125 21.703125 12.570312 21.5625 12.875 C 21.421875 13.179688 21.375 13.539062 21.375 14 C 21.375 14.453125 21.421875 14.8125 21.5625 15.125 C 21.703125 15.4375 21.882812 15.6875 22.125 15.875 C 22.367188 16.0625 22.671875 16.171875 23 16.25 C 23.328125 16.328125 23.632812 16.375 24 16.375 C 24.359375 16.375 24.742188 16.328125 25.0625 16.25 C 25.382812 16.171875 25.632812 16.0625 25.875 15.875 C 26.117188 15.6875 26.296875 15.4375 26.4375 15.125 C 26.578125 14.820312 26.6875 14.453125 26.6875 14 C 26.6875 13.539062 26.578125 13.179688 26.4375 12.875 C 26.296875 12.570312 26.117188 12.3125 25.875 12.125 C 25.632812 11.9375 25.382812 11.757812 25.0625 11.6875 C 24.742188 11.617188 24.359375 11.625 24 11.625 Z M 21.5625 18.3125 L 21.5625 36.25 L 26.4375 36.25 L 26.4375 18.3125 Z M 21.5625 18.3125 "/></g></svg>';
    k_slider.prepend(k_slider_info);

    k_slider_navigation.setAttribute('id', 'k_slider_navigation');
    k_slider_description.setAttribute('id', 'k_slider_description');
    k_slider_autoplay.setAttribute('id', 'k_slider_autoplay');
    k_slider_autoplay_check.setAttribute('id', 'k_slider_autoplay_check');
    k_slider_autoplay_name.setAttribute('id', 'k_slider_autoplay_name');
    k_slider_url_block.setAttribute('id', 'k_slider_url_block');

    // Прописываем стиль к созданным тегам и другие параметры;
    k_slider_box.setAttribute('position', '0');
    k_slider_autoplay_name.innerHTML = 'Auto play:'
    k_slider_url_block.innerHTML = 'Link'

    // Вставляем созданный каркас в тело сайта;
    k_slider.prepend(k_slider_box); // Вставляем блок с изображениями в модальное окно;
    k_slider.append(k_slider_box_back); // Вставляем блок с фоном для fullscreen_box;
    for (let i=0; i < k_slider_images.length; i++) {
      const k_slider_box_block = document.createElement('div'); // Создаём блоки для изображений;
      k_slider_box_block.setAttribute('class', 'k_slider_box_block');
      k_slider_box_block.setAttribute('style', `display: inline-block; width: ${k_slider_width}px; height: ${k_slider_height}px; background-image: url('${k_slider_images[i].getAttribute('src')}');`);
      k_slider_box.append(k_slider_box_block);
    }
    k_slider.prepend(k_slider_goleft);
    k_slider.prepend(k_slider_goright);
    k_slider.prepend(k_slider_navigation);
    k_slider.prepend(k_slider_description);
    k_slider.prepend(k_slider_autoplay);
    k_slider_autoplay.prepend(k_slider_autoplay_check);
    k_slider.prepend(k_slider_autoplay_name);
    k_slider.prepend(k_slider_url_block);

    k_slider_box.setAttribute('style', `width: ${k_slider_width * k_slider_images.length}px; position: absolute; z-index: 2;`);
    const k_slider_box_blocks = document.querySelectorAll('div.k_slider_box_block');

    // Сколько всего картинок и текущая позиция. Миниатюры;
    for (let i=0; i < k_slider_box_blocks.length; i++) {
      const k_slider_block_miniatur = document.createElement('div');
      k_slider_block_miniatur.setAttribute('class', 'k_slider_block_miniatur');
      k_slider_navigation.append(k_slider_block_miniatur);
    }

    const k_slider_block_miniaturs = document.querySelectorAll('div.k_slider_block_miniatur');

    // Открытие слайдера;
    for (let i=0; i < k_slider_images.length; i++) {
      k_slider_images[i].setAttribute('style', 'display: none;')
      k_slider_description.innerHTML = `${k_slider_images[0].getAttribute('alt')}<br><span class="k_slide_num">Slide: ${'1' + ' / ' + k_slider_block_miniaturs.length}</span><br>${k_slider_images[0].getAttribute('k_url') != null ? '<span class="k_slider_link" data-title="There is a link for this slide, just click on any place in the slider">link</span>' : ''}`;
      // k_slider_box_back.setAttribute('style', `background-image: url('${k_slider_images[0].getAttribute('src')}');`);
      k_slider_block_miniaturs[0].style.background = '#fff';
      k_slider_description.style.top = '20px';
      k_slider_goleft.style.left = '20px';
      k_slider_goright.style.right = '20px';
      k_slider_navigation.style.opacity = '1';
    };

    // Навигационные кнопки;
    function k_div_slides_go(e) {
      k_slider_position = k_slider_box.getAttribute('position'); // Читаем текущее положение слайдера;
      // console.log(k_slider_position)
      k_slider_box.style.left = `calc(${k_slider_position}px + ${e}px)`; // Листаем влево/вправо;
      k_slider_box.setAttribute('position', `${+k_slider_position + e}`); // Записываем текущее положение слайдера;
      if (k_slider_position <= (0 - (k_slider_width * k_slider_images.length - k_slider_width)) && e < 0) { // Если значение k_slider_position < max и мы листаем вправо, то
        // console.log('yes')
        k_slider_box.setAttribute('position', `0`);
        k_slider_box.style.left = `0px`;
      }
      if (k_slider_position >= 0 && e > 0) { // Если значение k_slider_position = 0 и мы листаем влевво, то
        k_slider_box.setAttribute('position', `-${k_slider_width * k_slider_images.length - k_slider_width}`);
        k_slider_box.style.left = `-${k_slider_width * k_slider_images.length - k_slider_width}px`;
      }
      // Переключение Миниатюр;
      k_slider_position = k_slider_box.getAttribute('position');
      let m_num = k_slider_position / k_slider_width;
      if (m_num < 0) {
        m_num *= -1;
      }
      k_slider_description.innerHTML = `${k_slider_images[m_num].getAttribute('alt')}<br><span class="k_slide_num">Slide: ${(m_num + 1) + ' / ' + k_slider_block_miniaturs.length}</span><br>${k_slider_images[m_num].getAttribute('k_url') != null ? '<span class="k_slider_link" data-title="There is a link for this slide, just click on any place in the slider">link</span>' : ''}`;
      k_slider_url_block.setAttribute('onclick', `window.open('${k_slider_images[m_num].getAttribute('k_url')}');`);
      // k_slider_box_back.setAttribute('style', `background-image: url('${k_slider_images[m_num].getAttribute('src')}');`);
      // console.log('m_num = ' + m_num)
      if (e < 0) {
        if (m_num > 0) {
          k_slider_block_miniaturs[m_num - 1].style.background = 'rgba(255, 255, 255, 0)';
          k_slider_block_miniaturs[m_num - 1].style.boxShadow = '0 0 4px rgba(0,0,0,0.4)';
        }
        if (m_num == 0) {
          k_slider_block_miniaturs[k_slider_block_miniaturs.length - 1].style.background = 'rgba(255, 255, 255, 0)';
          k_slider_block_miniaturs[k_slider_block_miniaturs.length - 1].style.boxShadow = '0 0 4px rgba(0,0,0,0.4)';
        }
        k_slider_block_miniaturs[m_num].style.background = '#fff';
        k_slider_block_miniaturs[m_num].style.boxShadow = '0 0 4px rgba(0,0,0,0.8)';
      } else {
        if (m_num > 0) {
          if (m_num != (k_slider_block_miniaturs.length - 1)) {
            k_slider_block_miniaturs[m_num + 1].style.background = 'rgba(255, 255, 255, 0)';
            k_slider_block_miniaturs[m_num + 1].style.boxShadow = '0 0 4px rgba(0,0,0,0.4)';
          }
        }
        if (m_num == 0) {
          k_slider_block_miniaturs[k_slider_block_miniaturs.length - 1].style.background = 'rgba(255, 255, 255, 0)';
          k_slider_block_miniaturs[k_slider_block_miniaturs.length - 1].style.boxShadow = '0 0 4px rgba(0,0,0,0.4)';
          k_slider_block_miniaturs[m_num + 1].style.background = 'rgba(255, 255, 255, 0)';
          k_slider_block_miniaturs[m_num + 1].style.boxShadow = '0 0 4px rgba(0,0,0,0.4)';
        }
        if (m_num == (k_slider_block_miniaturs.length - 1)) {
          k_slider_block_miniaturs[0].style.background = 'rgba(255, 255, 255, 0)';
          k_slider_block_miniaturs[0].style.boxShadow = '0 0 4px rgba(0,0,0,0.4)';
        }
        k_slider_block_miniaturs[m_num].style.background = '#fff';
        k_slider_block_miniaturs[m_num].style.boxShadow = '0 0 4px rgba(0,0,0,0.8)';
      }
    }

    // Переход к слайду по клику миниатюры;
    for (let i=0; i < k_slider_block_miniaturs.length; i++) {
      k_slider_block_miniaturs[i].addEventListener('click', function() {
        // console.log('click i = ' + i);
        k_slider_description.innerHTML = `${k_slider_images[i].getAttribute('alt')}<br><span class="k_slide_num">Slide: ${(i + 1) + ' / ' + k_slider_block_miniaturs.length}</span><br>${k_slider_images[i].getAttribute('k_url') != null ? '<span class="k_slider_link" data-title="There is a link for this slide, just click on any place in the slider">link</span>' : ''}`;
        k_slider_box_back.setAttribute('style', `background-image: url('${k_slider_images[i].getAttribute('src')}');`);
        if (i == 0) {
          k_slider_box.style.left = `0px`; // Листаем влево/вправо;
          k_slider_box.setAttribute('position', `0`); // Записываем текущее положение слайдера;
          for (let h=0; h < k_slider_block_miniaturs.length; h++) {
            k_slider_block_miniaturs[h].style.background = 'rgba(255, 255, 255, 0)';
            k_slider_block_miniaturs[h].style.boxShadow = '0 0 4px rgba(0,0,0,0.4)';
          }
          k_slider_block_miniaturs[i].style.background = '#fff';
          k_slider_block_miniaturs[i].style.boxShadow = '0 0 4px rgba(0,0,0,0.8)';
        } else {
          k_slider_box.style.left = `calc(${-k_slider_width * i}px)`; // Листаем влево/вправо;
          k_slider_box.setAttribute('position', `${-k_slider_width * i}`); // Записываем текущее положение слайдера;
          for (let j=0; j < k_slider_block_miniaturs.length; j++) {
            k_slider_block_miniaturs[j].style.background = 'rgba(255, 255, 255, 0)';
            k_slider_block_miniaturs[j].style.boxShadow = '0 0 4px rgba(0,0,0,0.4)';
          }
          k_slider_block_miniaturs[i].style.background = '#fff';
          k_slider_block_miniaturs[i].style.boxShadow = '0 0 4px rgba(0,0,0,0.8)';
        }
      })
    }

    k_slider_goleft.addEventListener('click', function() { // Кнопка влево;
      k_div_slides_go(k_slider_width);
    })

    k_slider_goright.addEventListener('click', function() { // Кнопка вправо;
      k_div_slides_go(-k_slider_width);
    })

    // Автоплэй;
    const k_autoplay = localStorage.getItem('k_slider_check_info');
    let k_slider_check;
    let k_slider_interval;
    if (k_autoplay != null) {
      k_slider_check = localStorage.getItem('k_slider_check_info');
    }
    if (k_slider_check == 0) {
      k_slider_autoplay.classList.add('k_slider_autoplay_off');
      k_slider_autoplay_check.classList.add('k_slider_autoplay_check_off');
    } else {
      k_slider_check = 1;
    }
    // console.log('k_slider_check = ' + k_slider_check);

    if (k_options['sliderAutoPlay'] == 1 && k_slider_check == 1) {
      k_slider_interval = setInterval(function() {k_div_slides_go(-k_slider_width)}, k_options['sliderAutoPlayTime']*1000);
    } else if (k_options['sliderAutoPlay'] == 0) {
      k_slider_autoplay.classList.add('k_slider_autoplay_off');
      k_slider_autoplay_check.classList.add('k_slider_autoplay_check_off');
    }

    // Переключение авто режима;
    k_slider_autoplay.addEventListener('click', function() {
      if (k_slider_check == 1) {
        k_slider_check = 0;
        localStorage.setItem('k_slider_check_info', 0);
        k_slider_autoplay.classList.add('k_slider_autoplay_off');
        k_slider_autoplay_check.classList.add('k_slider_autoplay_check_off');
        clearInterval(k_slider_interval);
      } else {
        k_slider_check = 1;
        localStorage.setItem('k_slider_check_info', 1);
        k_slider_autoplay.classList.remove('k_slider_autoplay_off');
        k_slider_autoplay_check.classList.remove('k_slider_autoplay_check_off');
        k_slider_interval = setInterval(function() {k_div_slides_go(-k_slider_width)}, k_options['sliderAutoPlayTime']*1000);
      }
      // console.log('k_slider_check = ' + k_slider_check);
    })

    // Перелистывания с помощью мышки и тач действий;
    let sliderStartX;
    let sliderMoveX;
    let sliderSimpleMoveX;
    let sliderNewMoveX;

    let sliderSwitchX;
    let sliderSwitchY;
    let k_black_back_check = 0;

    for (let k_slider_block of k_slider_box_blocks) {
      // Действия Мышкой;
      k_slider_block.addEventListener('mousedown', function(e) {
        sliderStartX = e.pageX;
        // console.log(sliderStartX, sliderStartY);
        k_slider_position = k_slider_box.getAttribute('position'); // Читаем текущее положение слайдера;
      });

      k_slider_block.addEventListener('mousemove', function(e) {
        k_black_back_check = 1;
        if (sliderStartX > 0) {
          sliderMoveX = e.pageX;
          sliderSimpleMoveX = sliderMoveX - sliderStartX;
        }
        if (sliderStartX > 0 && (sliderSimpleMoveX > 25 || sliderSimpleMoveX < -25)) {
          // console.log('sliderSimpleMoveX = ' + sliderSimpleMoveX);
          k_slider_box.style.transition = 'null';
          newMoveX = +k_slider_position + ((sliderMoveX - sliderStartX) * 1.2);
          k_slider_box.style.top = `0px`;
          k_slider_box.style.left = `calc(${newMoveX}px)`; // Листаем до новой позиции;
        }
      });

      k_slider_block.addEventListener('mouseup', function(e) {
        k_black_back_check = 0;
        sliderStartX = 0;
        if (sliderSimpleMoveX > 50) {
          k_div_slides_go(k_slider_width)
        } else if (sliderSimpleMoveX >= -50 && sliderSimpleMoveX <= 50) {
          k_slider_position = k_slider_box.getAttribute('position'); // Читаем текущее положение слайдера;
          k_slider_box.style.left = `${k_slider_position}px`; // Листаем до новой позиции;
        } else if (sliderSimpleMoveX < -50) {
          k_div_slides_go(-k_slider_width)
        }
        sliderSimpleMoveX = 0;
        // k_slider_box.setAttribute('position', `${newMoveX}`); // Записываем текущее положение слайдера;
        k_slider_box.style.transition = 'all 0.6s cubic-bezier(0.46, 0.03, 0.52, 0.96)';
      });

      // Тач;

      k_slider_block.addEventListener('touchstart', function(e) {
        sliderStartX = e.changedTouches[0].pageX;
        // console.log(sliderStartX);
        k_slider_position = k_slider_box.getAttribute('position'); // Читаем текущее положение слайдера;
      }, false);

      k_slider_block.addEventListener('touchmove', function(e) {
        k_black_back_check = 1;
        if (sliderStartX > 0) {
          sliderMoveX = e.changedTouches[0].pageX;
          sliderSimpleMoveX = sliderMoveX - sliderStartX;
        }
        if (sliderStartX > 0 && (sliderSimpleMoveX > 25 || sliderSimpleMoveX < -25)) {
          k_slider_box.style.transition = 'null';
          newMoveX = +k_slider_position + ((sliderMoveX - sliderStartX) * 1.2);
          console.log('sliderSimpleMoveX = ' + sliderSimpleMoveX);
          k_slider_box.style.top = `0px`;
          k_slider_box.style.left = `calc(${newMoveX}px)`; // Листаем до новой позиции;
        }
      }, false);

      k_slider_block.addEventListener('touchend', function(e) {
        k_black_back_check = 0;
        sliderStartX = 0;
        if (sliderSimpleMoveX > 50) {
          k_div_slides_go(k_slider_width)
        } else if (sliderSimpleMoveX >= -50 && sliderSimpleMoveX <= 50) {
          k_slider_position = k_slider_box.getAttribute('position'); // Читаем текущее положение слайдера;
          k_slider_box.style.left = `${k_slider_position}px`; // Листаем до новой позиции;
        } else if (sliderSimpleMoveX < -50) {
          k_div_slides_go(-k_slider_width)
        }
        sliderSimpleMoveX = 0;
        // k_slider_box.setAttribute('position', `${newMoveX}`); // Записываем текущее положение слайдера;
        k_slider_box.style.transition = 'all 0.6s cubic-bezier(0.46, 0.03, 0.52, 0.96)';
      }, false);
    }

    // Ссылки
    for (let i = 0; i < k_slider_box_blocks.length; i++) {
      k_slider_box_blocks[i].addEventListener('click', function() {
        setTimeout(function() {
          if (k_black_back_check == 0 && k_slider_images[i].getAttribute('k_url') != null) {
            if (k_slider_box_back.getAttribute('style') != 'display: block;') {
              k_slider_box_back.setAttribute('style', 'display: block;');
              k_slider_url_block.setAttribute('style', 'display: block;');
              k_slider_url_block.setAttribute('onclick', `window.open('${k_slider_images[i].getAttribute('k_url')}');`);
            } else {
              k_slider_box_back.removeAttribute('style');
              k_slider_url_block.removeAttribute('style');
            }
          }
        }, 100);
      })

      k_slider_box_back.addEventListener('click', function() {
        if (k_slider_box_back.getAttribute('style') != 'display: block;') {
          k_slider_box_back.setAttribute('style', 'display: block;');
          k_slider_url_block.setAttribute('style', 'display: block;');
        } else {
          k_slider_box_back.removeAttribute('style');
          k_slider_url_block.removeAttribute('style');
        }
      })
    }

    function k_slider_screen_resize() {
      k_slider_box.style.transition = 'null';
      const k_slider_position_old = k_slider_box.getAttribute('position') / k_slider_width; // Узнаём номер слайда из старых данных позиции
      k_slider_width = k_slider.offsetWidth;
      k_slider_height = k_slider.offsetHeight;

        k_slider_box.style.width = `${k_slider_width * k_images.length}px`; // Прописываем ширину полноэкранному блоку в модальном окне;
        const k_slider_box_block_resize = document.querySelectorAll('div.k_slider_box_block')
        for (let i=0; i < k_slider_box_block_resize.length; i++) {
          // Прописываем новую ширину блокам с картинками;
          k_slider_box_block_resize[i].setAttribute('style', `display: inline-block; width: ${k_slider_width}px; height: ${k_slider_height}px; background-image: url('${k_images[i].getAttribute('src')}');`);
        }

      const k_slider_position_new = k_slider_position_old * k_slider_width; // Узнаём позицию и положение текущего слайда с новыми данными позиции;
      k_slider_box.style.left = `calc(${k_slider_position_new}px)`; // Листаем до новой позиции;
      k_slider_box.setAttribute('position', `${k_slider_position_new}`); // Записываем текущее положение слайдера;
      setTimeout(function() {k_slider_box.style.transition = 'all 0.6s cubic-bezier(0.46, 0.03, 0.52, 0.96)'}, 100);
    }

    document.querySelector(`div#${k_options['slider']}`).setAttribute('style', `${document.querySelector(`div#${k_options['slider']}`).getAttribute('style')} overflow: hidden; position: relative;`);

    // Изменение размера экрана
    window.addEventListener('resize',function() {
      k_slider_screen_resize();
    })

  }
}

const k_head = document.getElementsByTagName('HEAD')[0];
const k_link_css = document.createElement('link');
k_link_css.rel = 'stylesheet';
k_link_css.type = 'text/css';
k_link_css.href = 'https://4x1.pw/projects/kiwimi2/css/kiwimi2.css';
k_head.appendChild(k_link_css);
