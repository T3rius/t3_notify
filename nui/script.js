function addNotification(type, title, message, duration) {
    type = type || 'inform';
    duration = duration || 5000;
    title = title || '';
    message = message || '';

    const notification = document.createElement('div');
    notification.classList.add('notification', type);

    const icon = document.createElement('div');
    icon.classList.add('icon');
    icon.innerHTML = getIcon(type);

    const content = document.createElement('div');
    content.classList.add('content');

    if (title.trim() !== '') {
        const titleElem = document.createElement('div');
        titleElem.classList.add('title');
        titleElem.innerHTML = formatText(title);
        content.appendChild(titleElem);
    }

    if (message.trim() !== '') {
        const messageElem = document.createElement('div');
        messageElem.classList.add('message');
        messageElem.innerHTML = formatText(message);
        content.appendChild(messageElem);
    }

    if (content.children.length === 0) {
        console.warn('Notification not created: headline and message missing.');
        return;
    }

    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');

    notification.appendChild(icon);
    notification.appendChild(content);
    notification.appendChild(progressBar);

    const container = document.getElementById('notifications');
    container.appendChild(notification);

    playAudio();

    setTimeout(() => {
        notification.classList.add('show');
        progressBar.style.transition = `width ${duration}ms linear`;
        progressBar.style.width = '0%';
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, duration + 100);
}

function getIcon(type) {
    switch (type) {
        case 'inform':
            return '<i class="fas fa-info-circle"></i>'; // Inform icon
        case 'error':
            return '<i class="fas fa-times-circle"></i>'; // Error icon
        case 'success':
            return '<i class="fas fa-check-circle"></i>'; // Success icon
        case 'warning':
            return '<i class="fas fa-exclamation-triangle"></i>'; // Warning icon
        default:
            return '<i class="fas fa-info-circle"></i>'; // Default icon
    }
}

function formatText(text) {
    if (!text) return '';
    let formattedText = text;
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
    return formattedText;
}

function playAudio() {
    const audio = new Audio('notify.ogg');
    audio.play();
}

window.addEventListener('message', function(event) {
    const { type, title, message, duration } = event.data;
    addNotification(type, title, message, duration);
});
