# Text Selection Highlighter

This repository contains a simple text selection highlighter implemented in TypeScript. The highlighter allows users to select text within a specified HTML element and highlights the selected text.

## Features

-   Calculate the position of the mouse cursor relative to the text container
-   Update the current selection as the mouse moves
-   Finalize the selection when the mouse button is released
-   Highlight the selected text with a specified color

## Usage

Include the TypeScript file in your project and call the functions as needed. The main functions are:

-   `calculatePosition(x: number, y: number): number` - Calculates the position of the mouse cursor relative to the text container.
-   `updateSelection(event: MouseEvent): void` - Updates the current selection as the mouse moves.
-   `endSelection(event: MouseEvent): void` - Finalizes the selection when the mouse button is released.
-   `highlightSelection(startPos: number, endPos: number): void` - Highlights the selected text with a specified color.

## Example

```typescript
const editor = document.getElementById("editor") as HTMLDivElement;
editor.addEventListener("mousedown", startSelection);
editor.addEventListener("mousemove", updateSelection);
editor.addEventListener("mouseup", endSelection);
```
