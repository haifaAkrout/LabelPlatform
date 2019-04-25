import { GET_ERRORS } from '../../actions/types';
import { SET_CURRENT_USER } from '../../actions/types';

const initialState = { count:[],
    isAuthenticated: false,};


export default (state = initialState, action) => {
    switch (action.type) {
        case "send_email":
            return {
                ...state,
                emails: action.payload,

            };
        case "add_judge":
            return {
                ...state,
                count: action.payload,

            };
        case "delete_judge":
            return {
                ...state,
                demandes: action.payload,

            };
        case "accepter_judge":
            return {
                ...state,
                accepter: action.payload,

            };
        case "refuser_judge":
            return {
                ...state,
                accepter: action.payload,

            };
        case "enregistrerBrouillon_Judge":
            return {
                ...state,
                Judges: action.payload,

            };
        case "refuser_candidature":
            return {
                ...state,
                candidature: action.payload,

            };
        case "appeler_candidature":
            return {
                ...state,
                candidature: action.payload,

            };
        case "GET_USER":
            return{
                ...state,
            user:action.payload}

        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                auth:action.payload
            }


        default:
            return state;
    }
};
