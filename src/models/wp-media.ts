export class WpMedia {
  id: number;
  date: string;
  date_gmt: string;
  guid: Guid;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: Guid;
  author: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: any[];
  description: Guid;
  caption: Guid;
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: Mediadetails;
  post?: any;
  source_url: string;
  _links: Links;
}

interface Links {
  self: Self[];
  collection: Self[];
  about: Self[];
  author: Author[];
  replies: Author[];
}

interface Author {
  embeddable: boolean;
  href: string;
}

interface Self {
  href: string;
}

interface Mediadetails {
  width: number;
  height: number;
  file: string;
  sizes: Sizes;
  image_meta: Imagemeta;
}

interface Imagemeta {
  aperture: string;
  credit: string;
  camera: string;
  caption: string;
  created_timestamp: string;
  copyright: string;
  focal_length: string;
  iso: string;
  shutter_speed: string;
  title: string;
  orientation: string;
  keywords: any[];
}

interface Sizes {
  thumbnail: Thumbnail;
  medium: Thumbnail;
  'onepress-blog-small': Thumbnail;
  'onepress-small': Thumbnail;
  full: Thumbnail;
}

interface Thumbnail {
  file: string;
  width: number;
  height: number;
  mime_type: string;
  source_url: string;
}

interface Guid {
  rendered: string;
}
