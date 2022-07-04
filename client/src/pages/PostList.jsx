import '@styles/postlist.scss';
import PostItem from '@components/PostList/PostItem';
import * as postAPI from '@lib/api/post';
import { useEffect, useState, useRef } from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [postList, setPostList] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const lastPage = useRef();

  useEffect(() => {
    postAPI.getPostList(curPage).then((response) => {
      lastPage.current = parseInt(response.headers['last-page']);
      setPostList(response.data);
    });
  }, [curPage]);
  const onPageChange = (event) => {
    setCurPage(parseInt(event.target.innerText));
  };
  return (
    <div className="post-wrapper">
      <div>
        <Outlet />
        <div className="post-item-wrapper">
          {/* <div className="post-list-head">
            <div className="like">
              <span>추천</span>
            </div>
            <div className="category">
              <span>카테고리</span>
            </div>
            <div className="title">
              <span>제목</span>
            </div>
            <div className="author">
              <span>작성자</span>
            </div>
            <div className="date">
              <span>작성일</span>
            </div>
          </div> */}
          {postList?.map((post, index) => (
            <PostItem key={post._id} post={post} postIndex={index} />
          ))}
        </div>
        <div className="pagination">
          <button
            className="prev"
            onClick={() => {
              setCurPage((prev) => (prev === 1 ? prev : prev - 1));
            }}
          >
            prev
          </button>
          <div className="page-list">
            {Array.from(Array(lastPage.current), (_, index) => (
              <button key={index + 1} onClick={onPageChange}>
                {index + 1}
              </button>
            ))}
          </div>
          <button
            className="next"
            onClick={() => {
              setCurPage((prev) =>
                prev === lastPage.current ? prev : prev + 1,
              );
            }}
          >
            next
          </button>
        </div>
        <div className="test">
          <Link to="/write">
            <button className="post-write">글쓰기</button>
          </Link>
        </div>
        {/* <Link to="/write">
          <button className="post-write">글쓰기</button>
        </Link> */}
      </div>
    </div>
  );
};

export default PostList;
