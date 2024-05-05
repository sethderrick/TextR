// editor.ts
let isMouseDown = false;

document.addEventListener('DOMContentLoaded', function () {
    const editor = document.getElementById('editor') as HTMLDivElement;

    editor.addEventListener('keydown', function (event: KeyboardEvent) {
        handleKeyPress(event);
    });

    function handleKeyPress(event: KeyboardEvent) {
        // Example: handle backspace
        if (event.key === 'Backspace') {
            // Prevent default backspace behavior
            event.preventDefault();
            deleteText();
        }
    }

    function deleteText() {
        // Implement text deletion logic
        // This is a simple and naive approach:
        let selection = window.getSelection();

        if (!selection || !selection.rangeCount) return;

        let range = selection.getRangeAt(0);
        if (range.collapsed) {
            // If collapsed, delete single character before the caret
            range.setStart(range.startContainer, Math.max(0, range.startOffset - 1));
        }
        range.deleteContents();

        // Update the cursor position
        selection.removeAllRanges();
        selection.addRange(range);
    }

    function insertText(char: string) {
        let selection = window.getSelection();

        if (!selection || !selection.rangeCount) return;

        if (!selection.rangeCount) return;

        let range = selection.getRangeAt(0);
        range.deleteContents();

        let textNode = document.createTextNode(char);
        range.insertNode(textNode);

        // Move the cursor after the inserted text
        range.setStartAfter(textNode);
        range.setEndAfter(textNode);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    editor.addEventListener('mousedown', function (event: MouseEvent) {
        isMouseDown = true;
        startSelection(event);
        event.preventDefault(); // Prevent default text selection behavior
    });

    editor.addEventListener('mousemove', function (event: MouseEvent) {
        if (isMouseDown) {
            updateSelection(event);
        }
    });

    document.addEventListener('mouseup', function (event: MouseEvent) {
        if (isMouseDown) {
            endSelection(event);
            isMouseDown = false;
        }
    });

});

function startSelection(event: MouseEvent) {
    const editor = document.getElementById('editor') as HTMLDivElement;
    // Set the start of the selection
    const startPos = calculatePosition(event.clientX, event.clientY);
    console.log("Selection started at: ", startPos);
    // You might want to clear previous selections or set a new starting point here
}

function updateSelection(event: MouseEvent) {
    // Update the current selection
    const currentPos = calculatePosition(event.clientX, event.clientY);
    console.log("Selection updated to: ", currentPos);
    // Logic to highlight or manipulate the selection
}

function endSelection(event: MouseEvent) {
    // Finalize the selection
    const endPos = calculatePosition(event.clientX, event.clientY);
    console.log("Selection ended at: ", endPos);
    // Logic to finalize the selection
}

function calculatePosition(x: number, y: number): number {
    const editor = document.getElementById('editor') as HTMLDivElement;
    const rect = editor.getBoundingClientRect();
    const relativeX = x - rect.left;
    const relativeY = y - rect.top;

    // Simple example: Calculate position based on relative coordinates
    // This part will depend heavily on how your text is structured
    const position = Math.floor(relativeX / 10); // Example metric, needs adjustment based on actual text rendering

    return position;
}

function highlightSelection(startPos: number, endPos: number) {
    const range = document.createRange();
    const span = document.createElement('span');
    span.style.backgroundColor = 'lightblue'; // Change color as needed

    const editor = document.getElementById('editor') as HTMLDivElement;
    const textNode = editor.childNodes[0] as Text;

    // Note: startPos and endPos need to be calculated accurately for this to work
    range.setStart(textNode, startPos);
    range.setEnd(textNode, endPos);

    range.surroundContents(span);
}

