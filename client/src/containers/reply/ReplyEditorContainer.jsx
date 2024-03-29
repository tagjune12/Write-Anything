import React, { useEffect } from 'react';
import {
  initialize,
  changeReplyField,
  writeNewReply,
  updateReply,
} from '@modules/replies/writeReply';
import { useSelector, useDispatch } from 'react-redux';
import { upReplyCount } from '@modules/comments/comments';
import { checkEditorFilled } from '@lib';

import Button from '@components/common/Button';
import Editor from '@components/common/Editor';
import EditorForm from '@components/common/EditorForm';

const ReplyEditorContainer = ({
  type,
  commentId,
  setWriteReply,
  loadReplies,
}) => {
  const dispatch = useDispatch();

  const { reply, replyId, content, error } = useSelector(
    ({ writeReply }) => writeReply,
  );

  const onChangeField = (key, value) => {
    dispatch(changeReplyField(value));
  };

  const onWriteBtnClick = (event) => {
    event.preventDefault();
    if (checkEditorFilled(content)) {
      alert('내용을 입력해 주세요');
      return;
    }
    if (commentId) {
      dispatch(
        writeNewReply([
          commentId,
          {
            content,
          },
        ]),
      );
      dispatch(upReplyCount(commentId));
    } else {
    }
  };

  const onModifyBtnClick = (event) => {
    event.preventDefault();
    dispatch(
      updateReply([
        replyId,
        {
          content,
        },
      ]),
    );
  };

  const onCancelBtnClick = (event) => {
    event.preventDefault();
    dispatch(changeReplyField(''));
    setWriteReply(false);
  };

  useEffect(() => {
    if (reply) {
      setWriteReply(false);
    } else if (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  });

  useEffect(() => {
    return () => {
      dispatch(initialize());
      loadReplies();
    };
  }, []);

  return (
    <>
      <EditorForm className="write-form reply-editor">
        <Editor
          content={content}
          onChangeField={onChangeField}
          result={reply}
          type="modify"
        />
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
    </>
  );
};

export default ReplyEditorContainer;
