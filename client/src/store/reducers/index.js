const initialState = { judges: [] };

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
                judges: action.payload,

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


        default:
            return state;
    }
};
