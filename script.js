document.addEventListener('DOMContentLoaded', function() {
  const btnNao = document.getElementById('nao');
  const btnSim = document.getElementById('sim');
  const formulario = document.getElementById('formulario');
  const agradecimento = document.getElementById('agradecimento');
  const dateForm = document.getElementById('date-form');
  const buttonsContainer = document.getElementById('buttons-container');

  // Função para mover o botão "Não"
  function moveButton() {
  const containerRect = buttonsContainer.getBoundingClientRect();
  const buttonRect = btnNao.getBoundingClientRect();

  // Limites para não sair do container
  const maxX = containerRect.width - buttonRect.width;
  const maxY = containerRect.height - buttonRect.height;

  // Gera posições aleatórias dentro do container
  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  btnNao.style.left = randomX + 'px';
  btnNao.style.top = randomY + 'px';
  }

  // Detecta se é touch (celular/tablet)
  const isTouchDevice = () => {
  return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
  };

  // No desktop: mover ao passar mouse OU clicar
  // No celular: mover ao tocar/clicar
  if (isTouchDevice()) {
  btnNao.addEventListener('click', function(e) {
  e.preventDefault();
  moveButton();
  });
  } else {
  btnNao.addEventListener('mouseover', moveButton);
  btnNao.addEventListener('click', function(e) {
  e.preventDefault();
  moveButton();
  });
  }

  // Evento para o botão "Sim"
  btnSim.addEventListener('click', function() {
  buttonsContainer.style.display = 'none';
  formulario.style.display = 'block';
  });

  // Evento para o envio do formulário
  dateForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Coleta as opções selecionadas
  const opcoesSelecionadas = [];
  document.querySelectorAll('input[name="opcao"]:checked').forEach(function(checkbox) {
  opcoesSelecionadas.push(checkbox.value);
  });

  // Prepara os dados para enviar ao Google Forms
  const formData = new FormData();
  opcoesSelecionadas.forEach(opcao => {
  formData.append('entry.143364421', opcao);
  });

  // Envia os dados para o Google Forms
  fetch('https://docs.google.com/forms/d/e/1FAIpQLSdE-z4sHF_kJuvIRxbUcf1Evr7Dzy85Sn2-agyDjXHgBP6lqg/formResponse', {
  method: 'POST',
  body: formData,
  mode: 'no-cors' // WARNING: This is problematic!
  })
  .then(response => {
  // Even with no-cors, you can't reliably check the response.
  console.log("Form submission attempted.");
  })
  .catch(error => {
  console.error("Form submission error:", error);
  // Display an error message to the user (you'll need an element in your HTML for this)
  });

  // Mostra a mensagem de agradecimento
  formulario.style.display = 'none';
  agradecimento.style.display = 'block';
  });
 });