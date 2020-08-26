export function convertToDisplayName(name) {
  var displayName = name.split(/(?=[A-Z])/).join(" ");
  return displayName.charAt(0).toUpperCase() + displayName.slice(1);
}