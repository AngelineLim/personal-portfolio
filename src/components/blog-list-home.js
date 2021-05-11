/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { RiArrowDownLine, RiArrowRightSLine } from "react-icons/ri"

import PostCard from "./post-card"

export default function BlogListHome(props) {
  const data = props.data
  const posts = data.edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <PostCard key={edge.node.id} data={edge.node} />)
  return <PostMaker data={posts} />
}

const PostMaker = ({ data }) => (
  <section className="home-posts">
    <h2>
      Building Products on the <strong>Side</strong>{" "}
      <span className="icon -right">
        <RiArrowDownLine />
      </span>
    </h2>
    <p>Behind the scenes product work I'm building on the side</p>
    <div className="grids col-1 sm-2 lg-3">{data}</div>
//     <Link
//       className="button"
//       to="/product"
//       sx={{
//         variant: "variants.button",
//       }}
//     >
//       See more
//       <span className="icon -right">
//         <RiArrowRightSLine />
//       </span>
//     </Link>
  </section>
)
