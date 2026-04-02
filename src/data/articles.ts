import { Article } from './types';
import { articlesPart1 } from './articles-part1';
import { newArticles } from './articles-new';

export type { Article };

export const categories = [
  'About HIV',
  'Prevention',
  'Testing',
  'Treatment',
  'Living with HIV',
  'Resources',
  'Blog'
];

const subcategoriesByCategory: Record<string, string[]> = {
  'About HIV': ['Basics', 'Symptoms', 'Transmission', 'Stages', 'History', 'Statistics', 'Myths vs Facts', 'Global Impact', 'Stigma', 'Research'],
  'Prevention': ['PrEP', 'PEP', 'Condoms', 'U=U', 'Harm Reduction', 'Testing as Prevention', 'TasP', 'Vaccines', 'Microbicides', 'Circumcision'],
  'Testing': ['Types of Tests', 'Window Period', 'Where to Get Tested', 'Self-Testing', 'Confidentiality', 'Interpreting Results', 'Post-Test Counseling', 'Linkage to Care', 'Partner Notification', 'Frequency'],
  'Treatment': ['ART', 'Adherence', 'Side Effects', 'Drug Resistance', 'New Treatments', 'Cure Research', 'Pediatric Treatment', 'Pregnancy and HIV', 'Aging and HIV', 'Co-infections'],
  'Living with HIV': ['Mental Health', 'Nutrition', 'Exercise', 'Disclosure', 'Legal Rights', 'Housing', 'Insurance', 'Support Groups', 'Travel', 'Relationships'],
  'Resources': ['Clinics', 'Hotlines', 'Financial Aid', 'Legal Aid', 'Education', 'Advocacy', 'Global Organizations', 'Local Support', 'Research Trials', 'Apps'],
  'Blog': ['News', 'Personal Stories', 'Expert Interviews', 'Community Spotlight', 'Event Recaps', 'Policy Updates', 'Scientific Breakthroughs', 'Q&A', 'Opinion', 'Tips']
};

const generateBaseArticles = (): Article[] => {
  const generated: Article[] = [];
  let currentId = 7;

  for (const category of categories) {
    const subcategories = subcategoriesByCategory[category];
    if (!subcategories) continue;

    for (const subcategory of subcategories) {
      // For each subcategory, generate 3 articles (except for the last few to match ID 211)
      const count = (currentId > 208 && category === 'Blog') ? 1 : 3;
      
      for (let i = 1; i <= count; i++) {
        if (currentId > 211) break;

        const slug = `understanding-${subcategory.toLowerCase().replace(/\s+/g, '-')}-part-${i}-${currentId}`;
        const title = `Understanding ${subcategory} - Part ${i}`;
        
        generated.push({
          id: currentId,
          slug,
          title,
          category,
          subcategory,
          date: "2025-08-15",
          author: "HIVClinic Editorial Team",
          readTime: "5 min read",
          summary: `An in-depth look at ${subcategory} within the ${category} category.`,
          content: `<p>HIV remains a significant public health challenge, but the tools to end the epidemic exist. Whether you are seeking information for personal health, supporting a loved one, or working in public health, understanding the full landscape of HIV — including ${subcategory} — is essential. Stay informed, get tested, use prevention tools, and if you are living with HIV, know that effective treatment is available and that you can live a full, healthy life. Together, we can end the HIV epidemic.</p>`
        });
        currentId++;
      }
      if (currentId > 211) break;
    }
    if (currentId > 211) break;
  }

  return generated;
};

export const articles: Article[] = [
  ...articlesPart1,
  ...generateBaseArticles(),
  ...newArticles
];
