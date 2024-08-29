import { PageMetaResolver, provideEntity } from '@oryx-frontend/core';
import { Provider } from '@oryx-frontend/di';
import { ExperienceAdapter } from '@oryx-frontend/experience';
import { articleTypes, Content, ContentQualifier } from '../models';
import { ArticlePageDescriptionMetaResolver, ArticlePageTitleMetaResolver } from '../resolvers';
import { ContentConfig, ContentExperienceAdapter } from './adapter';
import { ArticleQualifierContextFallback } from './article-context';
import {
  contentfulProviders,
  storyblokProviders,
  strapiProviders,
} from './cms';
import { ContentContext } from './content-context';
import { ContentService } from './content.service';
import { DefaultContentService } from './default-content.service';
import { DefaultFontService, FontService } from './font';

export const contentProviders: Provider[] = [
  {
    provide: ExperienceAdapter,
    useClass: ContentExperienceAdapter,
  },
  {
    provide: ContentService,
    useClass: DefaultContentService,
  },
  {
    provide: FontService,
    useClass: DefaultFontService,
  },
  ...contentfulProviders,
  ...storyblokProviders,
  ...strapiProviders,
  provideEntity('content', {
    service: ContentService,
    context: ContentContext.Content,
  }),
  ArticleQualifierContextFallback,
  {
    provide: PageMetaResolver,
    useClass: ArticlePageTitleMetaResolver,
  },
  {
    provide: PageMetaResolver,
    useClass: ArticlePageDescriptionMetaResolver,
  },
  {
    provide: ContentConfig,
    useValue: {
      storyblok: {
        types: ['component', 'faq', 'contents'],
      },
      strapi: {
        types: ['component', 'about', 'contents'],
        defaultType: 'about',
      },
      contentful: {
        types: ['component', 'article', 'contents'],
      },
    },
  },
  ...articleTypes.map((type) =>
    provideEntity<Content | null | undefined, ContentQualifier>(type, {
      service: ContentService,
      context: type,
      get: (service, qualifier) =>
        (service as ContentService).get({ ...qualifier, type }),
    })
  ),
];
