/**
 * Medium API Service
 *
 * Fetches articles from Medium RSS feed and processes them
 */

export interface MediumArticle {
  id: string;
  title: string;
  pubDate: string;
  link: string;
  thumbnail: string;
  language: 'BR' | 'ENG';
}

/**
 * Detect language based on title and content
 * Enhanced heuristic: check for Portuguese-specific characters and common words
 */
function detectLanguage(title: string, content: string): 'BR' | 'ENG' {
  const text = (title + ' ' + content).toLowerCase();

  // Portuguese-specific characters (strong indicators)
  const portugueseChars = ['ção', 'ções', 'ã', 'õ', 'ê', 'ô', 'á', 'à', 'ú', 'í'];
  const charCount = portugueseChars.filter(char => text.includes(char)).length;

  // Portuguese common words
  const portugueseWords = ['para', 'como', 'que', 'não', 'com', 'uma', 'por', 'mais', 'este', 'seu', 'sua', 'ser', 'ter'];
  const wordCount = portugueseWords.filter(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    return regex.test(text);
  }).length;

  // English common words (to distinguish)
  const englishWords = ['the', 'and', 'for', 'with', 'this', 'that', 'have', 'from', 'they', 'what', 'your'];
  const englishCount = englishWords.filter(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    return regex.test(text);
  }).length;

  // Decision logic:
  // - If Portuguese chars found, very likely Portuguese
  // - Otherwise compare word counts
  if (charCount >= 2) return 'BR';
  if (wordCount > englishCount) return 'BR';
  return 'ENG';
}

/**
 * Format date from Medium RSS format to readable format
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Fetch articles from Medium RSS feed
 * Medium username: @nabuchler (or configure via env)
 */
export async function fetchMediumArticles(): Promise<MediumArticle[]> {
  try {
    const username = process.env.NEXT_PUBLIC_MEDIUM_USERNAME || '@nabuchler';
    const rssUrl = `https://medium.com/feed/${username}`;

    // Use RSS2JSON service to convert RSS to JSON (free tier available)
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch Medium articles');
    }

    const data = await response.json();

    if (data.status !== 'ok') {
      throw new Error('RSS feed error');
    }

    // Process articles
    const articles: MediumArticle[] = data.items.map((item: any, index: number) => {
      // Extract thumbnail from content or use default
      const thumbnailMatch = item.content?.match(/<img[^>]+src="([^">]+)"/);
      const thumbnail = thumbnailMatch ? thumbnailMatch[1] : '/pexels-elly-fairytale-3823207-1.jpg';

      // Detect language
      const language = detectLanguage(item.title || '', item.content || '');

      return {
        id: item.guid || `article-${index}`,
        title: item.title || 'Untitled',
        pubDate: formatDate(item.pubDate),
        link: item.link || '#',
        thumbnail,
        language
      };
    });

    return articles;
  } catch (error) {
    console.error('Error fetching Medium articles:', error);
    // Return mock data as fallback
    return getMockArticles();
  }
}

/**
 * Mock articles for development/fallback
 */
function getMockArticles(): MediumArticle[] {
  return [
    {
      id: '1',
      title: 'Design Leadership in 2024',
      pubDate: 'Oct 15, 2024',
      link: 'https://medium.com/@nabuchler',
      thumbnail: '/pexels-elly-fairytale-3823207-1.jpg',
      language: 'BR'
    },
    {
      id: '2',
      title: 'Building Global Teams',
      pubDate: 'Sep 22, 2024',
      link: 'https://medium.com/@nabuchler',
      thumbnail: '/pexels-elly-fairytale-3823207-1.jpg',
      language: 'ENG'
    },
    {
      id: '3',
      title: 'Design Systems at Scale',
      pubDate: 'Aug 10, 2024',
      link: 'https://medium.com/@nabuchler',
      thumbnail: '/pexels-elly-fairytale-3823207-1.jpg',
      language: 'BR'
    },
    {
      id: '4',
      title: 'UX Strategy & Impact',
      pubDate: 'Jul 5, 2024',
      link: 'https://medium.com/@nabuchler',
      thumbnail: '/pexels-elly-fairytale-3823207-1.jpg',
      language: 'ENG'
    }
  ];
}
