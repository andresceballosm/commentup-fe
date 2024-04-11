import escapeHtml from 'escape-html';
import { Text } from 'slate';

export const serialize = (node: any) => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }
    return string;
  }

  const children = node?.children
    ? node.children.map((n: any) => serialize(n)).join('')
    : node.map((n: any) => serialize(n)).join('');

  switch (node.type) {
    case 'quote':
      return `<blockquote><p>${children}</p></blockquote>`;
    case 'paragraph':
      return `<p>${children}</p>`;
    case 'link':
      return `<a href="${escapeHtml(node.url)}">${children}</a>`;
    default:
      return children;
  }
};
