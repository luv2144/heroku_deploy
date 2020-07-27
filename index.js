var PORT = process.env.PORT || 5000;

const API_URL = 'https://rickandmortyapi.com/api/character/';
const rootElement = document.getElementById('root');
const loadingElement = document.getElementById('loading-overlay');
const charactersDetailsMap = new Map();

function callApi(endpoind, method) {
    const url = API_URL + endpoind
    const options = {
      method
    };
  
    return fetch(url, options)
        .then(response => 
            response.ok 
            ? response.json() 
            : Promise.reject(Error('Failed to load'))
        )
        .catch(error => { throw error });
}

class CharacterService {
    async getCharacters() {
      try {
        const endpoint = '';
        const apiResult = await callApi(endpoint, 'GET');
  
        return apiResult;
      } catch (error) {
        throw error;
      }
    }

    async getCharacterInfo(characterID) {
      try {
        const endpoint = characterID;
        const apiResult = await callApi(endpoint, 'GET');
        return apiResult;
      } catch (error) {
        throw error;
      }
    }
  }
  
const characterService = new CharacterService();


class View {
    element;
  
    createElement({ tagName, className = '', attributes = {} }) {
      const element = document.createElement(tagName);
      element.classList.add(className);
      
      Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));
  
      return element;
    }
}


class CharacterView extends View {
    constructor(character, handleClick) {
      super();
  
      this.createCharacter(character, handleClick);
    }
  
    createCharacter(character, handleClick) {
      const { name, image, species, location, created, episode } = character;
      const nameElement = this.createName(name);
      const imageElement = this.createImage(image);
      const speciesElement = this.createSpecies(species);
      const locationElement = this.createLocation(location);
      const createdElement = this.createCreated(created);
      const episodeElement = this.createEpisode(episode);
  
      this.element = this.createElement({ tagName: 'div', className: 'character' + character.id});
      this.element.append(imageElement, nameElement, speciesElement, locationElement, createdElement, episodeElement);
      this.element.addEventListener('click', event => handleClick(event, character), false);
    }
  
    createName(name) {
      const nameElement = this.createElement({ tagName: 'span', className: 'name' });
      nameElement.innerText = name;
  
      return nameElement;
    }
  
    createImage(image) {
      const attributes = { src: image };
      const imgElement = this.createElement({
        tagName: 'img',
        className: 'character-image',
        attributes
      });
  
      return imgElement;
    }

    createSpecies(species) {
      const speciesElement = this.createElement({ tagName: 'span', className: 'species' });
      speciesElement.innerText = "Species: " + species;
  
      return speciesElement;
    }

    createLocation(location) {
      const locationElement = this.createElement({ tagName: 'span', className: 'location' });
      locationElement.innerText = "Location: " + location.name;
  
      return locationElement;
    }

    createCreated(created) {
      const createdElement = this.createElement({ tagName: 'span', className: 'created' });
      createdElement.innerText = "Created: " +created;
  
      return createdElement;
    }

    createEpisode(episode) {
      const episodeElement = this.createElement({ tagName: 'span', className: 'episode' });
      episodeElement.innerText = "Episodes: " + episode.length;
  
      return episodeElement;
    }
    
  }
  
class CharactersView extends View {
    constructor(characters) {
      super();
      
      this.handleClick = this.handleCharacterClick.bind(this);
      this.createCharacters(characters);
    }
  
    charactersDetailsMap = new Map();
  
    createCharacters(characters) {
        const characterElements = characters.results.map(character => {
        const characterView = new CharacterView(character, this.handleClick);
        return characterView.element;
      });
  
      this.element = this.createElement({ tagName: 'div', className: 'characters'});
      this.element.setAttribute("id", "characters_container");
      this.element.append(...characterElements);
    }

    async handleCharacterClick(event, character) {
      var element = document.getElementsByClassName('character' + (character.id));
      element[0].remove();
    }

}

class App {
    constructor() {
      this.startApp();
    }
  
    static rootElement = document.getElementById('root');
    static loadingElement = document.getElementById('loading-overlay');
  
    async startApp() {
      try {
        App.loadingElement.style.visibility = 'visible';
        
        const characters = await characterService.getCharacters();
        const charactersView = new CharactersView(characters);
        const charactersElement = charactersView.element;
        
        App.rootElement.appendChild(charactersElement);

        window.onscroll = function() {
          hideCharacters(), scrollArrow()
        };

      } catch (error) {
        console.warn(error);
        App.rootElement.innerText = 'Failed to load data';
      } finally {
        App.loadingElement.style.visibility = 'hidden';
      }
    }
  }
  
new App();


var appended = false, arrow = document.createElement("div");
arrow.id = "arrowUp";
arrow.innerHTML = '<a href="#top"><img src="images/arrow.png"></a>';
function scrollArrow() {
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 1330) {
      if (!appended) {
        document.body.appendChild(arrow);
        appended = true;
      }
      } else {
      if (appended) {
        document.body.removeChild(arrow);
        appended = false;
      } 
      }
}

function hideCharacters() {
  var list = document.getElementById("characters_container");
  if (document.body.scrollTop > 1330 || document.documentElement.scrollTop > 1330) {
    for(var i = 10; i < list.childElementCount; i++) {
      list.childNodes[i].style.removeProperty('display');
    }
  } else {
    for(var i = 10; i < list.childElementCount; i++) {
      list.childNodes[i].style.display = 'none';
    }
  }
}