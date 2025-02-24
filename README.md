### 📝 Sympl Forms
A simple form builder built with React and TypeScript that allows users to create, validate, preview and receive responses with auto-save functionality.

### ✨ Features
Form Builder: Supports Text, Number, and Select fields with built-in validations and auto-save.
 - Provide Custom Form Name
 - Auto Save on valid changes with saving indication
 - Validation of Form Builder fields
 - Mock API save to Local Storage
 - Mock API fetch from Local Storage on page refresh
 - Custom Validation Rules for Text and Number

Response List: View saved form responses
 - Fetch Responses from LocalStorage
 - Show Form Response based on Form Schema
 - Collapsible View

Form Preview: Render and validate forms using the generated schema.
 - Generate Form Preview from Schema
 - Validate Form Values based on Custom Validation Rules and Required Checkbox
 - Submit valid form and save response 

Other
 - Responsiveness on mobile devices

### 🛠️ Tech Stack
- React + TypeScript: End-to-end type safety
- Vite: Fast and efficient build tool
- Chakra UI: Responsive and accessible design components
- Zustand: Lightweight state management
- Zod: Form schema validation

### ✅ To Be Done
- Support pre-filled form values
- Custom validation rules for Select fields
- Unit and integration tests

### 💻 Run the Application
````bash
npm install
npm run dev