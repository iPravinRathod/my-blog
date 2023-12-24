import React from 'react'
import articles from '../article-content'

const ArticlesListPage = () => {
    return (
        <>
            <h1>Articles</h1>
            {articles.map(article => (
                <div>
                    <h3>{article.title}</h3>
                    {article.content[0].substring(0, 150)}
                </div>
            ))}
        </>
    )
}

export default ArticlesListPage