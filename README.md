# Proxy Toggle (VS Code Extension)

Toggle the VS Code `http.proxy` setting from the status bar and configure the proxy host/port in Settings.

## English

### Features
- One-click toggle in the status bar.
- Reads proxy host/port from Settings and builds `scheme://host:port`.
- Stores the last enabled proxy and restores it when toggled back on.

### Configure
Open Settings and search for **Proxy Toggle**, or add these keys to `settings.json`:

```json
{
  "proxyToggle.scheme": "socks5",
  "proxyToggle.host": "127.0.0.1",
  "proxyToggle.port": 10808,
  "proxyToggle.strictSSL": false
}
```

### Use
- Click the **Proxy** button in the status bar to turn it on/off.
- When turning on, the extension sets `http.proxy` based on your settings.

## فارسی

### امکانات
- تاگل با یک کلیک در نوار پایین.
- ساخت آدرس پروکسی از `scheme://host:port` بر اساس تنظیمات.
- ذخیره آخرین پراکسی فعال و بازگردانی در روشن‌کردن مجدد.

### تنظیمات
در Settings عبارت **Proxy Toggle** را جست‌وجو کنید یا این مقادیر را در `settings.json` قرار دهید:

```json
{
  "proxyToggle.scheme": "socks5",
  "proxyToggle.host": "127.0.0.1",
  "proxyToggle.port": 10808,
  "proxyToggle.strictSSL": false
}
```

### استفاده
- روی دکمه **Proxy** در Status Bar کلیک کنید تا روشن/خاموش شود.
- هنگام روشن‌کردن، مقدار `http.proxy` بر اساس تنظیمات ساخته می‌شود.
