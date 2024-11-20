import React, { useState } from 'react';
import Modal from 'react-modal';
import './App.css';

Modal.setAppElement('#root');

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showCheckboxForm, setShowCheckboxForm] = useState(true);
  const [showMessageTypeForm, setShowMessageTypeForm] = useState(true);
  const [showChannelSelectionForm, setShowChannelSelectionForm] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [selectedMessageType, setSelectedMessageType] = useState('');
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [currentChannelIndex, setCurrentChannelIndex] = useState(0);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const channelNames = {
    option1: 'Correo Electronico',
    option2: 'Mensaje de Texto',
    option3: 'Whatsapp'
  };

  const openModal = () => {
    const checkboxes = document.querySelectorAll('.checkbox-container input[type="checkbox"]');
    const checkedUsers = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.id);

    if (checkedUsers.length > 0) {
      setSelectedUsers(checkedUsers);
      setErrorMessage('');
      setShowCheckboxForm(false);
      setModalIsOpen(true);
    } else {
      setErrorMessage('TIENES QUE ELEGIR UN USUARIO ANTES');
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setShowCheckboxForm(true);
    setShowMessageTypeForm(true);
    setShowChannelSelectionForm(false);
    setShowMessageForm(false);
    setSelectedUsers([]);
    setCurrentUserIndex(0);
    setSelectedChannels([]);
    setCurrentChannelIndex(0);
  };

  const goToChannelSelection = () => {
    const selectedMessageType = document.querySelector('input[name="messageType"]:checked');
    if (selectedMessageType) {
      setSelectedMessageType(selectedMessageType.value);
      setShowMessageTypeForm(false);
      setShowChannelSelectionForm(true);
      setErrorMessage('');
    } else {
      setErrorMessage('TIENES QUE ELEGIR UN TIPO DE MENSAJE ANTES!!!!');
    }
  };

  const goBackToMessageType = () => {
    setShowMessageTypeForm(true);
    setShowChannelSelectionForm(false);
  };

  const goToMessageForm = () => {
    const selectedChannels = Array.from(document.querySelectorAll('input[name="channel"]:checked')).map(input => input.value);
    if (selectedChannels.length > 0) {
      setSelectedChannels(selectedChannels);
      setShowChannelSelectionForm(false);
      setShowMessageForm(true);
      setCurrentChannelIndex(0);
      setFormValues(selectedMessageType, selectedChannels[0], selectedUsers[currentUserIndex]);
      setErrorMessage('');
    } else {
      setErrorMessage('TIENES QUE ELEGIR UN CANAL DE ENVIO ANTES!!!!');
    }
  };

  const setFormValues = (messageType, channel, user) => {
    if (messageType === 'option1' && channel === 'option1') {
      setSubject('Invitacion a Proceso');
      setMessage(`Hola, ${user} hemos visto tu perfil y nos parece interesante. Encuentra mas informacion aqui: [Link]`);
    } else if (messageType === 'option1' && (channel === 'option2' || channel === 'option3')) {
      setSubject('');
      setMessage(`Hola, ${user} hemos visto tu perfil y nos parece interesante. Encuentra mas informacion aqui: [Link]`);
    } else if (messageType === 'option2' && channel === 'option1') {
      setSubject('Recordatorio de proceso');
      setMessage(`Hola, ${user} nos gustaria recordarte que tienes pendiente un proceso. Entra aqui para continuar [Link]`);
    } else if (messageType === 'option2' && (channel === 'option2' || channel === 'option3')) {
      setSubject('');
      setMessage(`Hola, ${user} nos gustaria recordarte que tienes pendiente un proceso. Entra aqui para continuar [Link]`);
    } else if (messageType === 'option3' && channel === 'option1') {
      setSubject('');
      setMessage('');
    } else if (messageType === 'option3' && (channel === 'option2' || channel === 'option3')) {
      setSubject('');
      setMessage('');
    }
  };

  const goBackToChannelSelection = () => {
    setShowChannelSelectionForm(true);
    setShowMessageForm(false);
  };

  const handleNextChannel = () => {
    console.log(`Current message to ${selectedUsers[currentUserIndex]}: Subject: ${subject}, Message: ${message}`);
    if (currentChannelIndex < selectedChannels.length - 1) {
      setCurrentChannelIndex(currentChannelIndex + 1);
      setFormValues(selectedMessageType, selectedChannels[currentChannelIndex + 1], selectedUsers[currentUserIndex]);
    } else {
      console.log(`Sending message to ${selectedUsers[currentUserIndex]} via ${channelNames[selectedChannels[currentChannelIndex]]}: Subject: ${subject}, Message: ${message}`);
      if (currentUserIndex < selectedUsers.length - 1) {
        setCurrentUserIndex(currentUserIndex + 1);
        setCurrentChannelIndex(0);
        setFormValues(selectedMessageType, selectedChannels[0], selectedUsers[currentUserIndex + 1]);
      } else {
        closeModal();
      }
    }
  };

  return (
    <div className="container">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {showCheckboxForm && (
        <>
          <button onClick={openModal}>Enviar mensaje</button>
          <div className="checkbox-container">
            {Array.from({ length: 5 }, (_, i) => (
              <div className="input-label" key={i}>
                <input type="checkbox" id={`usuario${i + 1}`} />
                <label className="user" htmlFor={`usuario${i + 1}`}>Usuario {i + 1}</label>
              </div>
            ))}
          </div>
        </>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Message Type Selection"
        className="modal"
        overlayClassName="overlay"
      >
        {showMessageTypeForm && (
          <>
            <h2>Seleccione el tipo de mensaje</h2>
            <div className="radio-options">
              <label>
                <input type="radio" name="messageType" value="option1" />
                Invitacion
              </label>
              <label>
                <input type="radio" name="messageType" value="option2" />
                Recordatorio de Proceso
              </label>
              <label>
                <input type="radio" name="messageType" value="option3" />
                Personalizado
              </label>
            </div>
            <div className="modal-buttons">
              <button onClick={closeModal}>Go Back</button>
              <button onClick={goToChannelSelection}>Next</button>
            </div>
          </>
        )}
        {showChannelSelectionForm && (
          <>
            <h2>SELECCION DE CANALES</h2>
            <div className="checkbox-options">
              <label>
                <input type="checkbox" name="channel" value="option1" />
                Correo Electronico
              </label>
              <label>
                <input type="checkbox" name="channel" value="option2" />
                Mensaje de Texto
              </label>
              <label>
                <input type="checkbox" name="channel" value="option3" />
                Whatsapp
              </label>
            </div>
            <div className="modal-buttons">
              <button onClick={goBackToMessageType}>Go Back</button>
              <button onClick={goToMessageForm}>Next</button>
            </div>
          </>
        )}
        {showMessageForm && (
          <>
            <h2>{channelNames[selectedChannels[currentChannelIndex]]}</h2>
            {selectedChannels[currentChannelIndex] === 'option1' && (
              <div className="input-group">
                <label>Asunto</label>
                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
              </div>
            )}
            <div className="input-group">
              <label>Mensaje</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
            <div className="modal-buttons">
              <button onClick={goBackToChannelSelection}>Go Back</button>
              <button onClick={handleNextChannel}>{currentChannelIndex < selectedChannels.length - 1 ? 'Next' : 'Send'}</button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}

export default App;