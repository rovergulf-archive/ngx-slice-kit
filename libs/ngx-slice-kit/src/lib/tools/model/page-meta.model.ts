import { Meta, MetaDefinition } from "@angular/platform-browser";

export const DEFAULT_META_ROBOTS = 'FOLLOW, INDEX';
export const DEFAULT_META_TITLE = ``;
export const DEFAULT_META_KEYWORDS = ``;
export const DEFAULT_META_DESCRIPTION = ``;
export const DEFAULT_META_IMAGE = `//rovergulf.net/...`;
export const DEFAULT_META_SITE = `//rovergulf.net`;

export type AppMetaState = 'clean' | 'dirty';

export class PageMeta {

  use_default: boolean = false;
  lang?: string = 'en';

  robots?: string = DEFAULT_META_ROBOTS;

  title?: string = DEFAULT_META_TITLE;
  keywords?: string = DEFAULT_META_KEYWORDS;
  description?: string = DEFAULT_META_DESCRIPTION;
  image_src?: string = DEFAULT_META_IMAGE;

  image?: PageMetaImage = new PageMetaImage();

  og: PageMetaOG = new PageMetaOG();

  twitter: PageMetaTwitter = new PageMetaTwitter();

  constructor(m?: PageMeta) {
    Object.assign(this, m);
  }

  getServiceTags(): MetaDefinition[] {
    const result: MetaDefinition[] = [];

    for (const key of Object.keys(this)) {
      if (this.hasOwnProperty(key)) {
        const {
          title,
          keywords,
          description,
          image_src
        } = this

        const standard = fillMetaKeys({title, keywords, description, image_src});
        result.push(...standard);

        switch (key) {
          case 'og':
            const og = fillMetaKeys(this.og, 'og');
            result.push(...og)
            break;
          case 'twitter':
            const twitter = fillMetaKeys(this.twitter, 'twitter');
            result.push(...twitter);
            break;
          default:
            break;
        }
      }
    }

    return result;
  }
}

export function fillMetaKeys(obj: any, prefix?: string): MetaDefinition[] {
  const result: MetaDefinition[] = [];

  if (typeof obj === 'object') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // declare meta object
        const def: MetaDefinition = {};

        // og: and twitter: require property definition
        if (prefix?.length > 0) {
          def.property = `${prefix}:${key}`;
          def.content = obj[key];
        } else {
          def.name = key;
          def.content =  obj[key];
        }

        result.push(def)
      }
    }
  }

  return result;
}

export class PageMetaImage {
  type?: string = 'image/jpeg';
  width?: number = 1200;
  height?: number = 630;
  url: string = DEFAULT_META_IMAGE;
}

export class PageMetaOG {
  title?: string = DEFAULT_META_TITLE;
  description?: string = DEFAULT_META_DESCRIPTION;
  url?: string = DEFAULT_META_SITE;
  type?: string = `website`;
  image?: PageMetaImage;
}

export class PageMetaTwitter {
  card?: string = `summary_large_image`;
  title?: string = DEFAULT_META_TITLE;
  site?: string = `@rovergulf`;
  description?: string = DEFAULT_META_DESCRIPTION;
  image?: string = DEFAULT_META_IMAGE;
}

