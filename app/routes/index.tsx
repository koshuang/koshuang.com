import {json, type HeadersFunction, type LoaderFunction} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import {ButtonLink} from '~/components/button.tsx'
import {ServerError} from '~/components/errors.tsx'
import {AboutSection} from '~/components/sections/about-section.tsx'
import {BlogSection} from '~/components/sections/blog-section.tsx'
import {CourseSection} from '~/components/sections/course-section.tsx'
import {DiscordSection} from '~/components/sections/discord-section.tsx'
import {HeroSection} from '~/components/sections/hero-section.tsx'
import {IntroductionSection} from '~/components/sections/introduction-section.tsx'
import {ProblemSolutionSection} from '~/components/sections/problem-solution-section.tsx'
import {Spacer} from '~/components/spacer.tsx'
import {getRandomFlyingKody} from '~/images.tsx'
import {type MdxListItem, type Team} from '~/types.ts'
import {getRankingLeader} from '~/utils/blog.ts'
import {
  getBlogReadRankings,
  getBlogRecommendations,
  getReaderCount,
  getTotalPostReads,
} from '~/utils/blog.server.ts'
import {getBlogMdxListItems} from '~/utils/mdx.server.ts'
import {
  formatNumber,
  getOptionalTeam,
  reuseUsefulLoaderHeaders,
  teams,
  useCapturedRouteError,
  type OptionalTeam,
} from '~/utils/misc.tsx'
import {getUser} from '~/utils/session.server.ts'
import {getServerTimeHeader} from '~/utils/timing.server.ts'

type LoaderData = {
  blogPostCount: string
  totalBlogReaders: string
  totalBlogReads: string
  currentBlogLeaderTeam: Team | undefined
  blogRecommendations: Array<MdxListItem>
  kodyTeam: OptionalTeam
  randomImageNo: number
}

export const loader: LoaderFunction = async ({request}) => {
  const timings = {}
  const [
    user,
    posts,
    totalBlogReads,
    blogRankings,
    totalBlogReaders,
    blogRecommendations,
  ] = await Promise.all([
    getUser(request),
    getBlogMdxListItems({request, timings}),
    getTotalPostReads({request, timings}),
    getBlogReadRankings({request, timings}),
    getReaderCount({request, timings}),
    getBlogRecommendations({request, timings}),
  ])

  const data: LoaderData = {
    blogRecommendations,
    blogPostCount: formatNumber(posts.length),
    totalBlogReaders:
      totalBlogReaders < 10_000
        ? '很多'
        : formatNumber(totalBlogReaders),
    totalBlogReads:
      totalBlogReads < 100_000
        ? '很多'
        : formatNumber(totalBlogReads),
    currentBlogLeaderTeam: getRankingLeader(blogRankings)?.team,
    kodyTeam: getOptionalTeam(
      user?.team ?? teams[Math.floor(Math.random() * teams.length)],
    ),
    randomImageNo: Math.random(),
  }
  return json(data, {
    headers: {
      'Cache-Control': 'private, max-age=3600',
      Vary: 'Cookie',
      'Server-Timing': getServerTimeHeader(timings),
    },
  })
}

export const headers: HeadersFunction = reuseUsefulLoaderHeaders

export default function IndexRoute() {
  const data = useLoaderData<LoaderData>()
  const kodyFlying = getRandomFlyingKody(data.kodyTeam, data.randomImageNo)
  return (
    <div>
      <HeroSection
        title={<>軟體工程師的成長夥伴：<br/>軟體教練/導師課，提供客製化指導、豐富學習資源！</>}
        imageBuilder={kodyFlying}
        imageSize="giant"
        arrowUrl="#intro"
        arrowLabel="更多 Kos 的介紹"
        action={
          <div className="mr-auto flex flex-col gap-4">
            <ButtonLink to="/blog" variant="primary" prefetch="intent">
              閱讀部落格
            </ButtonLink>
            <ButtonLink to="/courses" variant="secondary" prefetch="intent">
              我在尋找教練與導師
            </ButtonLink>
          </div>
        }
      />

      <main>
        <IntroductionSection />
        <Spacer size="lg" />
        <ProblemSolutionSection
          blogPostCount={data.blogPostCount}
          totalBlogReads={data.totalBlogReads}
          currentBlogLeaderTeam={data.currentBlogLeaderTeam}
          totalBlogReaders={data.totalBlogReaders}
        />
        <Spacer size="base" />
        <BlogSection
          articles={data.blogRecommendations}
          title="部落格推薦"
          description="特別為你而準備"
        />
      </main>
    </div>
  )
}

export function ErrorBoundary() {
  const error = useCapturedRouteError()
  console.error(error)
  return <ServerError />
}
