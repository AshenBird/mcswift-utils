const getInstalledAppCommand = [
	`Get-ItemProperty`,
	`"HKLM:\\Software\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\App Paths\\*"`,
	`|`,
	`Select-Object -Property "(default)", PSChildName`,
	`|`,
	`ConvertTo-Json`
].join(" ");
//#endregion
export { getInstalledAppCommand };
