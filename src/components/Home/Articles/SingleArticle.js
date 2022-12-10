import React from 'react'
import './SingleArticle.css'

function SingleArticle({ article }) {

  const go = (url) => {
    window.open(url, "_blank")
  }


  return (
    <div onClick={() =>
      go(article.url)
    } style={{ backgroundImage: `url(${article.bgImage}` }} className="single-article-card">
      <h2>{article.title}</h2>
    </div>
  )
}

export default SingleArticle