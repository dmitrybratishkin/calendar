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

    if (openModal) {
        openModal.onclick = function() {
            if (modal) {
                modal.style.display = "block";
            }
        };
    }

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

// Регистрация
document.addEventListener("DOMContentLoaded", function () {
    const regUsernameInput = document.getElementById('regUsername');
    const regPasswordInput = document.getElementById('regPassword');
    const registrationFormElement = document.getElementById('registrationFormElement');

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

// Выход
document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.onclick = async function() {
            console.log('Нажата кнопка выхода');
            const response = await fetch('../public/logout.php'); // Убедитесь в правильности пути
            console.log('Ответ от logout.php:', response.status);
            if (response.ok) {
                window.location.href = 'index.php'; // Перенаправление после выхода
            } else {
                console.error('Ошибка при выходе:', response.status);
            }
        };
    } else {
        console.error('Кнопка выхода не найдена');
    }
});

document.getElementById('loginForm').onsubmit = function(event) {
    event.preventDefault(); // предотвращаем стандартное поведение формы

    var formData = new FormData(this);

    fetch('../admin/login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = '../public/index.php'; // Переход на главную страницу после успешного входа
        } else {
            document.getElementById('error-message').innerText = data.message; // Показать сообщение об ошибке
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        document.getElementById('error-message').innerText = 'Ошибка сервера. Попробуйте позже.';
    });
};

// Открытие модального окна при клике на дату
document.querySelectorAll('.clickable').forEach(function(element) {
    element.addEventListener('click', function() {
        var selectedDate = this.getAttribute('data-date');
        document.getElementById('selectedDate').innerText = selectedDate;
        document.getElementById('colorModal').style.display = 'block';
    });
});

// Закрытие модального окна
document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('colorModal').style.display = 'none';
});

// Применение выбранного цвета
document.getElementById('applyColor').addEventListener('click', function() {
    var selectedDate = document.getElementById('selectedDate').innerText;
    var selectedColor = document.getElementById('colorPicker').value;

    // Отправляем запрос на сервер для сохранения выбранного цвета
    fetch('save_color.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            date: selectedDate,
            color: selectedColor
        })
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        if (data.success) {
            // Закрашиваем ячейку выбранным цветом
            document.querySelector(`[data-date="${selectedDate}"]`).style.backgroundColor = selectedColor;
            document.getElementById('colorModal').style.display = 'none';
        } else {
            alert('Ошибка при сохранении цвета');
        }
    });
});