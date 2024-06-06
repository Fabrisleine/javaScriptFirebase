// Configure o Firebase com suas credenciais
const firebaseConfig = {
    apiKey: "AIzaSyBayWGkDN3CpFtBoup3EKkgDAyFI5tJ-KE",
    authDomain: "fabris2dsn.firebaseapp.com",
    projectId: "fabris2dsn",
    storageBucket: "fabris2dsn.appspot.com",
    messagingSenderId: "510562769061",
    appId: "1:510562769061:web:624bda5ef689e07aa6154c"
  };
  firebase.initializeApp(firebaseConfig);

  // Obtém uma referência para o banco de dados Firebase
  const database = firebase.database();

  function enviarDadosParaFirebase() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('phone').value;
    const imagem = document.getElementById('imagem').files[0]; // Obtém o arquivo de imagem

     // Cria um objeto com os dados
     const dados = {
        nome: nome,
        email: email,
        telefone: telefone,
        imagem: imagem.name // Salva o nome do arquivo de imagem
    };
 // Insere os dados no Firebase
 database.ref('alunos').push(dados)
 .then(() => {
     alert('Dados enviados com sucesso!');
     // Limpa os campos após o envio
     document.getElementById('nome').value = '';
     document.getElementById('email').value = '';
     document.getElementById('phone').value = '';
     document.getElementById('imagem').value = '';
 })
 .catch((error) => {
     console.error('Erro ao enviar os dados: ', error);
 });
}