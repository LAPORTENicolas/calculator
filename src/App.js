import {useState} from "react";


const App                           = _     => {

    // Propriété
    const [print, updatePrint]      = useState('0')
    const [lockDeci, upLockedDeci]  = useState(false)

    // Méthode
    const checkFirstNumber          = state         => {
        if (state[0] === '0' && state.length >= 2 && state[1] !== '.') {
            return [...state].splice(1, state.length-1).join('')
        }
        return state
    }
    const addNumber                 = (n, state)    => {
        return print + n
    }
    const addOperator               = (c, state)    => {
        upLockedDeci(false)

        if (print[print.length - 1] === '/' || print[print.length - 1] === 'x' || print[print.length - 1] === '-' || print[print.length - 1] === '+') {
            if (print[print.length - 1] !== '-' && c === '-') {
                const newPrint = [...print]
                newPrint[print.length - 1] = c
                return newPrint.join('')
            } else { return print + c }
        } else {
            return print + c
        }
    }
    const addDecimal                = state         => {
        if (!lockDeci) {
            state+= '.'
        }
        console.log(state)
        upLockedDeci(true)
        return state
    }
    const calcul                    = state         => {
        if (state%2 === 0) {
            upLockedDeci(false)
        } else { upLockedDeci(true) }
        return Math.round(1000000000000 * eval(state))/1000000000000
    }
    const removeLastOperator        = state         => {

        if (state[state.length-1] === '/' || state[state.length-1] === '*' || state[state.length-1] === '-' || state[state.length-1] === '+') {
            return removeLastOperator(state.splice(0, state.length-1))
        } else {
            return state.join('')
        }
    }

    const cbInput                   = key           => {
        let state = print

        if (key === 'AC') {
            state = '0'
            upLockedDeci(false)
        } else if (key >= 0 && key <= 9) {
            state = addNumber(key, state)
        } else if (key === '/' || key === '*' || key === '-' || key === '+') {
            state = addOperator(key, state)
        } else if (key === '.' && !lockDeci) {
            state = addDecimal(state)
        } else if (key === '=') {
            state = removeLastOperator(state.split(''))
            state = calcul(state)
        }

        state = checkFirstNumber(state)

        updatePrint(state)
    }

    return (
          <div className={'app'}>
              <div className="calculator">
                  <div className={"result"} id={'display'}>
                      {print}
                  </div>
                  <div className={"input"}>
                      <div className={'element elementa1'} onClick={_ => cbInput('AC')} id={'clear'}><span>AC</span></div>
                      <div className={'element elementa2'} onClick={_ => cbInput('/')} id={'divide'}><span>/</span></div>
                      <div className={'element elementa3'} onClick={_ => cbInput('*')} id={'multiply'}><span>x</span></div>
                      <div className={'element elementa4'} onClick={_ => cbInput('7')} id={'seven'}><span>7</span></div>
                      <div className={'element elementa5'} onClick={_ => cbInput('8')} id={'eight'}><span>8</span></div>
                      <div className={'element elementa6'} onClick={_ => cbInput('9')} id={'nine'}><span>9</span></div>
                      <div className={'element elementa7'} onClick={_ => cbInput('-')} id={'subtract'}><span>-</span></div>
                      <div className={'element elementa8'} onClick={_ => cbInput('4')} id={'four'}><span>4</span></div>
                      <div className={'element elementa9'} onClick={_ => cbInput('5')} id={'five'}><span>5</span></div>
                      <div className={'element elementa10'} onClick={_ => cbInput('6')} id={'six'}><span>6</span></div>
                      <div className={'element elementa11'} onClick={_ => cbInput('+')} id={'add'}><span>+</span></div>
                      <div className={'element elementa11'} onClick={_ => cbInput('1')} id={'one'}><span>1</span></div>
                      <div className={'element elementa11'} onClick={_ => cbInput('2')} id={'two'}><span>2</span></div>
                      <div className={'element elementa11'} onClick={_ => cbInput('3')} id={'three'}><span>3</span></div>
                      <div className={'element elementa12'} onClick={_ => cbInput('=')} id={'equals'}><span>=</span></div>
                      <div className={'element elementa13'} onClick={_ => cbInput('0')} id={'zero'}><span>0</span></div>
                      <div className={'element elementa14'} onClick={_ => cbInput('.')} id={'decimal'}><span>.</span></div>
                  </div>
              </div>
          </div>
      );
}

export default App;