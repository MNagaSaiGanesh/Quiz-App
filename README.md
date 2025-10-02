# Full-Stack Development Quiz Application

## Project Description
This is a responsive quiz application built with React and TypeScript. Users can take a timed quiz on full-stack development concepts and view detailed results.

**Live Demo:** https://quiz-app-one-cyan.vercel.app/

## Key Features
- Interactive quiz interface with smooth transitions  
- 5-minute countdown timer with low-time warnings  
- Previous/Next navigation with answer validation  
- Results breakdown with correct/incorrect indicators and explanations  
- Mobile-first responsive design  
- Full TypeScript support for type safety  
- Optimized for fast loading and smooth interactions  

## Getting Started

### Prerequisites
- Node.js v16.0+  
- npm v8.0+  
- Git  

### Installation
git clone https://github.com/MNagaSaiGanesh/Quiz-App
cd Quiz-App
npm install
npm start

Open http://localhost:3000/ in your browser.

### Production Build
npm run build

The optimized output will be in the `build` folder.

## Running Tests
npm test
npm test -- --watch
npm test -- --coverage --watchAll=false

Covers:
- Component rendering  
- User interactions  
- State management and timer  
- Error handling  
- API integration  

Run specific tests:
npm test -- --testNamePattern="Quiz"
npm test src/components/Quiz.test.tsx


## Project Structure
quiz-app/
├─ public/
│  ├─ index.html
│  ├─ manifest.json
│  └─ favicon.ico
├─ src/
│  ├─ components/
│  ├─ hooks/
│  ├─ services/
│  ├─ types/
│  ├─ App.tsx
│  ├─ index.tsx
│  └─ styles/
├─ vercel.json
├─ package.json
├─ tsconfig.json
└─ README.md



## Usage
1. **Begin Quiz:** Click to start the 5-minute timer.  
2. **Answer Questions:** Select an option for each question.  
3. **Navigate:** Use Previous/Next buttons.  
4. **Submit:** Send answers on the final question.  
5. **View Results:** See score, per-question feedback, and explanations.  

## Configuration
Create a `.env` in the project root:
REACT_APP_API_URL=https://your-backend-api.com/api
REACT_APP_APP_NAME=Quiz Application
REACT_APP_VERSION=1.0.0
GENERATE_SOURCEMAP=false

Modify quiz content in `src/services/api.ts`.

## Architecture and Design

**Tech Stack**  
- React 18 with hooks  
- TypeScript  
- CSS3 (Flexbox/Grid)  
- Axios for HTTP requests  

**Patterns**  
- Custom `useQuiz` hook for state management  
- Modular, reusable components  
- Error boundaries for graceful failure  
- Mobile-first responsive design  

**Performance**  
- Memoized callbacks with `useCallback`  
- Code splitting via `React.lazy()`  
- Optimized CSS selectors and bundle size  

## Deployment

### Vercel
1. Connect your repository  
2. Framework: Create React App  
3. Build command: `npm run build`  
4. Output directory: `build`  
5. Install command: `npm install`  

### Alternatives
- Netlify (drag-and-drop)  
- GitHub Pages (`gh-pages`)  
- AWS S3  
- Firebase Hosting  

## Assumptions & Future Enhancements
- Single quiz of 10 questions using mock data  
- No authentication or progress saving  
- Future: real API integration, user accounts, multiple quizzes, analytics, persistence, accessibility improvements  

## Development Commands
npm start
npm test
npm run build
npm run analyze
npm run lint
npm run deploy


## Troubleshooting
- **Port in use:**  
PORT=3001 npm start

- **Build errors:**  
rm -rf node_modules package-lock.json
npm install

- **TypeScript errors:**  
npx tsc --noEmit


## License
MIT License

## Acknowledgments
- React  
- TypeScript  
- Create React App  
- Vercel  
