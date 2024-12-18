
"use strict";


AOS.init();


// ==============================  burger  =========================================
const headerMenu = document.querySelector(".header__menu");

const krestikBurger = document.querySelector(".header__burger");
const body = document.querySelector("body");


krestikBurger.addEventListener("click", () => {
	headerMenu.classList.toggle("active");
	krestikBurger.classList.toggle("active");

	// чтоб при открытии бургера не скролилась основная страница
	body.classList.toggle("lock");
});

// ниже - при нажатии в бургер меню на любую ссылку - переходим по ссылке и одновременно - закрываем бургер и разблокируем скролл страници

const headerList = document.querySelectorAll(".header__list a");

headerList.forEach(link => {
	link.addEventListener("click", () => {
		headerMenu.classList.remove("active");
		krestikBurger.classList.remove("active");
		body.classList.remove("lock");
	});
});




// ========================  выпадающие окна     =====================================================



const dropdowns = document.querySelectorAll(".dropdown");


dropdowns.forEach((dropdown) => {
	const btn = dropdown.querySelector(".dropbtn");
	const dropdownContent = dropdown.querySelector(".dropdown-content");

	btn.addEventListener("click", () => {
		// Закрыть все другие dropdown
		dropdowns.forEach((otherDropdown) => {
			if (otherDropdown !== dropdown) {
				otherDropdown.querySelector(".dropdown-content").classList.remove("show");
			}
		});

		// Переключить текущий dropdown
		dropdownContent.classList.toggle("show");
	});

	document.addEventListener("click", (event) => {
		if (!event.target.matches('.dropbtn') && !event.target.closest('.dropdown')) {
			dropdownContent.classList.remove("show");
		}
	}
	);
});
// =========================================================================================================


// Получаем контейнер слайдера
const sliderContainer = document.querySelector('.galery__slidebox');

// Добавляем обработчики событий для событий касания
sliderContainer.addEventListener('touchstart', handleTouchStart);
sliderContainer.addEventListener('touchmove', handleTouchMove);
sliderContainer.addEventListener('touchend', handleTouchEnd);

let startX, startY, endX, endY;
let isDragging = false;
let cardWidth = 0;
let currentSlide = 0;
let cards = sliderContainer.querySelectorAll('.slidebox__card');

// Получаем ширину карточки
cardWidth = cards[0].offsetWidth;

function handleTouchStart(event) {
	// Запоминаем координаты касания при начале касания
	startX = event.touches[0].clientX;
	startY = event.touches[0].clientY;
	isDragging = true;
}

function handleTouchMove(event) {
	// Если пользователь перемещает палец, обновляем позицию слайдера
	if (isDragging) {
		endX = event.touches[0].clientX;
		endY = event.touches[0].clientY;
		const deltaX = endX - startX;
		// Листаем слайдер по одной карточке
		if (Math.abs(deltaX) > cardWidth / 2) {
			if (deltaX > 0) {
				// Листаем вправо
				if (currentSlide > 0) {
					currentSlide--;
					sliderContainer.scrollLeft = currentSlide * cardWidth;
				}
			} else {
				// Листаем влево
				if (currentSlide < cards.length - 1) {
					currentSlide++;
					sliderContainer.scrollLeft = currentSlide * cardWidth;
				}
			}
			isDragging = false;
		}
	}
}

function handleTouchEnd() {
	// Сбрасываем флаг перетаскивания при окончании касания
	isDragging = false;
}


// =======================  радиокнопкa  =============================================


// Получаем все блоки с классом "dropdown"
const dropdownses = document.querySelectorAll('.dropdown');

// Обрабатываем каждую группу радиокнопок отдельно
dropdownses.forEach((dropdown) => {
	// Получаем радиокнопки внутри текущего блока
	const radios = dropdown.querySelectorAll('input[type="checkbox"]');

	// Добавляем обработчик события на каждую радиокнопку
	radios.forEach((radio) => {
		radio.addEventListener('click', (event) => {
			// Если радиокнопка была нажата, то отметим ее
			if (event.target.checked) {
				// Снимаем галочку с других радиокнопок в текущей группе
				radios.forEach((otherRadio) => {
					if (otherRadio !== event.target) {
						otherRadio.checked = false;
					}
				});
			}
		});
	});
});


// ============================================================

const orderBtn = document.querySelector(".order--button");
const pupup = document.querySelector(".order__box--pupup");
const pupupImg = document.querySelector(".order__box--pupup img");

orderBtn.addEventListener("click", () => {
	pupup.style.display = "flex";
});
pupupImg.addEventListener("click", () => {
	pupup.style.display = "none";
})

// ==================================================================


var swiper = new Swiper(".myswiper", {
	slidesPerView: 4,
	// зазор между фото : column-gap: 10px; css
	// spaceBetween: 30,
	pagination: {
		// el: ".swiper-pagination",
		clickable: true,
	},
});
// ==========================================================
// переход при нажатии на кнопку на нужный блок - реализовано другим способом

