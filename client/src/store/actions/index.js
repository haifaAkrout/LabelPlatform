import axios from 'axios';

export const sendemail= (email) => {
    return async dispatch => {
        const response = axios.post('http://localhost:6003/sendEmailToJudge',email
        ).then(res=>{console.log(res);
            console.log(res.data)})



        return dispatch({
            type: "send_email",
            payload: response.data
        });
    };
};

export const addCompte= (Judge) => {
    return async dispatch => {
        const response = axios.put('http://localhost:6003/judges/addCompte',Judge
        ).then(res=>{console.log(res);
            console.log(res.data)})



        return dispatch({
            type: "add_judge",
            payload: response.data
        });
    };
};
export const deleteJudge= (DemandeId,JudgeId) => {
    return async dispatch => {
        const response = axios.delete('http://localhost:6003/judges/'+DemandeId+'/'+JudgeId
        ).then(res=>{console.log(res);
            console.log(res.data)})



        return dispatch({
            type: "delete_judge",
            payload: response.data
        });
    };
};
export const accepterJudge= (JudgeId,judge) => {
    return async dispatch => {
        const response = axios.put('http://localhost:6003/judges/update/'+JudgeId,judge
        ).then(res=>{console.log(res);
            console.log(res.data)})



        return dispatch({
            type: "accepter_judge",
            payload: response.data
        });
    };
};
export const refuserJudge= (JudgeId) => {
    return async dispatch => {
        const response = axios.put('http://localhost:6003/judges/refuse/'+JudgeId
        ).then(res=>{console.log(res);
            console.log(res.data)})



        return dispatch({
            type: "refuser_judge",
            payload: response.data
        });
    };
};
export const enregistrerBrouillonJudge= (idJudge,idCandidature,Review) => {
    return async dispatch => {
        const response = axios.post('http://localhost:6003/responsesJudges/'+idJudge+'/'+idCandidature+'/addAvis',Review).then(res=>{console.log(res);
            console.log(res.data)})



        return dispatch({
            type: "enregistrerBrouillon_Judge",
            payload: response.data
        });
    };
};
export const refuserCandidature= (idCandidature) => {
    return async dispatch => {
        const response = axios.put('http://localhost:6003/responsesJudges/'+idCandidature+'/refuser').then(res=>{console.log(res);
            console.log(res.data)})



        return dispatch({
            type: "refuser_candidature",
            payload: response.data
        });
    };
};