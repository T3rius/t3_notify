fx_version 'cerulean'
game 'gta5'

author 'T3 Scripts'
description 'T3 notify'
version '1.0.0'

ui_page 'nui/index.html'

files {
    'nui/index.html',
    'nui/style.css',
    'nui/script.js',
    'nui/notify.ogg',
}

client_script 'client.lua'

server_script 'version.lua'

export 'notify'
