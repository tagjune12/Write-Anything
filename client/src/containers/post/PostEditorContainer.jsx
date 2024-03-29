import React, { useEffect, useState, useCallback } from 'react';
import {
  changeField,
  updatePost,
  writeNewPost,
  initialize,
} from '@modules/posts/writepost';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { checkEditorFilled } from '@lib';
import pages from '@assets/data/page.json';

import Editor from '@components/common/Editor';
import EditorForm from '@components/common/EditorForm';
import Button from '@components/common/Button';
import TitleInput from '@components/post/TitleInput';

const PostEditorContainer = ({ type }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const { post, category, title, content, error } = useSelector(
    ({ writePost }) => writePost,
  );

  const [categoryInputData, setCategoryInputData] = useState(category);
  const [titleInputData, setTitleInputData] = useState(title);

  const onChangeField = useCallback(
    (key, value) => {
      dispatch(changeField(key, value));
    },
    [dispatch],
  );
  const onWriteBtnClick = (event) => {
    event.preventDefault();
    if (checkEditorFilled(titleInputData)) {
      alert('제목을 입력해 주세요');
      return;
    }
    if (checkEditorFilled(content)) {
      alert('내용을 입력해 주세요');
      return;
    }
    dispatch(
      writeNewPost({
        title: titleInputData,
        category: categoryInputData,
        content,
      }),
    );
  };

  const onModifyBtnClick = (event) => {
    event.preventDefault();
    dispatch(
      updatePost([
        params.id,
        {
          title: titleInputData,
          category: categoryInputData,
          content,
        },
      ]),
    );
  };

  const onCancelBtnClick = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  useEffect(() => {
    if (post) {
      const category = post.category;
      navigate(`/${category}/${post._id}`);
    } else if (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  });

  useEffect(() => {
    window.scrollTo({
      top: 300,
      left: 0,
      behavior: 'auto',
    });
    return () => {
      dispatch(initialize());
    };
  }, []);

  return (
    <EditorForm className="write-form post-editor">
      <TitleInput
        title={titleInputData}
        categories={pages}
        setCategory={setCategoryInputData}
        setTitle={setTitleInputData}
      />
      <Editor content={content} onChangeField={onChangeField} type={type} />
      <div className="editor-btn-wrapper">
        {type === 'modify' ? (
          <Button onClick={onModifyBtnClick}>수정 완료</Button>
        ) : (
          <Button onClick={onWriteBtnClick}>작성</Button>
        )}
        <Button className="cancel-btn" onClick={onCancelBtnClick}>
          취소
        </Button>
      </div>
    </EditorForm>
  );
};

export default PostEditorContainer;
