import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";
import axios from "axios";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import useUser from "../hooks/useUser";

const ArticlePage = () => {
    const [articlesInfo, setArticlesInfo] = useState({
        upvotes: 0,
        comments: [],
    });
    const articleId = useParams().article;
    const { user, isLoading } = useUser();
    console.log("user" + JSON.stringify(user));
    useEffect(() => {
        const loadArticleInfo = async () => {
            const response = await axios.get(`/api/articles/${articleId}`);
            const newArticleInfo = response.data;
            setArticlesInfo(newArticleInfo);
        };
        loadArticleInfo();
    }, []);

    const addUpvote = async () => {
        const response = await axios.put(`/api/articles/${articleId}/upvote`);
        const updatedArticleInfo = response.data;
        setArticlesInfo(updatedArticleInfo);
    };

    const article = articles.find((article) => article.name === articleId);
    if (!article) {
        return <NotFoundPage />;
    }
    return (
        <>
            <h1>{article.title}</h1>
            <div className="upvotes-section">
                {user ? (
                    <button onClick={addUpvote}>Upvote</button>
                ) : (
                    <button>Log In to upvote</button>
                )}
                <p>This article has {articlesInfo.upvotes} upvote(s) </p>
            </div>
            {article.content.map((p, i) => (
                <p key={i}>{p}</p>
            ))}
            {user ? (
                <AddCommentForm
                    articleName={articleId}
                    onArticleUpdated={(updatedArticle) =>
                        setArticlesInfo(updatedArticle)
                    }
                />
            ) : (
                <AddCommentForm
                    articleName={articleId}
                    onArticleUpdated={(updatedArticle) =>
                        setArticlesInfo(updatedArticle)
                    }
                />
            )}
            <CommentsList comments={articlesInfo.comments} />
        </>
    );
};

export default ArticlePage;
