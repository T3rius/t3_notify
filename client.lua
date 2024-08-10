function notify(title, message, duration, type)
    duration = duration or 5000
    type = type or 'inform'

    SendNUIMessage({
        title = title,
        message = message,
        duration = duration,
        type = type,
    })
end

RegisterNetEvent('t3:notify')
AddEventHandler('t3:notify', function(title, message, duration, type)
	notify(title, message, duration, type)
end)
--[[
RegisterCommand('success', function()
	exports.t3_notify:notify('SUCCESS', 'this is success notify', 5000, 'success')
end)

RegisterCommand('info', function()
    exports.t3_notify:notify('INFO', 'this is inform notify', 5000, 'inform')
end)

RegisterCommand('error', function()
	exports.t3_notify:notify('ERROR', 'this is error notify', 5000, 'error')
end)

RegisterCommand('warning', function()
	exports.t3_notify:notify('WARNING', 'this is warning notify', 5000, 'warning')
end)

RegisterCommand('testallnotify', function()
    exports.t3_notify:notify('INFO', 'this is inform notify', 15000, 'inform')
    exports.t3_notify:notify('SUCCESS', 'this is success notify', 5000, 'success')
    exports.t3_notify:notify('ERROR', 'this is error notify', 10000, 'error')
    exports.t3_notify:notify('WARNING', 'this is warning notify', 5000, 'warning')
    exports.t3_notify:notify('long text', 'While it may not be obvious to everyone, there are a number of reasons creating random paragraphs can be useful. A few examples of how some people use this generator are listed in the following paragraphs.', 5000, 'inform')
end, false)
]]