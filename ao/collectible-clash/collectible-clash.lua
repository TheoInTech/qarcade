local json = require("json")

BazarProfileRegistry = "SNy4m-DrqxWl01YqGM4sxI8qCni-58re8uuJLvZPypY"
QARCadeCollectibleClashEscrow = "lVpkXuszv7n6fdam30wBnKkNEowdUn8nVqdnjrfXA80"
QARToken = "NG-0lVX882MG5nhARrSzyprEK6ejonHpdUmaaMPsHE8"

-- For testing, use this asset: "WtZ7fCA2kgvwdjbKdthB1uXD1hNPNtv7CaAVn4XWJbk"

-- Supported Collections for Clash
DumdumsCollection = "JAHF1fo4MECRZZFKGcT0B6XM94Lqe-3FtB4Ht_kTEK0"

-- States
AssetList = AssetList or {}

-- TODO: Put this in a SQLite database instead
-- { AssetId = { Owner = "", Name = "" } }
Raffles = Raffles or {}

-- TODO: Put this in a SQLite database instead
-- { AssetId = { Address = "", Tickets = 0 } } for now
Participants = Participants or {}

--[[
    LIST ALL RAFFLES
]]

Handlers.add(
    "List-Raffles",
    { Action = "List-Raffles" },
    function (msg)
        msg.reply(json.encode(Raffles))
    end
)

--[[
    JOIN RAFFLE
]]

--[[
    CREATE RAFFLE
]]

Handlers.add(
    "Get-Atomic-Assets-By-Owner",
    { Action = "Get-Atomic-Assets-By-Owner" },
    function(msg)
        local owner = msg.From

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
            AssetList[owner] = mappedAssets
        else
            print('Sending no profile found to: ' .. owner)
        end
    end
)

Handlers.add(
    "Dryrun-Fetch-Assets",
    { Action = "Dryrun-Fetch-Assets" },
    function(msg)
        print(msg.Tags.Address)
        local fetchedAssets = json.encode(AssetList[msg.Tags.Address])

        if fetchedAssets then
            print('fetchedAssets: ' .. fetchedAssets)
            Handlers.utils.reply(fetchedAssets)(msg)
        else
            print('No assets found')
        end
    end
)

Handlers.add(
    "Create-Raffle",
    { Action = "Create-Raffle" },
    function (msg)
        local raffleData = json.decode(msg.Data) -- Asset, Tickets, Price, EndDate
        print("Creating raffle for: " .. msg.From)
        
        -- Validate required fields
        if not raffleData.Asset or not raffleData.Tickets or not raffleData.Price or not raffleData.EndDate then
            Handlers.utils.reply('Missing required fields')(msg)
            return
        end

        -- Validate asset ownership
        local userAssets = AssetList[msg.From]
        if not userAssets or not table.contains(userAssets, raffleData.Asset) then
            Handlers.utils.reply('You do not own this asset')(msg)
            return
        end

        -- Validate numeric fields
        local tickets = tonumber(raffleData.Tickets)
        if not tickets or tickets <= 0 or tickets ~= math.floor(tickets) then
            Handlers.utils.reply('Invalid ticket count. Must be a positive integer')(msg)
            return
        end

        local price = tonumber(raffleData.Price) 
        if not price or price <= 0 then
            Handlers.utils.reply('Invalid price. Must be a positive number')(msg)
            return
        end

        -- Validate end date is in the future
        local endDate = tonumber(raffleData.EndDate)
        if not endDate or endDate <= os.time() then
            Handlers.utils.reply('End date must be in the future')(msg)
            return
        end

        local createdRaffle = {
            Tickets = tickets,
            Price = price,
            EndDate = endDate,
            Creator = msg.From,
            CreatedAt = msg.Timestamp / 1000,
            TicketsSold = 0,
        }
        Raffles[raffleData.Asset] = createdRaffle
        
        Handlers.utils.reply('Raffle created successfully. Raffle ID: ' .. raffleData.Asset)(msg)
    end
)