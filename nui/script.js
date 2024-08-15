function addNotification(type, title, message, duration) {
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    
    const icon = document.createElement('div');
    icon.classList.add('icon');
    icon.innerHTML = getIcon(type);
    
    const content = document.createElement('div');
    content.classList.add('content');
    
    const titleElem = document.createElement('div');
    titleElem.classList.add('title');
    titleElem.innerHTML = formatText(title);
    
    const messageElem = document.createElement('div');
    messageElem.classList.add('message');
    messageElem.innerHTML = formatText(message);
    
    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    
    content.appendChild(titleElem);
    content.appendChild(messageElem);
    
    notification.appendChild(icon);
    notification.appendChild(content);
    notification.appendChild(progressBar);
    
    const container = document.getElementById('notifications');
    container.appendChild(notification);

    playAudio();
    
    setTimeout(() => {
        notification.classList.add('show');
        progressBar.style.transitionDuration = `${duration}ms`;
        progressBar.style.width = '0';
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            container.removeChild(notification);
        }, 500);
    }, duration);
}

function getIcon(type) {
    switch (type) {
        case 'inform':
            return '<i class="fas fa-info-circle"></i>'; // Inform icon
        case 'error':
            return '<i class="fas fa-times-circle"></i>'; // Error icon
        case 'success':
            return '<i class="fas fa-circle-check"></i>'; // Success icon
        case 'warning':
            return '<i class="fas fa-exclamation-triangle"></i>'; // Warning icon
        default:
            return '<i class="fas fa-info-circle"></i>'; // Default icon
    }
}

function formatText(msg) {
    let formattedMsg = msg.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formattedMsg = formattedMsg.replace(/\*(.*?)\*/g, '<em>$1</em>');
    return formattedMsg;
}

function playAudio() {
    const audio = new Audio('notify.ogg');
    audio.play();
}

window.addEventListener('message', function(event) {
    const data = event.data;
    if (data.type && data.title && data.message) {
        addNotification(data.type, data.title, data.message, data.duration);
    }
});
