const initialState = { count:[]};


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

        default:
            return state;
    }
};
