document.addEventListener("DOMContentLoaded", function() {
    const calendarContainer = document.getElementById("calendar");

    // Настройка диапазона месяцев
    const startMonth = 8; // Сентябрь (0 = январь, поэтому 8 = сентябрь)
    const endMonth = 3;   // Апрель
    const startYear = 2024;
    const endYear = 2025;

    // Названия дней недели
    const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    // Функция для создания месяца
    function createMonth(year, month) {
        const monthDiv = document.createElement('div');
        monthDiv.classList.add('month');
        
        const monthHeader = document.createElement('h2');
        monthHeader.textContent = `${monthNames[month]} ${year}`;
        monthDiv.appendChild(monthHeader);

        const weekdaysDiv = document.createElement('div');
        weekdaysDiv.classList.add('weekdays');
        weekdays.forEach(day => {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = day;
            weekdaysDiv.appendChild(dayDiv);
        });
        monthDiv.appendChild(weekdaysDiv);

        const daysDiv = document.createElement('div');
        daysDiv.classList.add('days');
        monthDiv.appendChild(daysDiv);

        // Получаем количество дней в месяце
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Вс) - 6 (Сб)
        const firstWeekdayIndex = (firstDayOfMonth + 6) % 7; // Смещение понедельника на 0

        // Пустые ячейки перед началом месяца
        for (let i = 0; i < firstWeekdayIndex; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.classList.add('empty');
            daysDiv.appendChild(emptyDiv);
        }

        // Создаем дни месяца
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = day;

            // Если это апрель и день 7, добавляем стиль
            if (month === 3 && day === 7) {
                dayDiv.classList.add('highlight'); // Добавляем класс для выделения
            }

            daysDiv.appendChild(dayDiv);
        }

        return monthDiv;
    }

    // Создаем календарь с сентября 2024 по апрель 2025
    let currentYear = startYear;
    for (let month = startMonth; month <= 11; month++) {
        calendarContainer.appendChild(createMonth(currentYear, month));
    }

    currentYear = endYear;
    for (let month = 0; month <= endMonth; month++) {
        calendarContainer.appendChild(createMonth(currentYear, month));
    }
});

// Функция для подсчета дней с целевой даты
function calculateDaysSince(targetDate) {
    const today = new Date();
    const timeDifference = today - targetDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference + 1;
}


// Устанавливаем целевую дату (21 сентября 2024 года)
const targetDate = new Date('2024-09-21');

// Рассчитываем количество дней и выводим в span
const daysCounterElement = document.getElementById('days-counter');
daysCounterElement.textContent = calculateDaysSince(targetDate);

document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("modal");
    const openModal = document.getElementById("openModal");
    const closeModal = document.getElementById("closeModal");
    const openRegister = document.getElementById("openRegister");
    const openLogin = document.getElementById("openLogin");
    const authForm = document.getElementById("authForm");
    const registerForm = document.getElementById("registerForm");
    const registrationForm = document.getElementById("registrationForm");

    // Открыть модальное окно
    openModal.onclick = function() {
        modal.style.display = "block";
    };

    // Закрыть модальное окно
    closeModal.onclick = function() {
        modal.style.display = "none";
    };

    // Переключиться на форму регистрации
    openRegister.onclick = function() {
        authForm.style.display = "none";
        registerForm.style.display = "block";
    };

    // Вернуться к форме авторизации
    openLogin.onclick = function() {
        registerForm.style.display = "none";
        authForm.style.display = "block";
    };

    // Закрыть модальное окно при клике вне него
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    
});

document.addEventListener("DOMContentLoaded", function () {
    const openRegister = document.getElementById('openRegister');
    const openLogin = document.getElementById('openLogin');
    const authForm = document.getElementById('authForm');
    const registrationForm = document.getElementById('registrationForm');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('closeModal');

    const regUsernameInput = document.getElementById('regUsername');
    const regPasswordInput = document.getElementById('regPassword');

    openRegister.onclick = function () {
        authForm.style.display = 'none';
        registrationForm.style.display = 'block';
    };

    openLogin.onclick = function () {
        registrationForm.style.display = 'none';
        authForm.style.display = 'block';
    };

    closeModal.onclick = function () {
        modal.style.display = 'none';
    };

    const registrationFormElement = document.getElementById('registrationFormElement'); // Получаем элемент после загрузки DOM
    registrationFormElement.onsubmit = async function (event) {
        event.preventDefault();

        const username = regUsernameInput.value;
        const password = regPasswordInput.value;

        if (!username || !password) {
            alert('Пожалуйста, заполните все поля.');
            return;
        }

        try {
            const response = await fetch('http://calendar/public/register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const responseText = await response.text();
            const result = JSON.parse(responseText);

            if (result.success) {
                alert('Регистрация успешна!');
                modal.style.display = 'none'; // Закрываем модальное окно
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
        }
    };
});



document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.onclick = function() {
            window.location.href = '../admin/logout.php'; // Создайте файл logout.php для выхода
        };
    }
});