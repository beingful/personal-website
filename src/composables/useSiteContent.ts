import { siteContent } from '@/data/siteContent';
import type { SiteContent } from '@/types/content';

export interface SiteContentProvider {
  getContent(): SiteContent;
}

class StaticSiteContentProvider implements SiteContentProvider {
  public getContent(): SiteContent {
    return siteContent;
  }
}

const siteContentProvider: SiteContentProvider = new StaticSiteContentProvider();

export const useSiteContent = (): SiteContent => siteContentProvider.getContent();
