document.addEventListener("DOMContentLoaded", function() {
    const calendarContainer = document.getElementById("calendar");

    const startMonth = 8; // Сентябрь
    const endMonth = 3;   // Апрель
    const startYear = 2024;
    const endYear = 2025;

    const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

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

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const firstWeekdayIndex = (firstDayOfMonth + 6) % 7;

        for (let i = 0; i < firstWeekdayIndex; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.classList.add('empty');
            daysDiv.appendChild(emptyDiv);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = day;
            dayDiv.setAttribute('data-date', `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`);

            // Если пользователь авторизован и у него роль 'admin', делаем дни кликабельными
            if (isLoggedIn && userRole === 'admin') {
                dayDiv.addEventListener('click', function() {
                    openColorModal(this);
                });
            } else {
                dayDiv.classList.add('disabled'); // Для неавторизованных или 'user' делаем дни некликабельными
            }

            daysDiv.appendChild(dayDiv);
        }

        return monthDiv;
    }

    function loadColoredDays() {
        fetch('load_colored_days.php')
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    const dayDiv = document.querySelector(`[data-date="${item.date}"]`);
                    if (dayDiv) {
                        dayDiv.style.backgroundColor = item.color;
                    }
                });
            });
    }

    function openColorModal(dayDiv) {
        const selectedDate = dayDiv.getAttribute('data-date');
        document.getElementById('selectedDate').innerText = selectedDate;
        document.getElementById('colorModal').style.display = 'block';

        document.getElementById('removeColor').addEventListener('click', function() {
            fetch('remove_color.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    date: selectedDate
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const dayDiv = document.querySelector(`[data-date="${selectedDate}"]`);
                    if (dayDiv) {
                        dayDiv.style.backgroundColor = '';
                    }
                    document.getElementById('colorModal').style.display = 'none';
                } else {
                    alert('Ошибка при удалении закрашивания');
                }
            });
        });
    }

    document.getElementById('closeModal').addEventListener('click', function() {
        document.getElementById('colorModal').style.display = 'none';
    });

    document.getElementById('applyColor').addEventListener('click', function() {
        const selectedDate = document.getElementById('selectedDate').innerText;
        const selectedColor = document.getElementById('colorPicker').value;

        fetch('save_color.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: selectedDate,
                color: selectedColor
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const dayDiv = document.querySelector(`[data-date="${selectedDate}"]`);
                if (dayDiv) {
                    dayDiv.style.backgroundColor = selectedColor;
                }
                document.getElementById('colorModal').style.display = 'none';
            } else {
                alert('Ошибка при сохранении цвета');
            }
        });
    });

    let currentYear = startYear;
    for (let month = startMonth; month <= 11; month++) {
        calendarContainer.appendChild(createMonth(currentYear, month));
    }

    currentYear = endYear;
    for (let month = 0; month <= endMonth; month++) {
        calendarContainer.appendChild(createMonth(currentYear, month));
    }

    loadColoredDays();
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

