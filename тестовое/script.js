const URL = 'https://keev.me/f/slowpoke.php';
function startSquare() {
    const square = document.createElement('div');
    square.style.width = '100px';
    square.style.height = '100px';
    square.style.backgroundColor = 'black';
    square.style.position = 'absolute';
    square.style.top = '0';
    square.style.left = '0';
    document.body.prepend(square);

    let position = 0;
    let intervalId = setInterval(() => {
        position += 100;
        square.style.left = `${position}px`;
    }, 1000);

    setTimeout(() => {
        fetch(URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Request failed')
                }
                return response.text();
            })
            .then(data => {
                clearInterval(intervalId);
                if (data === '1') {
                    square.style.backgroundColor = 'green';
                } else if (data === '0') {
                    square.style.backgroundColor = 'blue';
                } else {
                    square.style.backgroundColor = 'red';
                }
            })
            .catch(() => {
                clearInterval(intervalId);
                square.style.backgroundColor = 'red';
            });
    }, 1000);

    function stopSquare() {
        clearInterval(intervalId);
    }

    return stopSquare;
}

const stopFunction = startSquare(); // вызываем функцию и сохраняем результат в переменную
setTimeout(stopFunction, 3000); // останавливаем функцию через 3 секунды
