var mediaStream;

function abrirCamera() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function (stream) {
            mediaStream = stream;
            const areaVideo = document.getElementById('camera');
            areaVideo.srcObject = stream;
            areaVideo.style.display = 'block'; // Mostra a área de vídeo
        })
        .catch(function (error) {
            console.error('Erro ao acessar a câmera:', error);
        });
}

function tirarFoto() {
    const areaVideo = document.getElementById('camera');
    const canvas = document.createElement('canvas');
    canvas.width = areaVideo.videoWidth;
    canvas.height = areaVideo.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(areaVideo, 0, 0, canvas.width, canvas.height);

    // Converta o conteúdo do canvas para um URL de dados
    const imageDataURL = canvas.toDataURL();

    const fotoPreview = document.getElementById('foto-preview');
    fotoPreview.src = imageDataURL;
    fotoPreview.style.display = 'block'; // Mostra a prévia da foto
}

function postarComentario() {
    const comentarioText = document.getElementById('comentario-text').value;
    const fotoPreview = document.getElementById('foto-preview');
    const comentariosContainer = document.getElementById('comentarios-container');

    // Crie um elemento de comentário
    const novoComentario = document.createElement('div');
    novoComentario.innerHTML = `
                <p>${comentarioText}</p>
                <img src="${fotoPreview.src}" alt="Foto do Comentário">
                <button onclick="apagarComentario(this)">Apagar</button>
            `;

    // Adicione o novo comentário ao container
    comentariosContainer.appendChild(novoComentario);

    // Limpe o formulário e a prévia da foto
    document.getElementById('comentario-text').value = '';
    document.getElementById('foto-preview').style.display = 'none';
    document.getElementById('foto-preview').src = '';

    // Feche a câmera
    fechar();
}

function apagarComentario(botao) {
    // Remova o comentário do DOM
    const comentario = botao.parentNode;
    comentario.parentNode.removeChild(comentario);
}

function fechar() {
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
    }

    const areaVideo = document.getElementById('camera');
    areaVideo.srcObject = null;
    mediaStream = null;

    // Oculta a área de vídeo e a prévia da foto
    areaVideo.style.display = 'none';
    document.getElementById('foto-preview').style.display = 'none';
}