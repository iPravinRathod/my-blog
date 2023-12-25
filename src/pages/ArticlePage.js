import React from 'react'
import { useParams } from 'react-router-dom'
import articles from './article-content';
import NotFoundPage from './NotFoundPage'

const ArticlePage = () => {
    const articleId = useParams().article
    console.log(articleId);
    const article = articles.find(article => article.name === articleId)
    if (!article) {
        return <NotFoundPage />
    }
    return (
        <>
            <h1>{article.title}</h1>
            {article.content.map((p, i) => (
                <p key={i}>{p}</p>
            ))}
        </>
    )
}

export default ArticlePage