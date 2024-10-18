const formReducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_FIELD': {
        return {
          ...state,
          [action.field]: action.value,
        };
      }
      case 'RESET_FORM': {
        return {
          name: '',
          email: '',
          phone: '',
        };
      }
      default:
        return state;
    }
  };
  
  export default formReducer;
  