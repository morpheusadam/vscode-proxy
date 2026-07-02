<div align="center">

# 🔌 Proxy Toggle for VS Code

### One-click VS Code proxy switch — turn `http.proxy` on or off straight from the status bar, with your host, port and scheme saved in Settings.

<p>
  <img src="https://img.shields.io/github/license/morpheusadam/vscode-proxy?style=for-the-badge&color=4c1" alt="License" />
  <img src="https://img.shields.io/github/stars/morpheusadam/vscode-proxy?style=for-the-badge&color=ffca28" alt="Stars" />
  <img src="https://img.shields.io/github/forks/morpheusadam/vscode-proxy?style=for-the-badge&color=42a5f5" alt="Forks" />
  <img src="https://img.shields.io/github/last-commit/morpheusadam/vscode-proxy?style=for-the-badge&color=8e44ad" alt="Last commit" />
  <img src="https://img.shields.io/github/repo-size/morpheusadam/vscode-proxy?style=for-the-badge&color=e67e22" alt="Repo size" />
</p>

<p>
  <img src="https://img.shields.io/badge/VS%20Code-%5E1.85-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white" alt="VS Code" />
  <img src="https://img.shields.io/badge/JavaScript-Extension-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Node.js-Runtime-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Proxy-SOCKS5%20%7C%20HTTP%20%7C%20HTTPS-FF6C2C?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Proxy schemes" />
</p>

</div>

---

## 📖 Overview

**Proxy Toggle** is a tiny, zero-dependency **Visual Studio Code extension** that lets you switch your editor's network proxy on and off with a single click in the **status bar**. Instead of digging through `settings.json` every time you connect to or disconnect from a VPN, SOCKS tunnel, or corporate proxy, you configure your proxy once and flip it whenever you need it.

When you enable it, the extension writes `http.proxy` (built as `scheme://host:port`) into your global VS Code settings, and optionally sets `http.proxyStrictSSL`. When you disable it, it clears `http.proxy` but **remembers your last proxy** so toggling back on instantly restores it. The status bar item shows the live state — `Proxy: On` or `Proxy: Off` — so you always know where you stand.

> 🔎 **Keywords:** vscode proxy, vs code http.proxy, toggle proxy vscode, socks5 proxy vscode, proxy status bar, vscode extension, developer proxy switch, corporate proxy, vpn proxy toggle.

---

## ✨ Features

- 🖱️ **One-click toggle** — a status-bar button switches the proxy on/off instantly.
- 🔀 **Multiple schemes** — choose `socks5`, `http`, or `https` for the proxy URL.
- 🧩 **Settings-driven** — builds `scheme://host:port` from your configured host and port.
- 💾 **Remembers your last proxy** — disabling clears `http.proxy`, then re-enabling restores it.
- 🔒 **Strict SSL control** — optionally set `http.proxyStrictSSL` when the proxy turns on.
- 📊 **Live status** — the status bar shows `Proxy: On` / `Proxy: Off` with the active proxy in the tooltip.
- 🪶 **Zero dependencies** — pure JavaScript against the VS Code API; nothing to install or build.

---

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| Platform | Visual Studio Code (`^1.85.0`) |
| Language | JavaScript (Node.js / CommonJS) |
| API | VS Code Extension API (`vscode`) |
| Settings | `http.proxy`, `http.proxyStrictSSL` (global) |

---

## 🚀 Getting Started

### Prerequisites

- **Visual Studio Code** `1.85.0` or newer
- **Node.js** + npm (only needed to build/package the extension)

### Install from source

```bash
git clone https://github.com/morpheusadam/vscode-proxy.git
cd vscode-proxy
npm install -g @vscode/vsce
vsce package        # creates the .vsix
```

Then in VS Code: open the **Extensions** view → **…** menu → **Install from VSIX…** and pick the generated file. Or press `F5` from the project to launch an **Extension Development Host**.

---

## ⚙️ Configuration

Open **Settings** and search for **Proxy Toggle**, or add these keys to your `settings.json`:

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
| `proxyToggle.scheme` | `socks5` | Proxy scheme used when toggling on (`socks5`, `http`, `https`). |
| `proxyToggle.host` | `127.0.0.1` | Proxy host or IP. |
| `proxyToggle.port` | `10808` | Proxy port (1–65535). |
| `proxyToggle.strictSSL` | `false` | Value written to `http.proxyStrictSSL` when enabling. |

---

## 📦 Usage

1. Click the **Proxy** button in the status bar to turn the proxy **on** or **off**.
2. When turning **on**, the extension sets `http.proxy` to `scheme://host:port` from your settings (and applies `http.proxyStrictSSL`).
3. When turning **off**, it clears `http.proxy` and saves the last value so you can restore it with the next click.
4. You can also run the command **Toggle Proxy** (`proxyToggle.toggle`) from the Command Palette.

> 💡 If host/port aren't set yet, the extension shows a reminder so you can configure them first.

---

## 🗂️ Project Structure

```text
vscode-proxy/
├── extension.js       # activation, status-bar item & toggle logic
├── package.json       # manifest: command + configuration contributions
├── media/icon.svg     # extension icon
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! Open an [issue](https://github.com/morpheusadam/vscode-proxy/issues) or submit a pull request with improvements such as workspace-level targeting, no-proxy lists, or a quick-pick for multiple saved proxies.

## 📜 License

Distributed under the **MIT License** — see [`LICENSE`](LICENSE) for details (or the repository license, if present).

---

<div align="center">

### 👤 Author — Morpheus Adam

Web developer & cheerful hacker · PHP · Laravel · Go

<p>
  <a href="https://github.com/morpheusadam"><img src="https://img.shields.io/badge/GitHub-morpheusadam-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
  <a href="https://sam.zeonic.me"><img src="https://img.shields.io/badge/Website-sam.zeonic.me-4c1?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Website" /></a>
  <a href="mailto:morpheusadam95@gmail.com"><img src="https://img.shields.io/badge/Email-Contact-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>
</p>

⭐ **If Proxy Toggle saves you a few trips into settings.json, consider giving it a star!** ⭐

</div>


---

## ⭐ Star History

<a href="https://star-history.com/#morpheusadam/vscode-proxy&Date">
  <img src="https://api.star-history.com/svg?repos=morpheusadam/vscode-proxy&type=Date" alt="vscode-proxy — Star History Chart" width="70%" />
</a>

<div align="center">

### If this project helps you, please give it a ⭐

A star helps other developers discover **vscode-proxy** and supports continued development.

</div>
