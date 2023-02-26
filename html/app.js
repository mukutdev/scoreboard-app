//selecting dom elements
const addMatchBtn = document.querySelector('.lws-addMatch')
const allMatches = document.querySelector('.all-matches')
const resetBtn = document.querySelector('.lws-reset')

//actions
const Add_MATCH = 'ADD_MATCH'
const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'
const RESET = 'RESET'
const DELETE = 'DELETE'

//actions creators
const addMatch = ()=>{
    return {
        type : Add_MATCH
    }
}
const increment = payload =>{
    return{
        type : INCREMENT,
        payload
    }
}
const decrement = payload =>{
    return {
        type : DECREMENT,
        payload
    }
}
const deleteMatch = matchId =>{
    return{
        type : DELETE,
        payload : matchId
    }
} 

const resetMatch = ()=>{
    return{
        type : RESET
    }
}


//initial state
const initialState = [
    {
        id : 1,
        score :0,
    }
]

// create reduce function
const matchReducer = (state = initialState , action)=>{
    if(action.type === INCREMENT){
        const newMatches = state.map(match =>{
            if(match.id === action.payload.id){
                return{
                    ...match,
                    score : match.score + Number(action.payload.value)
                }
            }else{
                return match;
            }
        })
        return newMatches;

    }else if(action.type === DECREMENT){
        const newMatches = state.map(match =>{
            if(match.id === action.payload.id){

                const newScore = match.score - Number(action.payload.value)
                return{
                    ...match,
                    score : newScore > 0 ? newScore : 0
                }
            }else{
                return match;
            }
        })
        return newMatches;
    }
    else if(action.type === Add_MATCH){
        const id = nextMatchId(state)
        return[
                ...state,
                {id, score : 0}
            ]
    }else if(action.type === DELETE){
        const newMatches = state.filter(match => match.id !== action.payload.id)
        return newMatches;
    }else if(action.type === RESET){
        const newMatches = state.map(match =>{
            return{
                ...match,
                score : 0
            }
        })

        return newMatches
    }else{
        return state;
    }
}

//create store
const store = Redux.createStore(matchReducer)

//createMatchElement
const createMatchElement = ()=>{
    const state = store.getState()
    const matchesView = state.map( match =>{
           return `
           <div class="match">
                    <div class="wrapper">
                        <button  class="lws-delete" onclick="handleDeleteMatch(${match.id})">
                            <img src="./image/delete.svg" alt="" />
                        </button>
                        <h3 class="lws-matchName">Match ${match.id}</h3>
                    </div>
                    <div class="inc-dec">
                        <form class="incrementForm" onsubmit="event.preventDefault(); handleIncrease(${match.id}, this)">
                            <h4>Increment</h4>
                            <input
                                type="number"
                                name="increment"
                                class="lws-increment"
                                value="0"
                              
                            />
                        </form>
                        <form class="decrementForm" onsubmit="event.preventDefault(); handleDecrease(${match.id}, this)">
                            <h4>Decrement</h4>
                            <input
                                type="number"
                                name="decrement"
                                class="lws-decrement"
                                value="0"
                               
                            />
                        </form>
                    </div>
                    <div class="numbers">
                        <h2 class="lws-singleResult">${match.score}</h2>
                    </div>
                </div> 
           ` 
    }).join('')

    allMatches.innerHTML = matchesView
}


store.subscribe(createMatchElement);
//add new match

const handleAddMatchClick = ()=>{
    store.dispatch(addMatch())
}

// handleIncrease
const handleIncrease = (id , element)=>{
    const input = element.querySelector('.lws-increment')
    const value = Number(input.value)
    if(value > 0){
        store.dispatch(increment({ id, value }))
    }
   
}
// handleDecrease
const handleDecrease = (id , element)=>{
    const input = element.querySelector('.lws-decrement')
    const value = Number(input.value)
    if(value > 0){
        store.dispatch(decrement({ id, value }))
    }
   
}

// delete match

const handleDeleteMatch = id =>{
    store.dispatch(deleteMatch({id}))

}

// handle reset 
const handleReset = ()=>{
    store.dispatch(resetMatch({
        type : RESET
    }))
}
//generate unique id
const nextMatchId = (matches)=>{
    const maxId = matches.reduce((maxId , match)=> Math.max(match.id , maxId) , -1)
    const newId = maxId + 1
    return newId > 0 ? newId : 1
}

//event listeners
addMatchBtn.addEventListener('click', handleAddMatchClick);
resetBtn.addEventListener('click' , handleReset)