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
        canUpvote: false,
    });
    const { canUpvote } = articlesInfo;
    const articleId = useParams().article;
    const { user, isLoading } = useUser();

    useEffect(() => {
        const loadArticleInfo = async () => {
            const token = user && (await user.getIdToken());
            const headers = token ? { authtoken: token } : {};
            const response = await axios.get(`/api/articles/${articleId}`, {
                headers,
            });
            const newArticleInfo = response.data;
            setArticlesInfo(newArticleInfo);
        };

        if (isLoading) {
            loadArticleInfo();
        }
    }, [isLoading, user]);

    const addUpvote = async () => {
        const token = user && (await user.getIdToken());
        const headers = token ? { authtoken: token } : {};
        const response = await axios.put(`/api/articles/${articleId}/upvote`, {
            headers,
        });
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
                    <button onClick={addUpvote}>
                        {canUpvote ? "Upvote" : "Already Upvoted"}
                    </button>
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
                <button>Log in to add a comment</button>
            )}
            <CommentsList comments={articlesInfo.comments} />
        </>
    );
};

export default ArticlePage;
