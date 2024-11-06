local json = require('json')

QARCadeCollectibleClash = "X_il8UGE49JBP3rFBb5L8B_EtuayUiAN8ZvIVSF4jz8"

-- States
Depositors = Depositors or {} -- { AssetId = { Address = "", Quantity = 0 } }

--[[
    Asset Deposit upon transferring the asset to escrow before creating a raffle
]]
Handlers.add(
    "Credit-Notice",
    { Action = "Credit-Notice" },
    function(msg)
        print(msg)
        local data = json.decode(msg.Data)

        -- Save the deposit to the depositors table
        Depositors[msg.From] = { Address = data.Sender, Quantity = tonumber(data.Quantity) }
    end
)

--[[
    Asset Transfer from the escrow to either the winner or owner
]]
Handlers.add(
    "Transfer-Asset",
    { Action = "Transfer-Asset" },
    function(msg)
        -- Only QARCadeCollectibleClash process can send a Transfer
        if string.lower(msg.From) ~= string.lower(QARCadeCollectibleClash) then
            ao.send({ Target = msg.From, Action = 'Validation-Error', Tags = { Status = 'Error', Message = 'Transfers are not allowed from ' .. msg.From } })
            return
        end

        local data = json.decode(msg.Data)
        ao.send({
            Target = data.Asset,
            Action = "Transfer",
            Data = json.encode({ Recipient = data.Recipient, Quantity = data.Quantity })
        })
    end
)

--[[
    Asset Debit from the depositors table
]]
Handlers.add(
    "Debit-Notice",
    { Action = "Debit-Notice" },
    function(msg)
        local data = json.decode(msg.Data)

        local asset = msg.From
        Depositors[msg.From] = { Address = data.Recipient, Quantity = data.Quantity }

        ao.send({
            Target = QARCadeCollectibleClash,
            Action = "End-Raffle",
            Data = json.encode({ Asset = asset })
        })
    end
)