import DOMPurify from 'dompurify';

/**
 * Sanitize markup or text when used inside dangerouslysetInnerHTML
 *
 * @param {string} content Plain or html string.
 *
 * @return {string} Sanitized string
 */
export const sanitize = (content: any) => {
  return typeof window ? DOMPurify.sanitize(content) : content;
};

export function formatDate(date: any) {
  const formatted = new Date(date).toLocaleDateString('no-NO', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
  return formatted;
}

export function metaDescription(str: string) {
  return str.replace(/^(.{135}[^\s]*).*/, '$1').trim() + '...';
}

export function removeTags(str: any) {
  return str.toString().replace(/(<([^>]+)>)/gi, '');
}
