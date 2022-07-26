import { createAction, handleActions } from 'redux-actions';
import createRequestThunk, {
  createRequestActionTypes,
} from '@lib/createRequestThunk';
import { getCommentList } from '@lib/api/comment';

const getCommentsActions = createRequestActionTypes('comments/GET_COMMENTS');
const [GET_COMMENTS, GET_COMMENTS_SUCCESS, GET_COMMENTS_FAILURE] =
  getCommentsActions;
const UNLOAD_COMMENTS = 'comments/UNLOAD_COMMENTS';
const UP_REPLY_COUNT = 'comments/UP_REPLY_COUNT';
const DOWN_REPLY_COUNT = 'comments/DOWN_REPLY_COUNT';

export const getComments = createRequestThunk(
  getCommentsActions,
  getCommentList,
);
export const unloadComments = createAction(UNLOAD_COMMENTS);
export const upReplyCount = createAction(
  UP_REPLY_COUNT,
  (commentId) => commentId,
);
export const downReplyCount = createAction(
  DOWN_REPLY_COUNT,
  (commentId) => commentId,
);

const initialState = {
  loadig: false,
  error: false,
  comments: null,
};

const comments = handleActions(
  {
    [UNLOAD_COMMENTS]: (state) => initialState,
    [GET_COMMENTS]: (state) => ({
      ...state,
      loading: true,
      error: false,
    }),
    [GET_COMMENTS_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      loading: false,
      error: false,
      comments: response.data,
    }),
    [GET_COMMENTS_FAILURE]: (state) => ({
      ...state,
      loading: false,
      error: true,
    }),
    [UP_REPLY_COUNT]: (state, { payload: commentId }) => {
      const { comments } = state;
      comments.forEach((comment) => {
        // console.log(commentId, comment._id, commentId === comment._id);
        if (commentId === comment._id) {
          comment.reply += 1;
        }
      });
      // console.log('from Module comments', comments);
      return {
        ...state,
        comments,
      };
    },
    [DOWN_REPLY_COUNT]: (state, { payload: commentId }) => {
      const { comments } = state;
      comments.forEach((comment) => {
        console.log(commentId, comment._id, commentId === comment._id);
        if (commentId === comment._id) {
          comment.reply -= 1;
        }
      });
      console.log('from Module comments', comments);
      return {
        ...state,
        comments,
      };
    },
  },
  initialState,
);

export default comments;
