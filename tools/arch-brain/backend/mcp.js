/* global process */
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import http from "http";
import fs from "fs";
import path from "path";

/**
 * SENTINEL NATIVE MCP BRIDGE (Lightweight, No Port Conflict)
 */

const PORT = 5050; // The Hub Port
const projectRoot = process.env.PROJECT_ROOT || process.cwd();

const server = new Server(
    { name: "arch-brain", version: "4.0.0" },
    { capabilities: { tools: {} } }
);

// Forwarding helper to the main Hub (server.js)
const forwardToHub = (apiPath, body) => {
    return new Promise((resolve) => {
        const data = JSON.stringify(body);
        const req = http.request({
            hostname: '127.0.0.1',
            port: PORT,
            path: apiPath,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        }, (res) => {
            let respData = '';
            res.on('data', (chunk) => respData += chunk);
            res.on('end', () => resolve(respData));
        });
        req.on('error', () => resolve(JSON.stringify({ error: "Hub Unreachable" })));
        req.write(data);
        req.end();
    });
};

server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
        { 
            name: "analyze_project", 
            description: "Deep architectural scan of the codebase.",
            inputSchema: { type: "object", properties: {} }
        },
        {
            name: "write_to_sentinel_log",
            description: "Display a message in the Sentinel UI logs.",
            inputSchema: {
                type: "object",
                properties: { message: { type: "string" } },
                required: ["message"]
            }
        },
        {
            name: "trigger_ui_action",
            description: "Trigger a UI event (like SCAN).",
            inputSchema: {
                type: "object",
                properties: { action: { type: "string" } },
                required: ["action"]
            }
        }
    ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    if (name === "write_to_sentinel_log") {
        await forwardToHub('/api/log', { message: args.message });
        return { content: [{ type: "text", text: `Log sent to Hub: ${args.message}` }] };
    }

    if (name === "trigger_ui_action") {
        await forwardToHub('/api/command', { action: args.action });
        return { content: [{ type: "text", text: `Action ${args.action} triggered via Hub.` }] };
    }

    if (name === "analyze_project") {
        // For analysis, we can call the hub's API directly to get the latest synthesized data
        const data = await forwardToHub('/api/scan-internal', {});
        return { content: [{ type: "text", text: data }] };
    }

    throw new Error("Tool not found");
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("SENTINEL NATIVE BRIDGE: Connected.");
