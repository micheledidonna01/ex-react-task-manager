# EX  - Task Manager Avanzato

## 📌 Milestone 1 - Setup e Routing
Clonare il backend del progetto, impostare il frontend con Vite e configurare il routing con react-router-dom.

1. Clonare e avviare il backend:

- Per gestire i task, utilizzeremo un backend già pronto.

- Cloniamo il repository

https://github.com/boolean-it/react-task-manager-back
e avviamo il server con:

npm install
npm run start
- Dopo qualche secondo, nel terminale apparirà un messaggio simile a:

✅ Server in ascolto su http://localhost:3001
Questo URL dovrà essere utilizzato per configurare il frontend.

2. Impostiamo il frontend:

-  Creiamo il progetto con Vite.
- Installiamo react-router-dom nel progetto.
- Creiamo il router principale in App.jsx utilizzando BrowserRouter.
3. Definiamo due pagine principali:

- Lista dei Task (TaskList.jsx) → mostrerà l'elenco dei task.
- Aggiungi Task (AddTask.jsx) → conterrà il form per aggiungere un nuovo task.
4. Aggiungere una barra di navigazione con NavLink, per permettere all'utente di spostarsi tra le pagine.

5. Definire le rotte con Routes e Route, associando ogni percorso alla rispettiva pagina.