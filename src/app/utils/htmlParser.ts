// Utility functions to parse HTML content from API

export const parseAboutUsContent = (htmlContent: string) => {
  // Create a temporary div to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;

  // Extract subtitle (first em tag in h2)
  const subtitleElement = tempDiv.querySelector('h2 em');
  const subtitle = subtitleElement?.textContent || '';

  // Extract main content paragraphs (excluding h2 and h3 elements)
  const paragraphs = Array.from(tempDiv.querySelectorAll('p'))
    .map(p => p.textContent?.trim())
    .filter(text => text && text !== ''); // Remove empty paragraphs

  // Find "What does GREEN do" section
  const whatDoesGreenElement = tempDiv.querySelector('h2:not(:first-child)');
  const whatDoesGreenTitle = whatDoesGreenElement?.textContent || 'What does GREEN do';

  // Extract subtitle for "What does GREEN do" section
  const whatDoesGreenSubtitle = tempDiv.querySelector('h3 em')?.textContent || '';

  // Split paragraphs into two sections
  // First 3 paragraphs for "About GREEN", remaining for "What does GREEN do"
  const aboutGreenParagraphs = paragraphs.slice(0, 3);
  const whatDoesGreenParagraphs = paragraphs.slice(3);

  return {
    subtitle,
    aboutGreenParagraphs,
    whatDoesGreenTitle,
    whatDoesGreenSubtitle,
    whatDoesGreenParagraphs,
  };
};

export const parseQuoteContent = (htmlQuote: string) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlQuote;

  // Extract the two quote parts
  const quoteElements = tempDiv.querySelectorAll('h2 em');
  const firstQuote = quoteElements[0]?.textContent || '';
  const secondQuote = quoteElements[1]?.textContent || '';

  return {
    firstQuote,
    secondQuote,
  };
};

export const parseWhyGreenContent = (htmlContent: string) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;

  // Extract company name parts
  const companyNameElement = tempDiv.querySelector('h2:first-child');
  const companyName = companyNameElement?.textContent || 'GREEN Limited';

  // Extract subtitle from blockquote
  const subtitleElement = tempDiv.querySelector('blockquote em');
  const subtitle = subtitleElement?.textContent || '';

  // Extract main content paragraphs
  const paragraphs = Array.from(tempDiv.querySelectorAll('p'))
    .map(p => p.textContent?.trim())
    .filter(text => text && text !== ''); // Remove empty paragraphs

  // Extract section titles
  const sectionTitleElements = tempDiv.querySelectorAll('h2');
  const envisionTitle = sectionTitleElements[1]?.textContent || 'Envision and Enlighten lives with';
  const solutionsTitle = sectionTitleElements[2]?.textContent || "GREEN's Sustainable Energy Solutions";

  return {
    companyName,
    subtitle,
    paragraphs,
    envisionTitle,
    solutionsTitle,
  };
};