import {
  Tab as ReachTab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  type TabProps,
} from '@reach/tabs'
import {Link} from '@remix-run/react'
import {clsx} from 'clsx'
import {differenceInYears} from 'date-fns'
import {AnimatePresence, motion} from 'framer-motion'
import * as React from 'react'
import {getImgProps, images, type ImageBuilder} from '~/images.tsx'
import {type Team} from '~/types.ts'
import {teamTextColorClasses} from '~/utils/misc.tsx'
import {ArrowLink} from '../arrow-button.tsx'
import {Grid} from '../grid.tsx'
import {ArrowIcon} from '../icons.tsx'
import {H2, H3, Paragraph} from '../typography.tsx'

function Tab({isSelected, children}: TabProps & {isSelected?: boolean}) {
  return (
    <ReachTab
      className={clsx(
        'hover:text-primary inline-flex w-full items-center border-none p-0 transition focus:bg-transparent',
        {
          'text-primary': isSelected,
          'text-gray-600 dark:text-slate-500': !isSelected,
        },
      )}
    >
      <span>{children}</span>
      <AnimatePresence>
        {isSelected ? (
          <motion.span
            className="ml-8 mt-4 hidden h-12 items-center lg:flex"
            initial={{x: -20, opacity: 0}}
            animate={{x: 0, opacity: 1, transition: {duration: 0.15}}}
            exit={{x: 20, opacity: 0, transition: {duration: 0.15}}}
          >
            <ArrowIcon size={76} direction="right" />
          </motion.span>
        ) : null}
      </AnimatePresence>
    </ReachTab>
  )
}

function ContentPanel({
  children,
  active,
  imageBuilder,
}: {
  children: React.ReactNode | React.ReactNode[]
  active: boolean
  imageBuilder: ImageBuilder
}) {
  return (
    <TabPanel className="col-start-1 row-start-1 block">
      <AnimatePresence>
        {active ? (
          <>
            <motion.img
              initial={{x: -40, opacity: 0}}
              animate={{x: 0, opacity: 1}}
              exit={{x: 40, opacity: 0}}
              transition={{damping: 0, duration: 0.25}}
              {...getImgProps(imageBuilder, {
                className: 'mb-6 h-44 lg:mb-14',
                widths: [180, 360, 540],
                sizes: ['11rem'],
              })}
            />

            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.25}}
            >
              {children}
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </TabPanel>
  )
}

function ProblemSolutionSection({
  blogPostCount,
  totalBlogReaders,
  totalBlogReads,
  currentBlogLeaderTeam,
}: {
  blogPostCount: string
  totalBlogReaders: string
  totalBlogReads: string
  currentBlogLeaderTeam: Team | undefined
}) {
  const [activeTabIndex, setActiveTabIndex] = React.useState(0)

  return (
    <Tabs as={Grid} featured onChange={index => setActiveTabIndex(index)}>
      <div className="col-span-full lg:col-span-5">
        <H2 className="mb-4 lg:mb-0">
          身為軟體工程師的你，感覺職涯遇到了瓶頸嗎?
        </H2>
      </div>
      <div className="col-span-full lg:col-span-5 lg:col-start-7">
        <H2 variant="secondary" as="p">
          {`
            透過收錄在這個網站上的豐富文章內容，我們致力於提供專業的職涯建議、技能技巧分享，幫助你克服職涯上的各種瓶頸，實現更好的自我。
          `}
        </H2>
      </div>

      <hr className="col-span-full mb-10 mt-16 border-gray-200 dark:border-gray-600 lg:mb-20 lg:mt-24" />

      <div className="order-1 col-span-full col-start-1 lg:order-3 lg:col-span-5 lg:mt-52 lg:pt-2">
        <TabList className="inline-flex flex-row space-x-8 bg-transparent text-xl leading-snug text-white lg:flex-col lg:space-x-0 lg:text-7xl">
          <Tab>部落格</Tab>
          <Tab>個人教練</Tab>
          <Tab>團體教練</Tab>
        </TabList>
      </div>

      <TabPanels className="order-4 col-span-full mt-16 grid lg:col-span-5 lg:col-start-7 lg:mt-0">
        <ContentPanel active={activeTabIndex === 0} imageBuilder={images.skis}>
          <H3>豐富的部落格</H3>

          <Paragraph className="mt-8">
            {`目前網站有 `}
            <strong>{blogPostCount}</strong>
            {` 篇文章。總共被${totalBlogReaders}人閱讀了`}
            {`${totalBlogReads}次。 你會在部落格找到關於`}
            <Link prefetch="intent" to="/blog?q=職涯發展">
              職涯發展
            </Link>
            {`、`}
            <Link prefetch="intent" to="/blog?q=網站架設">
              網站架設
            </Link>
            {`、`}
            <Link prefetch="intent" to="/blog?q=團隊合作">
              團隊合作
            </Link>
            {`、`}
            <Link prefetch="intent" to="/blog?q=軟體開發">
              軟體開發
            </Link>
            {`、`}
            <Link prefetch="intent" to="/blog?q=Frontend">
              Frontend
            </Link>
            {`、`}
            <Link prefetch="intent" to="/blog?q=Backend">
              Backend
            </Link>
            {`、`}
            <Link prefetch="intent" to="/blog?q=DevOps">
              DevOps
            </Link>
            {` 與`}
            <Link prefetch="intent" to="/blog">
              更多文章
            </Link>
            。
          </Paragraph>

          <ArrowLink to="/blog" className="mt-14">
            開始閱讀
          </ArrowLink>
        </ContentPanel>

        <ContentPanel
          active={activeTabIndex === 1}
          imageBuilder={images.onewheel}
        >
          <H3>團體教練</H3>

          <Paragraph className="mt-8">
            {`
              過去 ${differenceInYears(
                Date.now(),
                new Date(2021, 0, 0),
              )} 年，我每週六都會花兩小時帶一些初學者，當軟體教練或導師。
              內容如下：
            `}
            <ul>
              <li>與每位學員討論技能樹，持續培養及訓練下一階段的能力</li>
              <li>討論合適的 Side Project 主題</li>
              <li>討論職涯發展、面試</li>
              <li>討論軟體開發工程實踐</li>
            </ul>
          </Paragraph>

          <ArrowLink to="https://www.instagram.com/koshuang/" className="mt-14">
            請至 IG 私訊，有提供免費兩次諮詢喔
          </ArrowLink>
        </ContentPanel>

        <ContentPanel active={activeTabIndex === 2} imageBuilder={images.kayak}>
          <H3>個人教練</H3>

          <Paragraph className="mt-8">
            {`
              過去 ${differenceInYears(
                Date.now(),
                new Date(2021, 0, 0),
              )} 年，我每週六都會花兩小時帶一些初學者，當軟體教練或導師。
              內容如下：
            `}
            <ul>
              <li>與每位學員討論技能樹，持續培養及訓練下一階段的能力</li>
              <li>討論合適的 Side Project 主題並共同開發</li>
              <li>引導團隊成員互相分享工作遇到的各種難題，並互相切磋想法</li>
              <li>討論職涯發展、面試</li>
              <li>討論軟體開發工程實踐</li>
            </ul>
          </Paragraph>

          <ArrowLink to="https://www.instagram.com/koshuang/" className="mt-14">
            請至 IG 私訊，有提供免費兩次諮詢喔
          </ArrowLink>
        </ContentPanel>
      </TabPanels>
    </Tabs>
  )
}

export {ProblemSolutionSection}
