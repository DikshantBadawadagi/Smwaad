import * as api from "../api/index";
export const fetchResults = () => async (dispatch) => {
    try{
        const {data} = await api.fetchResults();
        dispatch({type:'FETCH_ALL_RESULTS',payload:data});
    }
    catch(error){
        console.log(error.message);
    }
};
export const createResult=(results)=>async(dispatch)=>{
    try{
        const{data}=await api.createResult(results);
        console.log(data);
        dispatch({type:'CREATE_RESULTS',payload:data});
    }catch(error){
        console.log(error.message);
    }
};