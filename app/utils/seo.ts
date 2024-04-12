import {getGenericSocialImage, images} from '~/images.tsx'

export function getSocialMetas({
  url,
  title = '軟體工程師的成長夥伴：軟體教練/導師課，提供客製化指導、豐富學習資源！',
  description = 'Make the world better with software',
  image = getGenericSocialImage({
    url,
    words: title,
    featuredImage: images.kodyFlyingSnowboardingBlue.id,
  }),
  keywords = '',
}: {
  image?: string
  url: string
  title?: string
  description?: string
  keywords?: string
}) {
  return [
    {title},
    {name: 'description', content: description},
    {name: 'keywords', content: keywords},
    {name: 'image', content: image},
    {name: 'og:url', content: url},
    {name: 'og:title', content: title},
    {name: 'og:description', content: description},
    {name: 'og:image', content: image},
    {name: 'twitter:card', content: image ? 'summary_large_image' : 'summary'},
    {name: 'twitter:creator', content: '@kentcdodds'},
    {name: 'twitter:site', content: '@kentcdodds'},
    {name: 'twitter:title', content: title},
    {name: 'twitter:description', content: description},
    {name: 'twitter:image', content: image},
    {name: 'twitter:image:alt', content: title},
  ]
}
