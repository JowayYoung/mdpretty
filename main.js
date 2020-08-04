const Path = require("path");
const { app, BrowserWindow } = require("electron");

function CreateWindow() {
	const mainWindow = new BrowserWindow({ height: 800, width: 1200 });
	if (process.env.NODE_ENV === "dev") {
		mainWindow.loadURL("http://127.0.0.1:9999");
	} else {
		const entry = Path.join(__dirname, "./dist/test/index.html");
		mainWindow.loadFile(entry);
	}
}

// Electron初始完成并创建窗口时触发
app.on("ready", CreateWindow);
// Electron内部窗口闲置点击后重新创建窗口时触发
app.on("activate", () => !BrowserWindow.getAllWindows().length && CreateWindow());
// Electron内部所有窗口关闭时触发：MacOS中除非用户操作cmd+q显式退出，否则应用与菜单栏始终处于活动状态
app.on("window-all-closed", () => process.platform !== "darwin" && app.quit());