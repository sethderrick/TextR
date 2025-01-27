# Text Selection Highlighter

I went down a rabbit hole after watching a ThePrimeagen video wherein it was suggested that devs should try and build their own text editor from scratch. It sounded like a juicy little challenge and this is my effort. It will be a WIP for a bit. I'll change this README when I'm (kinda) done.

NOTE: Like many things apparently simple...this ain't!

## Features

-   Calculate the position of the mouse cursor relative to the text container
-   Update the current selection as the mouse moves
-   Finalize the selection when the mouse button is released
-   Highlight the selected text with a specified color

## Upcoming Features

-   Adding undo/redo functionality...(command pattern?)
-   Rich text editing capabilities
-   Code syntax highlighting
-   Word wrap
-   ???

## Usage

Before using the text editor in your project, you need to compile the TypeScript files to JavaScript. Run the following command in your project directory:

```bash
tsc editor.ts
```
This will generate an editor.js file that you should include in your HTML.

Include the JavaScript file in your project and call the functions as needed. The main functions are:

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
