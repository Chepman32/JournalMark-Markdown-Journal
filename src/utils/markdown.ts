// Markdown utility functions

export const countWords = (text: string): number => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

export const countCharacters = (text: string): number => {
  return text.length;
};

export const estimateReadingTime = (text: string): number => {
  const words = countWords(text);
  const wordsPerMinute = 200;
  return Math.ceil(words / wordsPerMinute);
};

export const extractTitle = (markdown: string): string => {
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  return titleMatch ? titleMatch[1] : 'Untitled';
};

export const extractExcerpt = (markdown: string, length: number = 150): string => {
  // Remove markdown syntax for preview
  let text = markdown
    .replace(/^#+\s+/gm, '') // Remove headers
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
    .replace(/_(.+?)_/g, '$1') // Remove italic
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links
    .replace(/`(.+?)`/g, '$1') // Remove code
    .replace(/^>\s+/gm, '') // Remove blockquotes
    .replace(/^[-*+]\s+/gm, '') // Remove list markers
    .trim();

  if (text.length > length) {
    return text.substring(0, length) + '...';
  }

  return text;
};

export const formatMarkdownLinks = (text: string): string => {
  // Convert URLs to markdown links
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, '[$1]($1)');
};

export const addMarkdownSyntax = (
  text: string,
  selection: {start: number; end: number},
  syntax: 'bold' | 'italic' | 'heading' | 'list' | 'link' | 'quote' | 'code',
): {text: string; selection: {start: number; end: number}} => {
  const {start, end} = selection;
  const selectedText = text.substring(start, end);

  let newText = text;
  let newSelection = {start, end};

  switch (syntax) {
    case 'bold':
      newText = text.substring(0, start) + `**${selectedText}**` + text.substring(end);
      newSelection = {start: start + 2, end: end + 2};
      break;

    case 'italic':
      newText = text.substring(0, start) + `_${selectedText}_` + text.substring(end);
      newSelection = {start: start + 1, end: end + 1};
      break;

    case 'heading':
      newText = text.substring(0, start) + `# ${selectedText}` + text.substring(end);
      newSelection = {start: start + 2, end: end + 2};
      break;

    case 'list':
      newText = text.substring(0, start) + `- ${selectedText}` + text.substring(end);
      newSelection = {start: start + 2, end: end + 2};
      break;

    case 'link':
      newText = text.substring(0, start) + `[${selectedText}](url)` + text.substring(end);
      newSelection = {start: end + 3, end: end + 6};
      break;

    case 'quote':
      newText = text.substring(0, start) + `> ${selectedText}` + text.substring(end);
      newSelection = {start: start + 2, end: end + 2};
      break;

    case 'code':
      newText = text.substring(0, start) + `\`${selectedText}\`` + text.substring(end);
      newSelection = {start: start + 1, end: end + 1};
      break;
  }

  return {text: newText, selection: newSelection};
};
