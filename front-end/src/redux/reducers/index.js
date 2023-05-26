// qui si definisce la nostra funzione reducer
// il reducer prende lo stato corrente dell'app, prende anche l'azione che gli arriva dopo un dispatch, ne legge il type,
// con questi due dati genera un nuovo stato globale dell'app

// da dove si comincia? si comincia con uno stato iniziale
const initialState = {
  userDto: {},
};
// lo stato iniziale è quello che viene generato automaticamente ad ogni refresh del browser, prima di essere modificato

// il reducer è una PURE FUNCTION
// quindi non dovrà modificare i suoi parametri

const mainReducer = (state = initialState, action) => {
  // da questa funzione, in ogni condizione o situazione, dovremmo PER FORZA ritornare IL NUOVO STATO
  switch (action.type) {
    // qui inseriremo i vari casi, per i diversi "type" degli oggetti "action" che passeremo
    case "SET_USER":
      console.log(action.payload.firstName);
      return {
        ...state,
        userDto: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        userDto: {},
      };
    default:
      console.log(action.payload);
      return state;
    // nel caso peggiore, quanto meno, ritorneremo lo stato precedente. Per OGNI chiamata di mainReducer, senza rompere il flusso di redux.
  }
};

export default mainReducer;
