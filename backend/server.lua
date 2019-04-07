local websocket = require("websocket")
local socket = require("socket")
local cjson = require("cjson")

local danmaku = {}

local ws
local hold = {}
local link = {}

function logprint(...)
	io.write(os.date(), " | ")
	print(...)
end

function register(s) 
	hold[s:socket()] = s
	table.insert(link, s:socket())
end

function unregister(s)
	for i = 1, #link do
		if hold[link[i]] == s then
			table.remove(link, i)
			break
		end
	end
	for k, v in pairs(hold) do
		if v == s then
			hold[k] = nil
			break
		end
	end
end

function load()
	local f = io.open("database", "r")
	danmaku = cjson.decode(f:read("*a")) or {}
	f:close()
end

function save()
	local f = io.open("database", "w")
	f:write(cjson.encode(danmaku))
	f:close()
end

function send(ws, tp, data)
	ws:send(cjson.encode({type = tp, data = data}) .. "\n")
end

function broadcast(tp, data)
	for _, s in pairs(hold) do
		if s ~= ws then
			send(s, tp, data)
		end
	end
end

function filter(str)
	return str
end

hook = {
	request_all = function(ws, msg)
		send(ws, "danmaku", cjson.encode(danmaku))
	end,
	new_comment = function(ws, msg)
		msg.user = msg.user or "Anonymous"
		if type(msg.comment) ~= "string" then
			return send(ws, "error", "invaild comment")
		end
		if type(msg.time) ~= "number" then
			return send(ws, "error", "invaild time")
		end
		local t = {time = msg.time, comment = filter(msg.comment), user = msg.user}
		table.insert(danmaku, t)
		save()
		broadcast("danmaku", {t})
	end
}

function process(ws, msg) 
	local s, r = pcall(cjson.decode, msg)
	if not s then
		return send(ws, "error", "broken json")
	end
	if not r.method then
		return send(ws, "error", "missing method")
	end
	if not hook[r.method] then
		return send(ws, "error", "unknown method")
	end
	return hook[r.method](ws, r)
end

function main()
	logprint("Link start.")

	ws = websocket.bind("localhost", "8080")
	hold = {}
	link = {}

	logprint("register: server client (" .. ws:socket() .. ")")

	register(ws)

	load()

	while true do
		local t = ws:select(link, nil, 5)
		if type(t) == "number" then
			t = {t}
		end
		if type(t) == "table" then
			for _, k in pairs(t) do 
				k = math.floor(k)
				print("select: " .. (k or "..."))
				local r = hold[k]
				if r == ws then
					local ns = r:accept()
					logprint("accept: " .. ns:socket())
					logprint("handshake: " .. ns:socket())
					ns:handshake("")
					register(ns)
				else
					logprint("request from: " .. k)
					print(r)
					socket.sleep(1)
					local res = r:recv()
					if not res then 
						logprint("disconnected: " .. tostring(r))
						unregister(r)
					else 
						logprint("received: ", tostring(res))
						if res == "$exit$" then
							break
						else
							process(r, res)
						end
					end
				end
			end
		end
	end

	ws:close()

	logprint("Server terminated.")
end

main()
