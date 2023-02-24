// select dom elements
const addMatchBtn = document.querySelector('.lws-addMatch')
const allMatches = document.querySelector('.all-matches')


// action type
const Add_MATCH = 'ADD_MATCH'

// action creators
const addMatch = ()=>{
    return {
        type : Add_MATCH
    }
}

// reducers function 

// addMatch
const addMatchReducer = (state = {matchCount : 1} ,action)=>{
    if(action.type === Add_MATCH){
        return {
            ...state,
            matchCount : state.matchCount + 1
        }
    }else{
        return state;
    }
}

// creating redux store
const matchCountStore = Redux.createStore(addMatchReducer) 

// creating match element 
const createNewMatchEle = (matchCount)=>{
    const newMatchDiv = document.createElement('div');
  newMatchDiv.classList.add('match');
  newMatchDiv.innerHTML = `
    <div class="wrapper">
      <button class="lws-delete">
        <img src="./image/delete.svg" alt="" />
      </button>
      <h3 class="lws-matchName">Match ${matchCount}</h3>
    </div>
    <div class="inc-dec">
      <form class="incrementForm">
        <h4>Increment</h4>
        <input
          type="number"
          name="increment"
          class="lws-increment"
        />
      </form>
      <form class="decrementForm">
        <h4>Decrement</h4>
        <input
          type="number"
          name="decrement"
          class="lws-decrement"
        />
      </form>
    </div>
    <div class="numbers">
      <h2 class="lws-singleResult">120</h2>
    </div>
  `;

  return newMatchDiv;
} 

//removeMatchElement

const removeMatchElement = e =>{
  
  if (e.target.parentElement.classList.contains('lws-delete')) {
    e.target.parentElement.parentElement.parentElement.remove();
  }
}





// Define a function to handle the click event of the add match button
function handleAddMatchClick() {
    // Dispatch Redux action to add a match
    matchCountStore.dispatch(addMatch());
  }
  
  // Subscribe to changes in the Redux store and update the UI accordingly
  function handleStoreChange() {
    const state = matchCountStore.getState();
    const matchCount = state.matchCount;
    const newMatchDiv = createNewMatchEle(matchCount);
    allMatches.appendChild(newMatchDiv);
  }
  
  // Add event listener to the add match button
  addMatchBtn.addEventListener('click', handleAddMatchClick);
  allMatches.addEventListener('click', (e) => removeMatchElement(e));
  
  // Subscribe to changes in the Redux store
  matchCountStore.subscribe(handleStoreChange);
  
