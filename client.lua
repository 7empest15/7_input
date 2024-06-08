

function OpenKeyboardInput(title, defaultText, maxInputLength, isPassword)
    SendNUIMessage({
        type = "show",
        title = title,
        value = defaultText,
        maxInputLength = maxInputLength,
        isPassword = isPassword
    })

    SetNuiFocus(true, true)

    local value = nil
    local hasValue = false

    RegisterNUICallback("submit", function(data, cb)
        CloseKeyboardInput()
        value = data.value
        hasValue = true
    end)

    RegisterNUICallback("cancel", function(data, cb)
        hasValue = true
        CloseKeyboardInput()
    end)

    Wait(50)

    while not hasValue do
        Wait(0)
    end

    return value
end

function CloseKeyboardInput()
    SetNuiFocus(false, false)
    SendNUIMessage({
        type = "hide"
    })
end


exports('OpenKeyboardInput', OpenKeyboardInput)