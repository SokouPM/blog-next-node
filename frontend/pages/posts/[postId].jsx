import { useRouter } from "next/router"
import PostInfo from "../../src/components/body/PostInfos"
import Layout from "../../src/components/Layout"

const PostPage = () => {
  const {
    query: { postId },
  } = useRouter()

  return (
    <Layout pagename={`Post: ${postId}`}>
      <PostInfo postId={postId} />
    </Layout>
  )
}

PostPage.private = true

export default PostPage
