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
    const textNode = editor.childNodes[0] as Text;

    if (!textNode) return 0; // Early exit if there's no text node

    let range = document.createRange();
    let pos = 0;
    let closestPos = 0;
    let minDistance = Infinity;

    // Iterate over each character in the text node
    for (pos = 0; pos < textNode.length; pos++) {
        range.setStart(textNode, pos);
        range.setEnd(textNode, pos + 1);

        // Get the client rect for the current character
        let rects = range.getClientRects();
        if (rects.length > 0) {
            let rect = rects[0];
            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                // The point is inside this character's rectangle
                return pos;
            }

            // Find the position closest to the mouse click if not directly over a character
            let distance = Math.sqrt(Math.pow(x - (rect.left + rect.right) / 2, 2) + Math.pow(y - (rect.top + rect.bottom) / 2, 2));
            if (distance < minDistance) {
                minDistance = distance;
                closestPos = pos;
            }
        }
    }

    // If no direct hit, return the closest position
    return closestPos;
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

