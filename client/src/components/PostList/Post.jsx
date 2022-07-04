import React from 'react';

const PostHeader = ({
  postInfo: { title, nickname, publishedDate, numOfComments, like },
}) => {
  const getMonthAndDate = () => {
    const dateFormat = new Date(publishedDate);
    const month = (dateFormat.getMonth() + 1).toString().padStart(2, '0');
    const date = dateFormat.getDate().toString().padStart(2, '0');
    return `${month}-${date}`;
  };
  return (
    <div className="header">
      <h3 className="title">{title}</h3>
      <div className="post-info">
        <span className="author">{nickname}</span>
        <span className="date">{getMonthAndDate()}</span>
        <span className="comments">{numOfComments} </span>
        <span className="likes">{like} </span>
      </div>
    </div>
  );
};

const PostBody = ({ content, isMyPost, onDeleteClick, onEditClick }) => {
  return (
    <>
      <div
        className="body"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
      {isMyPost && (
        <div>
          <button onClick={onEditClick}>수정</button>
          <button onClick={onDeleteClick}>삭제</button>
        </div>
      )}
    </>
  );
};

const Post = ({ post, isMyPost, onDeleteClick, onEditClick }) => {
  const postHeader = {
    title: post?.title,
    nickname: post?.author.nickname,
    publishedDate: post?.publishedDate,
    numOfComments: post?.comments.length,
    like: post?.like,
  };
  const postBody = post?.content;

  return (
    <div className="post">
      <PostHeader postInfo={postHeader} />
      <PostBody
        content={postBody}
        isMyPost={isMyPost}
        onDeleteClick={onDeleteClick}
        onEditClick={onEditClick}
      />
    </div>
  );
};

export default Post;
