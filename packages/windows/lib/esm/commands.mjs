// packages/windows/src/commands.ts
var getInstalledAppCommands = [
  `Get-ItemProperty`,
  `"HKLM:\\Software\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\App Paths\\*"`,
  `|`,
  `Select-Object -Property "(default)", PSChildName`,
  `|`,
  `ConvertTo-Json`
];
var getInstalledAppCommand = getInstalledAppCommands.join(" ");
export {
  getInstalledAppCommand
};
