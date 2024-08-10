CreateThread(function()
    Wait(5000)

    local resourceName = GetCurrentResourceName()
    local currentVersion = GetResourceMetadata(resourceName, 'version', 0)
    local apiUrl = 'https://api.github.com/repos/T3rius/t3_notify/releases/latest'

    PerformHttpRequest(apiUrl, function(errorCode, resultData, resultHeaders)
        if errorCode ~= 200 then
            print(string.format("^1Error checking version: Failed to fetch release information from GitHub. HTTP error code: %d^0", errorCode))
            return
        end

        local jsonData, parseError = json.decode(resultData)
        if not jsonData then

            print(string.format("^1Error checking version: Failed to decode JSON response from GitHub API. Error: %s^0", parseError))
            return
        end
        local latestVersion = jsonData.tag_name

        if latestVersion then
            if currentVersion ~= latestVersion then
                print("===============")
                print("[^8WARNING^0] " .. resourceName .. "^0 is ^1NOT ^0up to date!" )
                print("Current Version: ^8" .. currentVersion .. "^0")
                print("Latest Version: ^4" .. latestVersion.. "^0")
                print("[Update Available]: ^3" .. jsonData.html_url.. "^0")
                print("===============")
            else
                print("===============")
                print("^2" .. resourceName)
                print("Current Version: " .. currentVersion)
                print("Latest Version: " .. latestVersion)
                print("[Up-to-date]^0")
                print("===============")
            end
        else
            print("^1Error: Version information could not be found in the release information from GitHub API.^0")
        end
    end, 'GET', '', {['Accept'] = 'application/json'})
end)