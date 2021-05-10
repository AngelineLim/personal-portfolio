const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const productList = graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            frontmatter {
              slug
              template
              title
            }
          }
        }
      }
    }
  `).then(result => {
    const posts = result.data.allMarkdownRemark.edges
    let productPostsCount = 0
  
    posts.forEach(({post, index}) => {
      const id = post.node.id
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.frontmatter.slug,
        component: path.resolve('./src/templates/product-list.js'),
        context: {
          id,
          previous,
          next,
        },
      });

      if (post.node.frontmatter.template === "blog-product") {
        productPostsCount++
      }
    });
  
    const productsPerPage = 9
    const numProducts = Math.ceil(productPostsCount / productsPerPage)
    // Create product-list pages
    Array.from({ length: numProducts }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/product` : `/product/${i + 1}`,
        component: blogList,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })
  })

    const blogList = graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            frontmatter {
              slug
              template
              title
            }
          }
        }
      }
    }
  `).then(result => {
    const posts = result.data.allMarkdownRemark.edges
    let blogPostsCount = 0

    posts.forEach(({post, index}) => {
      const id = post.node.id
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: node.childMarkdownRemark.fields.slug,
        component: path.resolve('./src/templates/blog-list.js'),
        // additional data can be passed via context
        context: {
          id,
          previous,
          next,
        },
      })

      if (post.node.frontmatter.template === "blog-post") {
        blogPostsCount++
      }
    })
  
    // Create blog-list pages
    const postsPerPage = 9
    const numPages = Math.ceil(blogPostsCount / postsPerPage)
  
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/book` : `/book/${i + 1}`,
        component: blogList,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })

    return Promise.all([productList, blogList])
  })
};


//   // Handle errors
//   if (result.errors) {
//     reporter.panicOnBuild(`Error while running GraphQL query.`)
//     return
//   }

//   // Create markdown pages
//   const posts = result.data.allMarkdownRemark.edges
//   let blogPostsCount = 0
//   let productPostsCount = 0

//   posts.forEach((post, index) => {
//     const id = post.node.id
//     const previous = index === posts.length - 1 ? null : posts[index + 1].node
//     const next = index === 0 ? null : posts[index - 1].node

//     createPage({
//       path: post.node.frontmatter.slug,
//       component: path.resolve(
//         `src/templates/${String(post.node.frontmatter.template)}.js`
//       ),
//       // additional data can be passed via context
//       context: {
//         id,
//         previous,
//         next,
//       },
//     })

//     // Count blog posts and product posts
//     if (post.node.frontmatter.template === "blog-post") {
//       blogPostsCount++
//     }
//     if (post.node.frontmatter.template === "blog-product") {
//       productPostsCount++
//     }
//   })

//   // Create blog-list pages
//   const postsPerPage = 9
//   const numPages = Math.ceil(blogPostsCount / postsPerPage)

//   Array.from({ length: numPages }).forEach((_, i) => {
//     createPage({
//       path: i === 0 ? `/book` : `/book/${i + 1}`,
//       component: blogList,
//       context: {
//         limit: postsPerPage,
//         skip: i * postsPerPage,
//         numPages,
//         currentPage: i + 1,
//       },
//     })
//   })

//   const productsPerPage = 9
//   const numProducts = Math.ceil(productPostsCount / productsPerPage)
//   // Create product-list pages
//   Array.from({ length: numProducts }).forEach((_, i) => {
//     createPage({
//       path: i === 0 ? `/product` : `/product/${i + 1}`,
//       component: blogList,
//       context: {
//         limit: postsPerPage,
//         skip: i * postsPerPage,
//         numPages,
//         currentPage: i + 1,
//       },
//     })
//   })
// }

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
