import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import printJS from 'print-js';

import profilePic from './profile.png';
import es from './locales/es.json';
import en from './locales/en.json';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: linear-gradient(
      270deg,
      rgba(200, 0, 0, 1) 30%,
      rgba(255, 165, 0, 1) 100%
    );
    background-size: 200% 200%;
    animation: Gradient 27s ease infinite;
  }

  @keyframes Gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const Resume = styled.div`
    width: ${props => props.windowWidth < 1070 ? '100%' : '75%'};
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 3.5rem;
    padding-bottom: 3.5rem;
    box-sizing: border-box;
    margin: auto;
    margin-top: auto;
    margin-bottom: 2.5%;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px grey;
    position: relative;
`;

const ProfilePic = styled.img`
    margin-top: -4.5rem;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 0;
    transform: scale(0.5);
    id: profilePic;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const ShareButton = styled.button`
    display: block;
    width: 10rem;
    height: 50px;
    margin-top: 2.5rem;
    margin: 20px auto;
    background-color: #1a8cff;
    color: white;
    border: none;
    border-radius: 7.5px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #014d9f;
    }
`;

const LanguageToggle = styled.button`
    position: absolute;
    top: 20px; // Adjust this value to move the button vertically
    left: 50%; // This will center the button horizontally
    transform: translateX(-50%); // This will ensure the button is truly centered
    background-color: #1a8cff;
    color: white;
    border-style: solid;
    border-color: black;
    border-width: 1.75px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1.2em; // Increase the font size
    padding: 10px 20px; // Increase the padding
    transition: background-color 0.3s ease;
    z-index: ${({ active }) => (active ? 2 : 0)};
    &:hover {
        background-color: #014d9f;
    }
`;


const Contact = styled.ul`
    height: 11rem;
    font-size: 140%;
`;

const Portfolio = styled.p`
    font-size: 140%;
`;

const Underline = styled.span`
    text-decoration: underline;
`;

const Emoji = styled.span`
    font-size: 125%;
    margin-right: 0.5rem;
`;

function App() {
  const [language, setLanguage] = useState('es');
  const content = language === 'es' ? es : en;

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  async function printAsPDF() {
    document.getElementById("profilePic").style.display="none";
    [...document.getElementsByName("emoji")]
      .forEach((el)=> {el.style.display="none"});
    [...document.getElementsByName("button")]
      .forEach((el)=> {el.style.display="none"});
    printJS({
      printable: 'resume',
      type: 'html',
      css: [
        "./index.css"
      ],
      scanStyles: false,
      header: null, 
      targetStyles: ['*'], 
      onLoadingEnd: null, 
      orientation: 'portrait',
      fileName: 'Julio_Cabanillas_CV.pdf',
    });
    document.getElementById("profilePic").style.display="block";
    [...document.getElementsByName("emoji")]
      .forEach((el)=> {el.style.display="flex"});
    [...document.getElementsByName("button")]
      .forEach((el)=> {el.style.display="block"});
    setTimeout(function(){
      window.location.reload();
    }, 1000);
}

  const copyToClipboard = () => {
    const dummy = document.createElement('input');
    const text = window.location.href;
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    alert("URL copied!");
  };

  useEffect(() => {

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    
      const fontSize = Math.max(1, window.innerWidth / 1070) * 18; 
      Array.from(document.getElementsByTagName("li")).forEach(function(li) {
        li.style.fontSize = `${fontSize}px`;
      });
      Array.from(document.getElementsByTagName("p")).forEach(function(p) {
        p.style.fontSize = `${fontSize}px`;
      });
    
      const resumeElement = document.getElementById("resume");
      const profilePicElement = document.getElementById("profilePic");
    
      if (window.innerWidth < 1070) {
        if (resumeElement) {
          resumeElement.style.width = "100%";
        }
        if (profilePicElement) {
          profilePicElement.style.display = "none";
        }
      } else {
        if (resumeElement) {
          resumeElement.style.width = "75%";
        }
        if (profilePicElement) {
          profilePicElement.style.display = "block";
        }
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <GlobalStyle />
      <ButtonsContainer>
        <LanguageToggle onClick={toggleLanguage}>
          {language === 'es' ? 'English' : 'Español'}
        </LanguageToggle>
        <ShareButton name="button" onClick={copyToClipboard}>{content.shareButton}</ShareButton>
        <ShareButton name="button" onClick={printAsPDF}>{content.printPDF}</ShareButton>
    </ButtonsContainer>
      <div style={{position: 'relative', marginTop: '70px'}}> {/* Add this div */}
        <Resume windowWidth={windowWidth} id="resume">
          <div>
            <h1><Underline>{content.title}</Underline></h1>
            <h2>{content.position}</h2>
            <ProfilePic src={profilePic} alt="julio_cabanillas" id="profilePic"/>
          </div>
          <h3><Emoji name="emoji" >🎓</Emoji> <Underline>{content.education.title}</Underline></h3>
          <ul>
            {content.education.items.map((item, index) => <li key={index} dangerouslySetInnerHTML={{ __html: item }} />)}
          </ul>
          <h3><Emoji name="emoji" >💻</Emoji> <Underline>{content.technicalSkills.title}</Underline></h3>
          <ul>
            {content.technicalSkills.items.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
          <h3><Emoji name="emoji" >👨‍💼</Emoji> <Underline>{content.experience.title}</Underline></h3>
          <ul>
            {content.experience.items.map((item, index) => <li key={index} dangerouslySetInnerHTML={{ __html: item }} />)}
          </ul>
          <h3><Emoji name="emoji" >🏆</Emoji> <Underline>{content.achievements.title}</Underline></h3>
          <ul>
            {content.achievements.items.map((item, index) => <li key={index} dangerouslySetInnerHTML={{ __html: item }} />)}
          </ul>
          <h3><Emoji name="emoji" >🌐</Emoji> <Underline>{content.languages.title}</Underline></h3>
          <ul>
            {content.languages.items.map((item, index) => <li key={index} dangerouslySetInnerHTML={{ __html: item }} />)}
          </ul>
          <h3><Emoji name="emoji" >🚗</Emoji> <Underline>{content.additionalSkills.title}</Underline></h3>
          <ul>
            {content.additionalSkills.items.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
          <h3><Emoji name="emoji" >🎯</Emoji> <Underline>{content.objective.title}</Underline></h3>
          <p>{content.objective.items}</p>
          <h3><Emoji name="emoji" >📂</Emoji> <Underline>{content.portfolio.title}</Underline></h3>
          <Portfolio dangerouslySetInnerHTML={{ __html: content.portfolio.items }} />
          <h3><Emoji name="emoji" >📞</Emoji> <Underline>{content.contact.title}</Underline></h3>
          <Contact>
            {content.contact.items.map((item, index) => <li key={index} dangerouslySetInnerHTML={{ __html: item }} />)}
          </Contact>
        </Resume>
      </div>
    </div>
  );
  
}

export default App;
