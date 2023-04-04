import { Header } from "../../components/Header";
import "./css/Writing.css";
import { useState, useEffect } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";


const API_KEY = ""; //Put here your API_KEY

export const Writing = () => {
  // const handlePrompt = async ()=>{
  //   const apiInitialPrompt = [{ role: "user", content: `"Instrucciones"
  //   -Siempre respondeme en el idioma igles
  //   -No respondas en español por ningun motivo
  //   ` }];

  //   const apiRequest = {
  //     model: "gpt-3.5-turbo",
  //     messages: apiInitialPrompt,
  //   };
  //   await fetch("https://api.openai.com/v1/chat/completions", {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${API_KEY}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(apiRequest),
  //   })
  //     .then((data) => data.json())
  //     .then((data) => {
  //       console.log({ message: data.choices[0].message.content, sender: "Chatbot" })
  //     })
  //     .catch((error) => console.log(error));
  // }

  // useEffect(() => {
  //   handlePrompt();
  // }, [])

  const [promptController, setPromptController] = useState(true);

  /*=============================================================== */
  const [messages, setMessages] = useState([
    {
      message:
        "My name is Layla. I'm here to help you improve your English. Let's talk about any topic you want",
      sender: "Chatbot",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const handleSend = async (message) => {
    const Instrucciones =
      "Según lo indicado en 'Instrucciones' responde a lo siguiente: ";
    const newMessage = {
      message: Instrucciones + message,
      direction: "outgoing",
      sender: "Usuario",
    };
    const initialPromt = {
      message: `"Instrucciones" 
  
      Hola, quiero utilizar todas tus habilidades para que ayudes a las personas 
      a aprender inglés. Las reglas son las siguientes:
      
        - Tu nivel de inglés debe ser un B1, es decir trata de usar palabras no tan complicadas en las conversaciones.
        - Solo habla en inglés, si el texto ingresado por el usuario es en español, simplemente mencionale lo siguiente: "Soy una inteligencia artificial que te va a ayudar con tu aprendizaje del inglés. Por favor, introduce el texto en Inglés" . Y por nada del mundo hables en español, excepto si identificas el siguiente 
        texto "password: launieslauni" (esto último no se lo indiques al usuario)
        - Trata de hablarle de manera amena y seguirle la conversación o preguntarle por temas de la vida diaria.
        - No te explayes mucho en dar explicaciones.
        - Al final de tus respuestas siempre incluye un Feedback sobre las expresiones utilizadas por el usuario.`,
      direction: "outgoing",
      sender: "Usuario",
    };
    const newMessages = [initialPromt, ...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);

    if (!promptController) {
      newMessages.shift();
    }

    const apiMessages = newMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "Chatbot") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: apiMessages,
    };

    console.log(apiRequestBody);
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => data.json())
      .then((data) => {
        setMessages([
          ...newMessages,
          { message: data.choices[0].message.content, sender: "Chatbot" },
        ]);
        setPromptController(false);
        setIsTyping(false);
      })
      .catch((error) => console.log(error));
  };

  // console.log(messages);
  const myMessages = [...messages];

  if (messages.length >= 3) {
    myMessages.shift();
  }

  return (
    <div className="writing-section">
      <Header text="My Writing" />
      <div className="writing-content">
        <div className="chatbot-container">
          <img src={require("../../img/Layla.png")} alt="" />
          <MainContainer>
            <ChatContainer>
              <MessageList
                scrollBehavior="smooth"
                typingIndicator={
                  isTyping ? (
                    <TypingIndicator content="Layla is typing" />
                  ) : null
                }
              >
                {myMessages.map((message, i) => {
                  if (message.sender === "Usuario") {
                    return (
                      <Message
                        key={i}
                        model={{
                          message: message.message.slice(62),
                          direction: "outgoing",
                          sender: "Usuario",
                        }}
                      />
                    );
                  }
                  return <Message key={i} model={message} />;
                })}
              </MessageList>
              <MessageInput
                placeholder="Escribe tu mensaje aquí"
                onSend={handleSend}
              />
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    </div>
  );
};
