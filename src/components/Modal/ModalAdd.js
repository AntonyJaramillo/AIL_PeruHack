import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { addWord } from "../../firebase-crud";
import "./ModalAdd.css";

const initialState = {
  word: "",
  mean: "",
};
export const ModalAdd = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [newWord, setNewWord] = useState(initialState);

  const handleInputChange = ({ target: { name, value } }) => {
    return setNewWord({ ...newWord, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addWord(newWord);
    setShow(false);
    setNewWord(initialState);
  };

  return (
    <div>
      <div className="btn-add">
        <Button variant="success" onClick={handleShow}>
          Add Word
        </Button>
      </div>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Word</Modal.Title>
          </Modal.Header>
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <label htmlFor="word">Word:</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="New word"
                  value={newWord.word}
                  name="word"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <label htmlFor="mean">Word mean:</label>
              <div className="input-group">
                <input
                  type="text"
                  value={newWord.mean}
                  name="mean"
                  placeholder="Word mean"
                  className="form-control mb-3"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              {/* <Button variant="danger" onClick={handleClose}>
            Eliminar
          </Button> */}
              <Button variant="primary" type="submit">
                Add
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </div>
  );
};
