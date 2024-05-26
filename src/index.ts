import { Game } from './logic/Game';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './config/config';
import { Renderer } from './view/Renderer';
import { setupEventHandlers } from './eventHandlers';
window.onload = () => {
    const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d')!;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const game = new Game(canvas, context);
    const renderer = new Renderer(context);

    setupEventHandlers(game.moveBoatLeft.bind(game), game.moveBoatRight.bind(game));

    function gameLoop(timestamp: number) {
        game.update(timestamp);
        renderer.clearCanvas();
        game.draw();
        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
};
