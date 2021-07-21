import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTutorial, deleteTutorial } from "../actions/tutorials";
import TutorialService from "../services/TutorialService";

const Tutorial = (props) => {
    const initialTutorialState = {
        id: null,
        title: "",
        description: "",
        published: false
    }

    const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const getTutorial = (id) => {
        TutorialService.get(id)
            .then((response) => {
                setCurrentTutorial(response.data);
                console.log(response.data);
            })
    }

    useEffect(() => {
        getTutorial(props.match.params.id)
    }, [props.match.params.id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentTutorial([{ ...currentTutorial, [name]: value }]);
        


    };

    const updateStatus = status => {
        const data = {
            id: currentTutorial.id,
            title: currentTutorial.title,
            description: currentTutorial.description,
            published: status
        }

        dispatch(updateTutorial(currentTutorial.id, data))
            .then((response) => {
                console.log(response);

                setCurrentTutorial({ ...currentTutorial, published: status })
                setMessage("your status has been updated successfully!");

            }).catch((err) => {
                console.log(err);
            })
    };

    const updateContent = (e) => {
        e.preventDefault();
        console.log("id",currentTutorial.id);
        dispatch(updateTutorial(currentTutorial,1))
          .then((response) => {
            console.log("res",response);
            setMessage("The tutorial was updated successfully!");
            
          })
          .catch(e => {
            console.log(e);
          });
      };
    

    const removeTutorial = () => {
        dispatch(deleteTutorial(currentTutorial.id))

            .then((response) => {

                props.history.push("/tutorials");

            }).catch((err) => {
                console.log(err);
            })
    };
    console.log("demo",currentTutorial.id);
    console.log("demo",currentTutorial)

    return (
        <div>
            {currentTutorial ? (
                <div className="edit-form">
                    <h4>Tutorial</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={currentTutorial.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={currentTutorial.description}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentTutorial.published ? "Published" : "Pending"}
                        </div>
                        {currentTutorial.published ? (
                        <button
                            className="badge bg-primary mr-2"
                            onClick={() => updateStatus(false)}
                        >
                            UnPublish
                        </button>
                    ) : (
                        <button
                            className="badge bg-primary mr-2"
                            onClick={() => updateStatus(true)}
                        >
                            Publish
                        </button>
                    )}

                    <button className="badge bg-danger mr-2" onClick={removeTutorial}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge bg-success"
                        onClick={updateContent}
                    >
                        Update
                    </button>
                    <p>{message}</p>

                    </form>

                    
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Tutorial...</p>
                </div>
            )}
        </div>
    )

};

export default Tutorial;