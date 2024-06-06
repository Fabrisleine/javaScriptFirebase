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
  const storage = firebase.storage(); // INICIALIZE O STORAGE 

  // Função para enviar dados para o Firebase
  function enviarDadosParaFirebase() {
      const nomeAluno = document.getElementById('nome').value;
      const turma = document.getElementById('turma').value;
      const curso = document.getElementById('curso').value;
      const imagem = document.getElementById('imagem').files[0]; // Obtém o arquivo de imagem

      // IMAGEM

      if (imagem) {
        const storageRef = storage.ref('imagem/' + imagem.name);
        storageRef.put(imagem).then(snapshot => {
            snapshot.ref.getDownloadURL().then(downloadURL => {
                const dados = {
                    nomeAluno: nomeAluno,
                    turma: turma,
                    curso: curso,
                    imagemURL: downloadURL // Salva o URL da imagem 
                };
                database.ref('alunos').push(dados)
                .then(() => {
                    alert('Dados enviados com sucesso!');
                    // Limpa os campos após o envio
                    document.getElementById('nome').value = '';
                    document.getElementById('turma').value = '';
                    document.getElementById('curso').value = '';
                    document.getElementById('imagem').value = '';
                })

                .catch((error) => {
                    console.error('Erro ao enviar os dados: ', error);
                }).catch(error =>{
                    console.error('Erro ao fazer upload da imagem:',error);
                });
            }

            )
        })
      } else {
        alert('Por favor, selecione uma imagem.');
      }

         
  }

  // CONSULTA DE DADOS DOS ALUNOS 
  function consultarAlunoPorNome(){
    const nome = document.getElementById('nomeConsulta').value.trim().toLowerCase(); // CONVERTER PARA MINUSCULAS PARA BUSCA CASE INSENSITIVE
    const alunosRef = database.ref('alunos');
    alunosRef.orderByChild('nomeAluno').equalTo(nome).once('value',snapshot =>{
        const data = snapshot.val();
        const lista = document.getElementById('listaAlunos');
        lista.innerHTML = ''; // LIMPAR LISTA ANTERIOR
        if (data) {
            Object.keys(data).forEach(key =>{
                const aluno = data[key];
                const item = document.createElement('li');
                item.innerHTML = `Nome:${aluno.nomeAluno},Turma:${aluno.turma},Curso:${aluno.curso}, Imagem: <img src="${aluno.imagemURL}" alt="Imagem do Aluno"
                style="width:100px;height:auto;">`;
                lista.appendChild(item);
            });
        } else {
            lista.innerHTML = '<li> Nenhum aluno encontrado com esse nome.</li>';
        }
    }).catch(error => {
        console.error('Erro ao buscar alunos:',error);
    });
  }