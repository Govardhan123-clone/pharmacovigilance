"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const QuestionDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [question, setQuestion] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [likes, setLikes] = useState<number>(0);
  const [dislikes, setDislikes] = useState<number>(0);

  useEffect(() => {
    if (id) {
      // Fetch question details
      fetch(`/api/questions/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setQuestion(data);
          setLikes(data.likes || 0);
          setDislikes(data.dislikes || 0);
        });

      // Fetch comments
      fetch(`/api/comments/${id}`)
        .then((res) => res.json())
        .then((data) => setComments(data));
    }
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const response = await fetch(`/api/comments/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newComment }),
    });

    if (response.ok) {
      const addedComment = await response.json();
      setComments((prev) => [...prev, addedComment]);
      setNewComment("");
    }
  };

  const handleLike = async () => {
    const response = await fetch(`/api/questions/${id}/like`, { method: "POST" });
    if (response.ok) setLikes((prev) => prev + 1);
  };

  const handleDislike = async () => {
    const response = await fetch(`/api/questions/${id}/dislike`, { method: "POST" });
    if (response.ok) setDislikes((prev) => prev + 1);
  };

  if (!question) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      {/* Question Section */}
      <div style={styles.questionSection}>
        <h1 style={styles.questionTitle}>{question.title}</h1>
        <p style={styles.questionDescription}>{question.description}</p>
        <div style={styles.reactions}>
          <button onClick={handleLike} style={styles.likeButton}>👍 {likes}</button>
          <button onClick={handleDislike} style={styles.dislikeButton}>👎 {dislikes}</button>
        </div>
      </div>

      {/* Comments Section */}
      <div style={styles.commentsSection}>
        <h2>Comments</h2>
        <div style={styles.commentList}>
          {comments.map((comment) => (
            <div key={comment.id} style={styles.comment}>
              <p>
                <strong>{comment.author || "Anonymous"}</strong>: {comment.content}
              </p>
            </div>
          ))}
        </div>
        <div style={styles.addComment}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            style={styles.textArea}
          />
          <button onClick={handleAddComment} style={styles.addCommentButton}>Add Comment</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: "800px", margin: "0 auto", padding: "20px" },
  questionSection: { marginBottom: "30px" },
  questionTitle: { fontSize: "24px", fontWeight: "bold" },
  questionDescription: { fontSize: "16px", margin: "10px 0" },
  reactions: { display: "flex", gap: "10px", marginTop: "10px" },
  likeButton: { padding: "5px 10px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "5px" },
  dislikeButton: { padding: "5px 10px", backgroundColor: "#dc3545", color: "#fff", border: "none", borderRadius: "5px" },
  commentsSection: { marginTop: "20px" },
  commentList: { marginBottom: "20px" },
  comment: { marginBottom: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" },
  addComment: { display: "flex", flexDirection: "column", gap: "10px" },
  textArea: { width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" },
  addCommentButton: { padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px" },
};

export default QuestionDetail;
