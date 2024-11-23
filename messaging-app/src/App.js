import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import UserSelector from "./components/UserSelector";
import TypeMessageSelector from "./components/TypeMessageSelector";
import { useState } from "react";
import ChannelSelector from "./components/ChannelSelector";
import MessageForm from "./components/MessageForm";
import {
  templateGroupByTypeMessage,
  usersDefault,
} from "./utils/constants";

import Swal from 'sweetalert2'

function App() {
  const [isUsersSended, setIsUsersSended] = useState(false);
  const [isTypeMessageSended, setIsTypeMessageSended] = useState(false);
  const [isChannelsSended, setIsChannelsSended] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedChannels, setSelectedChannels] = useState(new Set());
  const [currentChannel, setCurrenChannel] = useState(0);
  const [filteredTemplates, setFilteredTemplates] = useState([]);

  const handleSubmitUsers = () => {
    setIsUsersSended((prev) => !prev);
  };
  const handleUserSelection = (updatedUsers) => {
    setSelectedUsers(updatedUsers);
  };
  const handleSubmitTypeMessage = () => {
    setIsTypeMessageSended((prev) => !prev);
  };
  const handleTypeMessageSeleccion = (updatedTypeMessage) => {
    setSelectedMessage(updatedTypeMessage);
  };
  const handleChannelsSelection = (updatedChannels) => {
    setSelectedChannels(updatedChannels);
  };  

  const handleNext = () => {
    if (currentChannel < filteredTemplates.length - 1) {
      setCurrenChannel(currentChannel + 1);
    }else {
      //devuelve mensaje personalizado, reemplaza [username] por el nombre de usuario

      /* const customizedTemplates = filteredTemplates
      .map((item) => {
        return Array.from(selectedUsers).map((userId) => {
          const user = usersDefault.find(user => user.id === userId);
          const customizedMessage = item.mensaje.replace(
            "[userName]",
            user.name
          );
          return { ...item, mensaje: customizedMessage, userId: user.id };
        });
      })
      .flat();  */
      //console.log(customizedTemplates);
      Swal.fire({
        title: "Estás seguro de enviar los mensajes?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No, Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Enviar!"
      }).then((result) => {
        if (result.isConfirmed) {
          const userIds = Array.from(selectedUsers)
          console.log({...filteredTemplates, userIds})
          Swal.fire({
            title: "Enviado!",
            html: "Se han enviado los mensajes a los usuarios exitosamente (revisar consola)",
            icon: "success"
          });
          
        }
      });
      

    }
  };

  const handlePrev = () => {
    if (currentChannel > 0) {
      setCurrenChannel(currentChannel - 1);
    }else {
      setIsChannelsSended((prev) => !prev);
    }
  };

  const handleUpdateTemplate = (updatedTemplate) => {
    setFilteredTemplates((prevTemplates) =>
      prevTemplates.map((template, index) =>
        index === currentChannel ? updatedTemplate : template
      )
    );
  };
  
  const handleSubmitChannels = () => {
    setIsChannelsSended((prev) => !prev);
    
    const temp = templateGroupByTypeMessage[selectedMessage].filter(template =>
    selectedChannels.has(template.channel));
    
    setFilteredTemplates(temp);
  };
  return (
    <div className="App">
      {!isUsersSended && (
        <UserSelector
          onClickSendUser={handleSubmitUsers}
          selectedUsers={selectedUsers}
          setSelectedUsers={handleUserSelection}
        ></UserSelector>
      )}
      {isUsersSended && !isTypeMessageSended && (
        <TypeMessageSelector
          onClickSendTypeMessage={handleSubmitTypeMessage}
          selectedMessage={selectedMessage}
          setSelectedMessage={handleTypeMessageSeleccion}
          onClickBack={handleSubmitUsers}
        ></TypeMessageSelector>
      )}
      {isTypeMessageSended && !isChannelsSended && (
        <ChannelSelector
          onClickBack={handleSubmitTypeMessage}
          selectedChannels={selectedChannels}
          setSelectedChannels={handleChannelsSelection}
          onClickSendChannels={handleSubmitChannels}
        ></ChannelSelector>
      )}
      {isChannelsSended && filteredTemplates.length > 0 && (
        <div>
          <MessageForm
            key={filteredTemplates[currentChannel].channel}
            template={filteredTemplates[currentChannel]}
            onNext={handleNext} 
            onBack={handlePrev}
            onUpdate={handleUpdateTemplate}
            buttonLabel={(currentChannel < filteredTemplates.length - 1) ? "Siguiente" : "Enviar"}
          ></MessageForm>
        </div>
      )}
    </div>
  );
}

export default App;
