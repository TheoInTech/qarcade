local json = require("json")

BazarProfileRegistry = "SNy4m-DrqxWl01YqGM4sxI8qCni-58re8uuJLvZPypY"

-- Supported Collections for Clash
DumdumsCollection = "JAHF1fo4MECRZZFKGcT0B6XM94Lqe-3FtB4Ht_kTEK0"

Handlers.add(
    "Get-Atomic-Assets-By-Owner",
    { Action = "Get-Atomic-Assets-By-Owner" },
    function(msg)
        local owner = msg.Data.Address

        ao.send({
            Target = BazarProfileRegistry,
            Action = "Get-Profiles-By-Delegate",
            Data = json.encode({ Address = owner })
        })
    end
)

Handlers.add(
    "Profile-Success",
    { Action = "Profile-Success" },
    function(msg)
        local profileLookup = json.decode(msg.Data)
        local activeProfile = profileLookup[1]
        if activeProfile and activeProfile.ProfileId then
            print("Sending Info to ProfileId: " .. activeProfile.ProfileId)
            ao.send({
                Target = activeProfile.ProfileId,
                Action = "Info"
            })
        else
            print("Sending No Profile to activeProfile.CallerAddress: " .. activeProfile.CallerAddress)
            ao.send({
                Target = activeProfile.CallerAddress,
                Data = "No profile found"
            })
        end
    end
)

Handlers.add(
    "Read-Success",
    { Action = "Read-Success" },
    function(msg)
        local fetchedProfile = json.decode(msg.Data)

        if fetchedProfile then
            local owner =  fetchedProfile.Owner
            local mappedAssets = {}
            for _, asset in ipairs(fetchedProfile.Assets) do
                table.insert(mappedAssets, asset.Id)
            end
            print('Sending assets to: ' .. owner)
            ao.send({
                Target = owner,
                Data = json.encode(mappedAssets)
            })
        else
            print('Sending no profile found to: ' .. owner)
            ao.send({
                Target = owner,
                Data = 'No profile found'
            })
        end
    end
)