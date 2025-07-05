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

## 📌 Milestone 2 - Setup Context API e Fetch Iniziale
Creare un contesto globale per la gestione dei dati e recuperare la lista dei task dall'API.


1. Salvare l'URL dell'API nel file .env del progetto frontend:
- Creare un file .env nella cartella del progetto frontend e aggiungere lo URL della API raccolto alla Milestone 1.
- In questo modo, l'URL sarà accessibile in tutto il progetto senza doverlo scrivere manualmente nel codice.

2. Creare un Context API (GlobalContext) per gestire lo stato globale dell'applicazione.

3. Definire uno useState all'interno del provider, per memorizzare la lista dei task.

4. Effettuare una richiesta GET a /tasks al caricamento dell'app, utilizzando useEffect, e salvare i dati nello stato.

5. Stampare in console i dati ricevuti per verificare il corretto recupero delle informazioni.

6. Rendere disponibile il GlobalContext.Provider in App.jsx, avvolgendo l'intera applicazione.


## 📌 Milestone 3 - Lista dei Task (Pagina)
Visualizzare l'elenco dei task in una tabella e ottimizzare il rendering con React.memo().


1. Recuperare la lista dei task dal GlobalContext e mostrarla nella pagina TaskList.jsx.

2. Strutturare TaskList.jsx come una tabella, con le intestazioni Nome, Stato, Data di Creazione.

3. Creare un componente TaskRow.jsx, che rappresenta una singola riga della tabella e mostra solo le proprietà title, status e createdAt (escludendo description).

4. Applicare uno stile differente alla colonna status, assegnando i seguenti colori di sfondo alle celle in base al valore dello stato:
 - "To do" → rosso
 - "Doing" → giallo
 - "Done" → verde

5. Utilizzare React.memo() su TaskRow.jsx per ottimizzare le prestazioni ed evitare render inutili.