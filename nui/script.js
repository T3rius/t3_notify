function addNotification(type, title, message, duration, position) {
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

    const container = getOrCreateContainer(position);
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
            if (container.children.length === 0) {
                container.remove();
            }
        }, 500);
    }, duration + 100);
}

function getOrCreateContainer(position) {
    let container = document.getElementById(`notifications-${position}`);
    if (!container) {
        container = document.createElement('div');
        container.id = `notifications-${position}`;
        container.classList.add('notifications-container', position);
        document.body.appendChild(container);
    }
    return container;
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
    const { type, title, message, duration, position } = event.data;

    addNotification(type || 'inform', title || '', message || '', duration || 5000, position || 'top-right');
});

const css = document.createElement('style');
css.type = 'text/css';
css.innerHTML = `
    .notifications-container {
        position: fixed;
        z-index: 9999;
        max-width: 350px;
        font-family: 'Roboto', Arial, sans-serif;
    }
    .notifications-container.top-right { top: 20px; right: 20px; }
    .notifications-container.top-left { top: 20px; left: 20px; }
    .notifications-container.top { top: 20px; left: 50%; transform: translateX(-50%); }
    .notifications-container.bottom-right { bottom: 20px; right: 20px; }
    .notifications-container.bottom-left { bottom: 20px; left: 20px; }
    .notifications-container.bottom { bottom: 20px; left: 50%; transform: translateX(-50%); }
    .notifications-container.center-right { top: 50%; right: 20px; transform: translateY(-50%); }
    .notifications-container.center-left { top: 50%; left: 20px; transform: translateY(-50%); }
`;
document.head.appendChild(css);
