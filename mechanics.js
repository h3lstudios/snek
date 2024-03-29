document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const GRID_SIZE = 20;
    const CANVAS_WIDTH = canvas.width;
    const CANVAS_HEIGHT = canvas.height;

    const appleImage = new Image();
    appleImage.src = 'apple.png';
    appleImage.onload = () => {
        main();
    };
    appleImage.onerror = (error) => {
        console.error('Error loading apple image:', error);
    };

    let snake = [];
    for (let i = 0; i < 5; i++) {
        snake.push({ x: 10 - i, y: 10 });
    }
    let dx = 1;
    let dy = 0;
    let food = generateFood();
    let score = 0;

    const scoreElement = document.getElementById('scoreValue');

    function main() {
        clearCanvas();
        update();
        draw();
        setTimeout(main, 100);
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    function update() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };

        if (head.x === food.x && head.y === food.y) {
            score += 10;
            snake.unshift({ ...head });
            food = generateFood();
            updateScore();
        } else {
            snake.unshift({ ...head });
            snake.pop();
        }
    }

    function draw() {
        ctx.fillStyle = 'white';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        });

        // Draw the apple image at the position of the food
        ctx.drawImage(appleImage, food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    }

    function generateFood() {
        const x = Math.floor(Math.random() * (CANVAS_WIDTH / GRID_SIZE));
        const y = Math.floor(Math.random() * (CANVAS_HEIGHT / GRID_SIZE));
        return { x, y };
    }

    document.addEventListener('keydown', e => {
        switch (e.key) {
            case 'ArrowUp':
                if (dy !== 1) {
                    dx = 0;
                    dy = -1;
                }
                break;
            case 'ArrowDown':
                if (dy !== -1) {
                    dx = 0;
                    dy = 1;
                }
                break;
            case 'ArrowLeft':
                if (dx !== 1) {
                    dx = -1;
                    dy = 0;
                }
                break;
            case 'ArrowRight':
                if (dx !== -1) {
                    dx = 1;
                    dy = 0;
                }
                break;
        }
    });

    function updateScore() {
        scoreElement.textContent = score;
    }
});
