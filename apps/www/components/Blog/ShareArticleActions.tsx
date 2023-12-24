import Link from 'next/link'
import { IconLinkedinSolid, IconTwitterX, IconYCombinator } from 'ui'

const ShareArticleActions = ({ title, slug }: { title: string; slug: string }) => (
  <div className="mt-4 flex items-center space-x-4">
    <Link
      aria-label="Share on X"
      href={`https://twitter.com/share?text=${title}&url=https://open-models-platform.com/blog/${slug}`}
      target="_blank"
      className="text-foreground-lighter hover:text-foreground"
    >
      <IconTwitterX size={24} />
    </Link>

    <Link
      aria-label="Share on Linkedin"
      href={`https://www.linkedin.com/shareArticle?url=https://open-models-platform.com/blog/${slug}&title=${title}`}
      target="_blank"
      className="text-foreground-lighter hover:text-foreground"
    >
      <IconLinkedinSolid size={24} />
    </Link>
    <Link
      aria-label="Share on Hacker News"
      href={`https://news.ycombinator.com/submitlink?u=https://open-models-platform.com/blog/${slug}&t=${title}`}
      target="_blank"
      className="text-foreground-lighter hover:text-foreground"
    >
      <IconYCombinator size={24} />
    </Link>
  </div>
)

export default ShareArticleActions
