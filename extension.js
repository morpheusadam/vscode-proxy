const vscode = require("vscode");

const CONFIG_PROXY = "http.proxy";
const CONFIG_STRICT_SSL = "http.proxyStrictSSL";
const CONFIG_SECTION = "proxyToggle";
const STATE_LAST_PROXY = "proxyToggle.lastProxy";
const STATE_LAST_STRICT_SSL = "proxyToggle.lastStrictSSL";

function isProxyEnabled(config) {
  const value = config.get(CONFIG_PROXY);
  return typeof value === "string" && value.trim().length > 0;
}

function getProxyValue(config) {
  const value = config.get(CONFIG_PROXY);
  return typeof value === "string" ? value : "";
}

function getProxySettings() {
  const settings = vscode.workspace.getConfiguration(CONFIG_SECTION);
  return {
    scheme: settings.get("scheme"),
    host: settings.get("host"),
    port: settings.get("port"),
    strictSSL: settings.get("strictSSL")
  };
}

function buildProxyFromSettings() {
  const settings = getProxySettings();
  const scheme = typeof settings.scheme === "string" && settings.scheme.trim().length > 0
    ? settings.scheme.trim()
    : "socks5";
  const host = typeof settings.host === "string" ? settings.host.trim() : "";

  let portNumber = null;
  if (typeof settings.port === "number" && Number.isFinite(settings.port)) {
    portNumber = settings.port;
  } else if (typeof settings.port === "string" && settings.port.trim().length > 0) {
    const parsed = Number(settings.port);
    if (Number.isFinite(parsed)) {
      portNumber = parsed;
    }
  }

  if (!host || !Number.isInteger(portNumber) || portNumber < 1 || portNumber > 65535) {
    return "";
  }

  return `${scheme}://${host}:${portNumber}`;
}

function updateStatus(statusBarItem, config) {
  const enabled = isProxyEnabled(config);
  const proxyValue = getProxyValue(config);

  statusBarItem.text = enabled ? "$(plug) Proxy: On" : "$(circle-slash) Proxy: Off";
  statusBarItem.tooltip = enabled
    ? `Proxy enabled: ${proxyValue}`
    : "Proxy disabled";
}

async function toggleProxy(context) {
  const config = vscode.workspace.getConfiguration();
  const enabled = isProxyEnabled(config);

  if (enabled) {
    const currentProxy = getProxyValue(config);
    if (currentProxy) {
      await context.globalState.update(STATE_LAST_PROXY, currentProxy);
    }
    const strictSSL = config.get(CONFIG_STRICT_SSL);
    if (typeof strictSSL === "boolean") {
      await context.globalState.update(STATE_LAST_STRICT_SSL, strictSSL);
    }

    await config.update(CONFIG_PROXY, "", vscode.ConfigurationTarget.Global);
    return;
  }

  const proxyFromSettings = buildProxyFromSettings();
  const lastProxy = context.globalState.get(STATE_LAST_PROXY);
  const proxyValue = proxyFromSettings || (typeof lastProxy === "string" ? lastProxy : "");
  if (proxyValue.trim().length === 0) {
    vscode.window.showWarningMessage(
      "Set Proxy Toggle settings (host/port) or configure http.proxy first."
    );
    return;
  }

  await config.update(CONFIG_PROXY, proxyValue, vscode.ConfigurationTarget.Global);

  const settings = getProxySettings();
  if (typeof settings.strictSSL === "boolean") {
    await config.update(CONFIG_STRICT_SSL, settings.strictSSL, vscode.ConfigurationTarget.Global);
  } else {
    const lastStrictSSL = context.globalState.get(STATE_LAST_STRICT_SSL);
    if (typeof lastStrictSSL === "boolean") {
      await config.update(CONFIG_STRICT_SSL, lastStrictSSL, vscode.ConfigurationTarget.Global);
    }
  }
}

function activate(context) {
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    -1
  );
  statusBarItem.command = "proxyToggle.toggle";
  statusBarItem.name = "Proxy Toggle";
  statusBarItem.show();

  const refresh = () => {
    const config = vscode.workspace.getConfiguration();
    updateStatus(statusBarItem, config);
  };

  refresh();

  const disposable = vscode.commands.registerCommand("proxyToggle.toggle", async () => {
    await toggleProxy(context);
    refresh();
  });

  const configListener = vscode.workspace.onDidChangeConfiguration((event) => {
    if (
      event.affectsConfiguration(CONFIG_PROXY) ||
      event.affectsConfiguration(CONFIG_STRICT_SSL) ||
      event.affectsConfiguration(CONFIG_SECTION)
    ) {
      refresh();
    }
  });

  context.subscriptions.push(statusBarItem, disposable, configListener);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
