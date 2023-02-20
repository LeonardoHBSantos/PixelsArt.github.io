// Salvar cores no LocalStorage;

const getColorsPalette = () => {
  const colors = document.getElementsByClassName('color');
  const colorsPalette = {};
  for (let i = 0; i < colors.length; i += 1) {
    colorsPalette[`color${i + 1}`] = colors[i].style.backgroundColor;
  }
  return colorsPalette;
};

const saveColorsInLocalStorage = () => {
  const colorsPalette = getColorsPalette();
  localStorage.setItem('colorPalette', JSON.stringify(colorsPalette));
};

// Salvar grade de pixels no LocalStorage;

const getPixelDesign = () => {
  const pixels = document.getElementsByClassName('pixel');
  const pixelsDesign = {};
  for (let i = 0; i < pixels.length; i += 1) {
    pixelsDesign[`pixel${i + 1}`] = pixels[i].style.backgroundColor;
  }
  return pixelsDesign;
};

const savePixelsInLocalStorage = () => {
  const pixelsDesign = getPixelDesign();
  localStorage.setItem('pixelBoard', JSON.stringify(pixelsDesign));
};

// Salvar número de cores na paleta no LocalStorage;

const saveColorsNumberInLocalStorage = (numberColors) => {
  localStorage.setItem('colorsNumber', JSON.stringify(numberColors));
};

const restoreNumberColors = () => {
  if (JSON.parse(localStorage.getItem('colorsNumber')) === null || '') {
    createNumberColors(9);
  } else {
  const getNumberColors = JSON.parse(localStorage.getItem('colorsNumber'));
  changeNumberColors(getNumberColors);
  }
};

//Função cria numero variado de cores na paleta

const createNumberColors = (number) => {
const sectionColorPallete = document.getElementById('color-palette');
  for (let i = 1; i <= number; i += 1) {
    const divColorPallete = document.createElement('div');
    divColorPallete.className = 'color';
    sectionColorPallete.appendChild(divColorPallete);
  }
}

// Função que verifica a quantidade de cores inserida pelo usuário;

const verifyInputColors = (input) => {
  let newInput;
  if (input === '') {
    alert('Quantidade de cores inválida!');
    newInput = 8;
  } else if (parseInt(input, 10) < 3) {
    newInput = 3;
  } else if (parseInt(input, 10) > 12) {
    newInput = 12;
  } else {
    newInput = input;
  }
  return newInput;
};

// Botão que muda a quantidade de cores da paleta

const changeNumberColors = (number) => {
  if (typeof number == 'undefined') {
    const numberColorsValue = document.getElementById('qtd-colors').value;
    const numberColors = verifyInputColors(numberColorsValue);
    const removeColors = document.getElementById('color-palette').innerHTML = '';;
    createNumberColors(numberColors);
    changeColors();
    saveColorsNumberInLocalStorage(numberColors);
  } else {
    const removeColors = document.getElementById('color-palette').innerHTML = '';;
    createNumberColors(number);
  }
};



const buttonNumberColors = document.getElementById('button-qtd-colors');
buttonNumberColors.addEventListener('click', () => {
  event.preventDefault();
  changeNumberColors();
});

// Função cria cores Aleatórias (Código feito em referencia com este link : https://wallacemaxters.com.br/blog/48/como-gerar-cores-aleatorias-no-javascript);

const createColors = () => {
  const red = parseInt(Math.random() * 255, 10);
  const green = parseInt(Math.random() * 255, 10);
  const blue = parseInt(Math.random() * 255, 10);
  return `rgb(${red}, ${green}, ${blue}`;
};

// Mudar cor da paleta de cores, mantendo o preto como cor primária e salva no LocalStorage;

const changeColors = () => {
  const colors = document.getElementsByClassName('color');
  colors[0].style.backgroundColor = 'black';
  colors[colors.length - 1].style.backgroundColor = 'white';
  for (let i = 1; i < colors.length - 1; i += 1) {
    colors[i].style.backgroundColor = createColors();
  }
  saveColorsInLocalStorage();
};

// Botão que gera cores aleatórias;

const buttonChangeColors = document.getElementById('button-random-color');
buttonChangeColors.addEventListener('click', changeColors);

// Retorna cores ao iniciar

const restoreColorsPalette = () => {
  const getColors = JSON.parse(localStorage.getItem('colorPalette'));
  const colors = document.getElementsByClassName('color');
  for (let i = 0; i < colors.length; i += 1) {
    colors[i].style.backgroundColor = getColors[`color${i + 1}`];
  }
};

// Procura cores no LocalStorage; se sim , ele restaura,; se não, ele cria cores novas;

const initColors = () => {
  const restoredColors = JSON.parse(localStorage.getItem('colorPalette'));
  if (localStorage.length < 1 || restoredColors === '') {
    changeColors();
  } else {
    restoreColorsPalette();
  }
};

// Exclui pixels existentes;

const deletePixels = () => {
  const existedPixels = document.getElementsByClassName('pixel');
  for (let i = existedPixels.length - 1; i >= 0; i -= 1) {
    existedPixels[i].remove();
  }
};

