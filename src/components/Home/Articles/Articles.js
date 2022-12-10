import React from 'react'
import SingleArticle from './SingleArticle'
import './Articles.css'

function Articles() {

  const articles = [
    {
      title: 'PAIR IT WITH FOOD',
      bgImage: 'https://assets3.cbsnewsstatic.com/hub/i/r/2019/05/01/3bb8956c-30ee-43ee-9854-e6d33a0a87b3/thumbnail/620x620/b70d47cf0305604cf750b5c2a1c2ed60/tabascogreen.jpg',
      url: 'https://www.cbsnews.com/pictures/hot-sauces-ranked-by-heat/9/'
    },
    {
      title: 'TOP 10 BEST HOT SAUCES',
      bgImage: 'https://assets.bonappetit.com/photos/62c7312635be74f5d8d6e2e1/master/pass/0722_FavHotsauces_4.jpg',
      url: 'https://www.bonappetit.com/story/best-hot-sauces'
    },
    {
      title: 'RANKED BY SCOVILLE SCALE',
      bgImage: 'https://cdn.shopify.com/s/files/1/0915/1060/files/Scoville-Heat-Scalev2_1_1024x1024.jpg?v=1607014566',
      url: 'https://www.tastingtable.com/880991/best-grocery-store-hot-sauce-brands-ranked/'
    },

  ]


  return (
    <div className='container articles-container'>
      {articles.map((article, i) => {
        return <SingleArticle key={i} article={article} />
      })}
    </div>
  )
}

export default Articles