// {/* <button class="hero__botton" id="scroll-btn">
//   <p>ЗАМОВИТИ КВІТИ</p>
// </button>


//   document.getElementById('scroll-btn').addEventListener('click', function() {
//     document.getElementById('ord').scrollIntoView();
//   }); */}
// =====================================================================================



// ===============================  фильтр выбора   ======================================================

// Функция для обновления данных в localStorage
function updateLocalStorage() {
	const selectedPrices = [];
	const selectedFlowers = [];
	const selectedPeople = [];
	const selectedMove = [];
	const selectedStyle = [];

	// Собираем все выбранные цены
	document.querySelectorAll('input[name="price"]:checked').forEach(checkbox => {
		selectedPrices.push(checkbox.value);
	});

	// Собираем все выбранные цветы
	document.querySelectorAll('input[name="flower"]:checked').forEach(checkbox => {
		selectedFlowers.push(checkbox.value);
	});

	// Собираем все выбранные people
	document.querySelectorAll('input[name="people"]:checked').forEach(checkbox => {
		selectedPeople.push(checkbox.value);
	});

	// Собираем все выбранные move
	document.querySelectorAll('input[name="move"]:checked').forEach(checkbox => {
		selectedMove.push(checkbox.value);
	});

	// Собираем все выбранные style
	document.querySelectorAll('input[name="style"]:checked').forEach(checkbox => {
		selectedStyle.push(checkbox.value);
	});

	// Сохраняем выбранные данные в localStorage
	localStorage.setItem('selectedPrices', JSON.stringify(selectedPrices));
	localStorage.setItem('selectedFlowers', JSON.stringify(selectedFlowers));
	localStorage.setItem('selectedPeople', JSON.stringify(selectedPeople));
	localStorage.setItem('selectedMove', JSON.stringify(selectedMove));
	localStorage.setItem('selectedStyle', JSON.stringify(selectedStyle));
}

// Обработчики изменений на чекбоксах
document.querySelectorAll('input[name="price"]').forEach(checkbox => {
	checkbox.addEventListener('change', updateLocalStorage);
});

document.querySelectorAll('input[name="flower"]').forEach(checkbox => {
	checkbox.addEventListener('change', updateLocalStorage);
});


document.querySelectorAll('input[name="people"]').forEach(checkbox => {
	checkbox.addEventListener('change', updateLocalStorage);
});

document.querySelectorAll('input[name="move"]').forEach(checkbox => {
	checkbox.addEventListener('change', updateLocalStorage);
});

document.querySelectorAll('input[name="style"]').forEach(checkbox => {
	checkbox.addEventListener('change', updateLocalStorage);
});

// Ожидаем отправки формы (не обязательная часть)
document.querySelector('#price-form').addEventListener('submit', (e) => {
	e.preventDefault(); // Не перезагружать страницу при сабмите
	updateLocalStorage();
});

document.querySelector('#flower-form').addEventListener('submit', (e) => {
	e.preventDefault(); // Не перезагружать страницу при сабмите
	updateLocalStorage();
});

document.querySelector('#people-form').addEventListener('submit', (e) => {
	e.preventDefault(); // Не перезагружать страницу при сабмите
	updateLocalStorage();
});

document.querySelector('#move-form').addEventListener('submit', (e) => {
	e.preventDefault(); // Не перезагружать страницу при сабмите
	updateLocalStorage();
});

document.querySelector('#style-form').addEventListener('submit', (e) => {
	e.preventDefault(); // Не перезагружать страницу при сабмите
	updateLocalStorage();
});

// ..........................   изменение надписи и цвета кнопки в фильтре  ..................................................



document.querySelectorAll('.dropdown-content button').forEach(function (button) {
	button.addEventListener('click', function () {


		// 		// Ваш код для обработки клика
		this.classList.add('active'); // Пример, меняем класс при клике

		// Найти родительский блок, который содержит эту кнопку
		const parentBlock = this.closest('.dropdown-content'); // Родительский блок для текущей кнопки

		// Скрыть элементы с классом 'bef' внутри этого блока
		parentBlock.querySelectorAll('.bef').forEach(function (b) {
			b.style.display = "none";
		});

		// Показать элементы с классом 'aft' внутри этого блока
		parentBlock.querySelectorAll('.aft').forEach(function (a) {
			a.style.display = "block";
			a.style.color = "black";
		});
	});
});
// ============================== переход в корзину при клике на корзину  ============================================

document.querySelector('.subcontainer img').addEventListener('click', function () {
	window.open('/order.html', '_blank');  // Открыть страницу /order в новой вкладке
});

document.querySelector('.header__list img').addEventListener('click', function () {
	window.open('order.html', '_blank');  // Открыть страницу /order в новой вкладке
});