// Criar quadrados de pixel;

const createPixelBoard = (size) => {
  deletePixels();
  const pixelBoard = document.getElementById('pixel-board');
  for (let i = 0; i < size; i += 1) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    pixelBoard.appendChild(pixel);
  }
};

// Coloca a classe selected no elemento selecionado;

const setClass = (object) => {
  const element = object;
  if (element.className === 'color') {
    const erase = document.getElementsByClassName('selected');
    for (let i = 0; i < erase.length; i += 1) {
      erase[i].className = 'color';
    }
    element.classList.add('selected');
  }
};

// Adiciona o EventListener a paleta de cores (Código refeito baseado no projeto : https://www.linkedin.com/pulse/projeto-pixels-art-renan-oliveira/?originalSubdomain=pt);

const colors = document.getElementById('color-palette');
colors.addEventListener('click', (event) => {
  setClass(event.target);
});

// Função responsavel por pintar os pixels selecionados;

const coloringPixel = (object) => {
  const element = object;
  const color = document.getElementsByClassName('selected')[0].style.backgroundColor;
  element.style.backgroundColor = color;
  savePixelsInLocalStorage();
};

// Adiciona o EventListener aos pixels para serem pintados (Código refeito baseado no projeto : https://www.linkedin.com/pulse/projeto-pixels-art-renan-oliveira/?originalSubdomain=pt);

const pixelBoard = document.getElementById('pixel-board');
pixelBoard.addEventListener('click', (event) => {
  if (event.target.className === 'pixel') {
  coloringPixel(event.target);
  }
});

// Função que define a cor de todos os pixels como branca e salva no local storage se caso apagar o desenho antes de fechar a página;

const clearBoard = () => {
  const resetColors = document.getElementsByClassName('pixel');
  for (let i = 0; i < resetColors.length; i += 1) {
    resetColors[i].style.backgroundColor = 'white';
  }
  savePixelsInLocalStorage();
};

// Botão que redefine a grade de pixels;

const buttonResetPixels = document.getElementById('clear-board');
buttonResetPixels.addEventListener('click', clearBoard);

// Função que retorna o desenho ao recarregar a pagina, ou fechar e abrir novamente;

const restorePixelsDesign = () => {
  const restoredPixelsDesign = JSON.parse(localStorage.getItem('pixelBoard'));
  if (restoredPixelsDesign === null) {
    clearBoard();
  } else {
    const pixels = document.getElementsByClassName('pixel');
    for (let i = 0; i < pixels.length; i += 1) {
      pixels[i].style.backgroundColor = restoredPixelsDesign[`pixel${i + 1}`];
    }
  }
};

// Função que muda o tamanho do pixel board;

const pixelBoardWidth = (size) => {
  if (document.querySelector('#pixel-board').clientWidth <= 720) {
    pixelBoard.style.gridTemplateColumns = 'repeat(' + size + ', 3vh)';
  } else {
  pixelBoard.style.gridTemplateColumns = 'repeat(' + size + ', 40px)';
  }
};

// Função que verifica a quantidade de pixels inserida pelo usuário;

const verifyInput = (input) => {
  let newInput;
  if (input === '') {
    alert('Board inválido!');
    newInput = 5;
  } else if (parseInt(input, 10) < 5) {
    newInput = 5;
  } else if (parseInt(input, 10) > 25) {
    newInput = 25;
  } else if (parseInt(input, 10) > 15 && document.querySelector('#pixel-board').clientWidth <= 720) {
    newInput = 15;
  }
   else {
    newInput = input;
  }
  return newInput;
};

// Salva numero de pixels no localstorage;

const savePixelsNumberInLocalStorage = (inputValue) => {
  localStorage.setItem('boardSize', JSON.stringify(inputValue));
};

// Imput e botão que altera o tamanho do pixel board, salva as informações da quantidade no LocalStorage;

const buttonPixelsSize = document.getElementById('generate-board');
buttonPixelsSize.addEventListener('click', (event) => {
  event.preventDefault(); // Não deixa a página recarregar ao clicar no botão(submeter);
  const input = document.getElementById('board-size').value;
  const inputValue = verifyInput(input);
  createPixelBoard(inputValue * inputValue);
  pixelBoardWidth(inputValue);
  savePixelsNumberInLocalStorage(inputValue);
});

// Retorna numero de pixels ao carregar a página, se não tiver, cria um pixel board de 25 pixels(5x5);

const restorePixelsNumber = () => {
  const restoredPixelsNumber = JSON.parse(localStorage.getItem('boardSize'));
  if (restoredPixelsNumber === null) {
    createPixelBoard(25);
  } else {
    createPixelBoard(restoredPixelsNumber * restoredPixelsNumber);
    pixelBoardWidth(restoredPixelsNumber);
  }
};

// Define as funções que serão executadas ao carregar a página

window.onload = () => {
  restoreNumberColors();
  initColors();
  restorePixelsNumber();
  restorePixelsDesign();
  setClass(document.getElementsByClassName('color')[0]);
}
