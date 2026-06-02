function PascalCase(value) {
  const camelCased = String(value)
    .replace(/['\u2019]/g, '')
    .replace(/[^a-zA-Z0-9]+(.)?/g, (_, chr) => (chr ? chr.toUpperCase() : ''))
    .replace(/^[A-Z]/, chr => chr.toLowerCase())

  return camelCased.charAt(0).toUpperCase() + camelCased.slice(1)
}

global.PascalCase = PascalCase
