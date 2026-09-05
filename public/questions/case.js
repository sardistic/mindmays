// Terms are written the way they would head a dictionary entry ("A firewall", "The
// African Union"), but they are read mid-sentence. Lowercasing the whole string would
// wreck a proper noun, so only the leading article is lowered — or, when the term is
// plainly not a name, its first letter.
export function soft(value) {
  const text = String(value);
  const withArticle = text.replace(/^(The|A|An)\b/, (article) => article.toLowerCase());
  if (withArticle !== text) return withArticle;
  const rest = text.slice(1);
  return rest === rest.toLowerCase() ? text[0].toLowerCase() + rest : text;
}
