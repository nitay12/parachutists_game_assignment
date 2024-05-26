export function setupEventHandlers(moveBoatLeft: () => void, moveBoatRight: () => void) {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' || event.key === 'Left') {
            moveBoatLeft();
        } else if (event.key === 'ArrowRight' || event.key === 'Right') {
            moveBoatRight();
        }
    });
}
