import axios from 'axios';
import { GET_ERRORS,SET_CURRENT_USER } from '../../actions/types';
import setAuthToken from '../../setAuthToken';
import jwt_decode from 'jwt-decode';
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
export const refuserCandidature= (idJudge,idCandidature,Review) => {
    return async dispatch => {
        const response = axios.put('http://localhost:6003/responsesJudges/'+idJudge+'/'+idCandidature+'/refuser',Review).then(res=>{console.log(res);
            console.log(res.data)})



        return dispatch({
            type: "refuser_candidature",
            payload: response.data
        });
    };
};
export const appelerCandidature= (idJudge,idCandidature,numCandidature,Review) => {
    return async dispatch => {
        const response = axios.put('http://localhost:6003/Candidatures/'+idJudge+'/'+idCandidature+'/'+numCandidature+'/call',Review).then(res=>{console.log(res);
            console.log(res.data)})



        return dispatch({
            type: "appeler_candidature",
            payload: response.data
        });
    };
};
export const loginUser = (judge) => {
    return async dispatch => {
        axios.post('http://localhost:6003/judges/login', judge)
            .then(res => {
                const {token} = res.data;
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                const decoded = jwt_decode(token);
                setCurrentUser(decoded)
                return dispatch({
                    type: "GET_USER",
                    payload: res.data
                });
            })
    }

}
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}



//affecter charge a un projet
export const affecterCharge= (idProjet,idCharge) => {
    return async dispatch => {
        const response = axios.post('http://localhost:6003/projects/affectation/'+idProjet,idCharge
        ).then(res=>{console.log(res);
            console.log(res.data)})

        return dispatch({
            type: "affecterCharge",
            payload: response.data
        });
    };
};

//supprimer membre
export const SupprimerMembre= (idMember) => {
    return async dispatch => {
        const response = axios.delete('http://localhost:6003/members/deleteMember/'+idMember
        ).then(res=>{console.log(res);
            console.log(res.data)})



        return dispatch({
            type: "SupprimerMembre",
            payload: response.data
        });
    };
};

//Editer membre
export const editerMembre= (idMembre,membre) => {
    return async dispatch => {
        const response = axios.put('http://localhost:6003/membres/editMember/'+idMembre,membre
        ).then(res=>{console.log(res);
            console.log(res.data)})



        return dispatch({
            type: "editerMembre",
            payload: response.data
        });
    };
};