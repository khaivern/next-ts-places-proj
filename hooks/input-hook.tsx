import { useReducer } from 'react';

const inputStructure = {
  val: '',
  isValid: false,
};

interface inputInterface {
  inputs: {
    [id: string]: {
      val: string;
      isValid: boolean;
    };
  };
  overallIsValid: boolean;
}

const initialInput = {
  inputs: {
    title: inputStructure,
    image: inputStructure,
    description: inputStructure,
    address: inputStructure,
  },
  overallIsValid: false,
};

interface onInputAction {
  type: 'CHANGE';
  id: string;
  value: string;
  isValid: boolean;
}

type Action = onInputAction;

const inputReducer = (state: inputInterface, action: Action) => {
  switch (action.type) {
    case 'CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.id) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.id]: {
            val: action.value,
            isValid: action.isValid,
          },
        },
        overallIsValid: formIsValid,
      };
    default:
      return state;
  }
};

const useInputHook = () => {
  const [inputState, dispatchInputAction] = useReducer(
    inputReducer,
    initialInput
  );

  const inputHandler = (id: string, value: string, isValid: boolean) => {
    console.log('FROM HOOK ', id, value, isValid)
    dispatchInputAction({ type: 'CHANGE', id, value, isValid });
  };

  return { inputState, inputHandler };
};

export default useInputHook;
