const openModalBtn = document.getElementById('openModalBtn');
const registerNewUser = document.getElementById('registerNewUser');
const modal = document.getElementById('modal');
const closeModalBtn = document.querySelector('.close');

openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

registerNewUser.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// // Adicione a lógica de envio do formulário conforme necessário
// const form = document.getElementById('userUpdateForm');

// form.addEventListener('submit', (event) => {
//     event.preventDefault(); // Evita o envio padrão do formulário

//    fetch('/submit', { method: 'POST', body: new FormData(form) })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Resposta do servidor:', data);
//     })
//     .catch(error => {
//         console.zerror('Erro ao enviar dados:', error);
//     });
// });

document.getElementById('successMessage').style.display = 'block';

setTimeout(function() {
    document.getElementById('modal').style.display = 'none';
}, 3000);
