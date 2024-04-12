import {Link, useSearchParams} from '@remix-run/react'
import {getImgProps, images} from '~/images.tsx'
import {ArrowLink} from '../arrow-button.tsx'
import {
  FullScreenYouTubeEmbed,
  LiteYouTubeEmbed,
} from '../fullscreen-yt-embed.tsx'
import {Grid} from '../grid.tsx'
import {H2, H3} from '../typography.tsx'

function IntroductionSection() {
  const [searchParams] = useSearchParams()
  return (
    <Grid>
      <div className="col-span-full lg:col-span-4">
        <FullScreenYouTubeEmbed
          autoplay={searchParams.has('autoplay')}
          img={
            <img
              {...getImgProps(images.getToKnowKentVideoThumbnail, {
                className: 'rounded-lg object-cover w-full',
                widths: [256, 550, 700, 900, 1300, 1800],
                sizes: [
                  '(max-width: 320px) 256px',
                  '(min-width: 321px) and (max-width: 1023px) 80vw',
                  '(min-width: 1024px) 410px',
                  '850px',
                ],
              })}
            />
          }
          ytLiteEmbed={
            <LiteYouTubeEmbed
              id="a7VxBwLGcDE"
              announce="Watch"
              title="Get to know Kos Huang"
              // We don't show the poster, so we use the lowest-res version
              poster="default"
              params={new URLSearchParams({
                color: 'white',
                playsinline: '0',
                rel: '0',
              }).toString()}
            />
          }
        />
      </div>
      <div className="col-span-full mt-12 lg:col-span-6 lg:col-start-6 lg:mt-0">
        <H2 id="intro">
          {`我是 Kos，我喜歡幫助別人成為更好的軟體工程師`}
        </H2>
        <H3 variant="secondary" as="p" className="mt-12">
          <p>過去兩三年，我每週六都會花兩小時，擔任軟體教練或導師「免費」帶一些初學者學習。</p>
          <p>我希望可以持續幫助別人，但為了品質，決定改成付費的教練導師課程。</p>
      </H3>
        <ArrowLink
          to="/about"
          direction="right"
          className="mt-20"
          prefetch="intent"
        >
          關於我更多的資訊
        </ArrowLink>
      </div>
    </Grid>
  )
}

export {IntroductionSection}
