import { useRouter } from "next/router"
import CommentInfos from "../../src/components/body/CommentInfos"
import Layout from "../../src/components/Layout"

const CommentPage = () => {
  const {
    query: { commentId },
  } = useRouter()

  return (
    <Layout pagename={`Comment: ${commentId}`}>
      <CommentInfos commentId={commentId} />
    </Layout>
  )
}

CommentPage.private = true

export default CommentPage
