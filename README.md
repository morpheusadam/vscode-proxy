# Proxy Toggle

Proxy Toggle is a Visual Studio Code extension that switches the editor's `http.proxy` setting on and off from a status-bar button, for developers who move between a VPN, a SOCKS tunnel, or a corporate proxy and a direct connection.

## Overview

Configure the proxy host, port, and scheme once in Settings, then flip it whenever you need it instead of editing `settings.json` each time.

When enabled, the extension writes `http.proxy` as `scheme://host:port` into global VS Code settings, and optionally sets `http.proxyStrictSSL`. When disabled, it clears `http.proxy` but keeps the last value, so toggling back on restores it. The status-bar item shows the current state as `Proxy: On` or `Proxy: Off`, with the active proxy in the tooltip.

## Features

- Status-bar button that switches the proxy on and off in one click.
- Choice of `socks5`, `http`, or `https` for the proxy URL scheme.
- Builds `scheme://host:port` from the configured host and port.
- Remembers the last proxy, so disabling then re-enabling restores it.
- Optionally sets `http.proxyStrictSSL` when the proxy turns on.
- Status bar shows `Proxy: On` / `Proxy: Off`.
- No dependencies; plain JavaScript against the VS Code API.

## Requirements

- Visual Studio Code 1.85.0 or newer.
- Node.js and npm, only if you want to build or package the extension yourself.

## Installation from source

```bash
git clone https://github.com/morpheusadam/ProxyToggle.git
cd ProxyToggle
npm install -g @vscode/vsce
vsce package        # creates the .vsix
```

In VS Code, open the Extensions view, use the overflow menu, choose "Install from VSIX…", and pick the generated file. Alternatively press F5 from the project to launch an Extension Development Host.

## Configuration

Search for "Proxy Toggle" in Settings, or add these keys to `settings.json`:

```json
{
  "proxyToggle.scheme": "socks5",
  "proxyToggle.host": "127.0.0.1",
  "proxyToggle.port": 10808,
  "proxyToggle.strictSSL": false
}
```

| Setting | Default | Description |
| --- | --- | --- |
| `proxyToggle.scheme` | `socks5` | Proxy scheme used when toggling on: `socks5`, `http`, or `https`. |
| `proxyToggle.host` | `127.0.0.1` | Proxy host or IP address. |
| `proxyToggle.port` | `10808` | Proxy port, 1 to 65535. |
| `proxyToggle.strictSSL` | `false` | Value written to `http.proxyStrictSSL` when enabling. |

## Usage

1. Click the Proxy button in the status bar to turn the proxy on or off.
2. Turning it on sets `http.proxy` to `scheme://host:port` from your settings and applies `http.proxyStrictSSL`.
3. Turning it off clears `http.proxy` and stores the last value for the next toggle.
4. The same action is available as the "Toggle Proxy" command (`proxyToggle.toggle`) in the Command Palette.

If host and port are not set, the extension shows a reminder so you can configure them first.

## Tech stack

| Layer | Technology |
| --- | --- |
| Platform | Visual Studio Code (`^1.85.0`) |
| Language | JavaScript (Node.js, CommonJS) |
| API | VS Code Extension API (`vscode`) |
| Settings written | `http.proxy`, `http.proxyStrictSSL` (global) |

## Project structure

```text
ProxyToggle/
├── extension.js       # activation, status-bar item and toggle logic
├── package.json       # manifest: command and configuration contributions
├── media/icon.svg     # extension icon
└── README.md
```

## Contributing

Open an [issue](https://github.com/morpheusadam/ProxyToggle/issues) or submit a pull request. Useful additions would be workspace-level targeting, no-proxy lists, or a quick-pick for several saved proxies.

## Licence

MIT. See [`LICENSE`](LICENSE) for details.

## Author

Morpheus Adam — web developer, PHP / Laravel / Go.

- GitHub: [morpheusadam](https://github.com/morpheusadam)
- Website: [sam.zeonic.me](https://sam.zeonic.me)
- Email: morpheusadam95@gmail.com
