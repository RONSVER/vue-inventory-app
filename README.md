# Inventory Web Application

This web application is an autonomous inventory system, where the items and their positions are saved locally, even after closing the browser. The app allows interacting with the items: clicking on an item displays its description and offers the option to delete it.

## Tech Stack

- **Vue 3** - Used for building the user interface with the Composition API.
- **TypeScript** - For strict typing and better development experience.
- **SCSS** - For styling the interface with BEM methodology.
- **Pinia** - For state management.
- **Vite** - For building and developing the application.
- **LocalStorage** - For saving the inventory state (items and positions) after the browser is closed.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/inventory-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd inventory-app
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Run the app in development mode:

   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:3000`.

## Functionality

- **Autonomous operation**: The inventory state is saved in LocalStorage so that item data doesn't get lost when the browser is closed.
- **Item description**: When you click on an item, a popup appears with its description and a button to delete the item.
- **Item deletion**: You can delete items from the inventory via the interface.

## Project Structure

- **src/components** - Contains Vue components like cards for displaying items, descriptions, and modal windows.
- **src/store** - Application state, managing item data using Pinia.
- **src/styles** - SCSS styles following the BEM methodology.
- **src/assets** - Images and other static resources.
- **public** - Static files like favicon, manifest, etc.

## Running Tests

To run tests, use the following command:

```bash
pnpm test
```
