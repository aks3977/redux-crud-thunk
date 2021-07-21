
import TutorialService from "../services/TutorialService";
import { 
        CREATE_TUTORIAL,
        RETRIEVE_TUTORIALS,
        UPDATE_TUTORIAL,
        DELETE_TUTORIAL,
        DELETE_ALL_TUTORIALS
} from "./types";

export const createTutorial = (title, description) => async (dispatch) => {
    try{
        const res = await TutorialService.create({title, description});
        dispatch({
            type:"CREATE_TUTORIAL",
            payload:res.data
        });

        return Promise.resolve(res.data);
    }   catch(err){
        return Promise.reject(err);
    }
};

export const retrieveTutorial = () => async(dispatch) => {
    try {
        const res = await TutorialService.getAll();
        dispatch({
            type:"RETRIEVE_TUTORIALS",
            payload:res.data
        })

    }   catch(err) {
            console.log(err);
    }
};

export const updateTutorial = (data,id) => async(dispatch) => {
  console.log("action",id,data);
    try {
      const res = await TutorialService.update(id,data);
  
      dispatch({
        type: UPDATE_TUTORIAL,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  

export const deleteTutorial = (id) => async(dispatch) =>{
    try{
    await TutorialService.remove(id);
    
    dispatch({
        type:"DELETE_TUTORIAL",
        payload:{id},
    })


    }catch(err){
        console.log(err);
    }
}

export const deleteAllTutorial = () => async(dispatch) =>{
    try{
        const res = await TutorialService.removeAll();

        dispatch({
            type:"DELETE_ALL_TUTORIALS",
            payload:res.data
        })

        return Promise.resolve(res.data);
    }catch(err){
        return Promise.reject(err);
    }
};

export const findTutorialsByTitle = (title) => async (dispatch) => {
    try {
      const res = await TutorialService.findByTitle(title);
  
      dispatch({
        type: RETRIEVE_TUTORIALS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  


