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


## 📌 Milestone 4 - Creazione del Custom Hook useTasks() (GET)
Creare un custom hook per centralizzare la gestione dei task e semplificare l'accesso ai dati.


1. Creare un hook useTasks() che recupera i task iniziali con una richiesta GET a /tasks e li memorizza in uno stato locale (useState).

2. Definire le funzioni addTask, removeTask, updateTask all'interno di useTasks(), lasciandole vuote per ora.

3. Rendere disponibili le funzioni e la lista dei task restituendole come valore dell'hook.

4. Integrare useTasks() nel GlobalContext, in modo che tutti i componenti possano accedere ai task e alle funzioni di gestione.

## 📌 Milestone 5 - Creazione del Form per Aggiungere un Task
Creare un form per aggiungere un task, senza ancora inviare i dati all'API.


1. Aggiornare la pagina AddTask.jsx per contenere un form con i seguenti campi:

 - Nome del task (title) → Input controllato (useState).
 - Descrizione (description) → Textarea non controllata (useRef).
 - Stato (status) → Select non controllata (useRef), con opzioni "To do", "Doing", "Done", e valore predefinito "To do".

2. Validare il campo Nome (title):

 - Il campo non può essere vuoto.
 - Non può contenere simboli speciali.
 - Se il valore è errato, mostrare un messaggio di errore.
 - Utilizzare una costante con i caratteri vietati:
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\",.<>?/`~";

3. Gestione del Submit del Form:

 - Al click del bottone "Aggiungi Task", il form deve SOLO stampare in console l’oggetto task con i valori inseriti (NON deve ancora essere inviata la richiesta all’API).


## 📌 Milestone 6 - Integrazione dell'API per Aggiungere un Task (POST)
Collegare il form di AddTask all'API e completare la funzione addTask in useTasks().


1. Completare la funzione addTask in useTasks():
 - La funzione deve ricevere un oggetto contenente le proprietà title, description e status.

 - Effettuare una chiamata API POST /tasks, inviando l’oggetto come body in formato JSON.

 - La chiamata API restituisce un oggetto con la seguente struttura:

```

In caso di successo:
{ success: true, task: /* la task creata */ }

```

```

In caso di errore:
{ success: false, message: "Messaggio di errore" }

```

 - La funzione addTask deve controllare il valore di success nella risposta:

```

Se success è true, aggiornare lo stato globale aggiungendo la nuova task.
Se success è false, lanciare un errore con message come testo.

```

2. Modificare la gestione del Submit del Form in AddTask.jsx:
 - Eseguire la funzione addTask di useTasks(), passando l’oggetto con title, description e status.
 - Se la funzione esegue correttamente l'operazione:
  - Mostrare un alert di conferma dell’avvenuta creazione della task.
  - Resettare il form.
 - Se la funzione lancia un errore:
  - Mostrare un alert con il messaggio di errore ricevuto.


## 📌 Milestone 7 - Creazione della Pagina Dettaglio Task
Creare la pagina TaskDetail.jsx, che visualizza i dettagli di un task


1. Aggiornare TaskRow.jsx
 - Rendere il title un link a /task/:id, in modo che cliccando sul nome del task si venga reindirizzati alla pagina di dettaglio.

2. Aggiornare App.jsx per aggiungere la rotta TaskDetail.jsx
 - Aggiungere la rotta /task/:id che caricherà il componente TaskDetail.jsx.

3. Creare TaskDetail.jsx per mostrare:
 - Nome (title)
 - Descrizione (description)
 - Stato (status)
 - Data di creazione (createdAt)
 - Un bottone "Elimina Task", che per ora stampa solo "Elimino task" in console.


## 📌 Milestone 8 - Funzione di Eliminazione Task (DELETE)
Aggiungere la funzionalità di eliminazione di un task con una chiamata API e aggiornare lo stato.


1. Completare la funzione removeTask in useTasks():
 - La funzione deve ricevere un taskId e effettuare una chiamata API DELETE /tasks/:id.

 - La chiamata API restituisce un oggetto con la seguente struttura:

```

In caso di successo:

{ success: true }
In caso di errore:

{ success: false, message: "Messaggio di errore" }

```

 - La funzione removeTask deve controllare il valore di success nella risposta:

```

Se success è true, rimuovere il task dallo stato globale.
Se success è false, lanciare un errore con message come testo.

```

2. Gestire l'eliminazione della task in TaskDetail.jsx:
 - Al click su "Elimina Task", chiamare removeTask passando l'id del task.
 - Se la funzione esegue correttamente l'operazione:
  - Mostrare un alert di conferma dell’avvenuta eliminazione.
  - Reindirizzare l’utente alla lista dei task (/).
 - Se la funzione lancia un errore:
  - Mostrare un alert con il messaggio di errore ricevuto.