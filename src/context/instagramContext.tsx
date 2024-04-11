import React, { useReducer } from 'react';
import axios from 'axios';
import { Isentiment, paginate } from '../utils/pagination.utils';
import { useAuth } from './authContext';

const PAGE_SIZE = 10;

const ACTIONS = {
  STORE_MEDIA: 'STORE_MEDIA',
  RESET_STORE_MEDIA: 'RESET_STORE_MEDIA',
  STORE_STORIES: 'STORE_STORIES',
  STORE_MEDIA_COMMENTS: 'STORE_MEDIA_COMMENTS',
  STORE_POST_ANALYZED: 'STORE_POST_ANALYZED',
  SET_POST_TYPE: 'SET_POST_TYPE',
  UPDATE_LOADING: 'UPDATE_LOADING',
  SET_COMMENTS_POST_ANALYZED: 'SET_COMMENTS_POST_ANALYZED',
  UPDATE_REPLIES_COMMENT_POST_ANALYZED: 'UPDATE_REPLIES_COMMENT_POST_ANALYZED',
  DELETE_REPLY_COMMENT_POST_ANALYZED: 'DELETE_REPLY_COMMENT_POST_ANALYZED',
  DELETE_COMMENT_POST_ANALYZED: 'DELETE_COMMENT_POST_ANALYZED',
  RESET_STATE: 'RESET_STATE',
  SET_ERROR_TYPE_ACCOUNT: 'SET_ERROR_TYPE_ACCOUNT',
  UPDATE_LOADING_REPLIES: 'UPDATE_LOADING_REPLIES',
  SET_ALEATORY_COMMENTS: 'SET_ALEATORY_COMMENTS',
};

export type IReply = {
  from: {
    id: string;
    username: string;
  };
  timestamp: string;
  text: string;
  id: string;
  like_count: number;
};

export type IComment = {
  from: {
    id: string;
    username: string;
  };
  timestamp: string;
  id: string;
  text: string;
  like_count: number;
  comments_count: number;
  replies?: IReply[];
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type IAnalyze = {};

export type IMediaPost = {
  id: string;
  comments_count: number;
  like_count: number;
  timestamp: string;
  media_type: string;
  media_url: string;
  comments?: IComment[];
  username: string;
};

export type ICursorPostAnalyzedComments = {
  pageSize: number;
  pageNumber: number;
};

export type IMediaPostAnalyzedComments = {
  data: IComment[];
  cursor: ICursorPostAnalyzedComments;
};

export type IMediaPostAnalyzed = {
  id: string;
  postID: string;
  userID: string;
  positive: Isentiment[];
  neutral: Isentiment[];
  negative: Isentiment[];
  totalToken: number;
  lastCommentID: string;
  commentsPostive?: IMediaPostAnalyzedComments;
  commentsNeutral?: IMediaPostAnalyzedComments;
  commentsNegative?: IMediaPostAnalyzedComments;
  createdAt?: string;
  updatedAt?: string;
};

export type ICursorInstagram = {
  after?: string;
  before: string;
};

export type IMedia = {
  data: IMediaPost[];
  cursors: ICursorInstagram;
};

export type IMediaPostsAnalyzed = {
  data: IMediaPostAnalyzed[];
};

export type InstagramContextState = {
  media: IMedia;
  stories: IMedia;
  type?: string;
  loading: boolean;
  loadingReplies: boolean;
  mediaPostsAnalyzed: IMediaPostsAnalyzed;
  storiesPostsAnalyzed: IMediaPostsAnalyzed;
  errorTypeAccount: boolean;
  aleatoryComments: IComment[];
};

export type Action = {
  type: string;
  payload: any;
};

const initialState: InstagramContextState = {
  media: {
    data: [],
    cursors: {
      after: '',
      before: '',
    },
  },
  stories: {
    data: [],
    cursors: {
      after: '',
      before: '',
    },
  },
  mediaPostsAnalyzed: {
    data: [],
  },
  storiesPostsAnalyzed: {
    data: [],
  },
  type: 'media',
  loading: false,
  loadingReplies: false,
  errorTypeAccount: false,
  aleatoryComments: [],
};

const actions = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  storeMedia: (_: IMedia) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  getStories: (_: string, __: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  deleteComment: (_: string, __: string, ___: string, ____: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  updateLoading: (_: boolean) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setPostType: (_: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  getMedia: (_: string, __: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  analizeComments: (_: string, __: string, ___: any) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  getComments: (_: string, __: (res: boolean) => void) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  connectInstagram: (_: string, __: string, ___: any) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  getCommentsPostAnalyzed: (_: IMediaPostAnalyzed, __: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  getPostAnalyzed: (_: string, __: any) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  createReply: (_: string, __: string, ___: string, ____: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  resetState: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  getReplies: (_: string, __: string, ___: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  getAleatoryComments: (_: Isentiment[]) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  resetAleatoryComment: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  resetMedia: () => {},
};

export const InstagramContext = React.createContext({ ...initialState, ...actions });

const instagramReducer = (state: InstagramContextState, action: Action): InstagramContextState => {
  switch (action.type) {
    case ACTIONS.STORE_MEDIA: {
      if (state.media.data && state.media.data.length > 0) {
        const exist = action.payload.data.find((item: IMediaPost) => item.id === state.media.data[0].id);
        if (exist) {
          return state;
        }
      }

      if (action.payload.data)
        return {
          ...state,
          media: {
            data: [...state.media.data, ...action.payload.data],
            cursors: action.payload.cursors,
          },
        };
    }
    // eslint-disable-next-line no-fallthrough
    case ACTIONS.RESET_STORE_MEDIA: {
      return {
        ...state,
        media: {
          data: [],
          cursors: {
            after: '',
            before: '',
          },
        },
      };
    }
    case ACTIONS.STORE_STORIES: {
      if (state.stories.data && state.stories.data.length > 0) {
        const exist = action.payload.data.find((item: IMediaPost) => item.id === state.stories.data[0].id);
        if (exist) {
          return state;
        }
      }

      if (action.payload.data)
        return {
          ...state,
          stories: {
            data: [...state.stories.data, ...action.payload.data],
            cursors: action.payload.cursors,
          },
        };
    }
    // eslint-disable-next-line no-fallthrough
    case ACTIONS.STORE_POST_ANALYZED: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const exist = state[action.payload.typePost].data.find(
        (post: IMediaPostAnalyzed) => action.payload.post.postID === post.postID,
      );
      return {
        ...state,
        [action.payload.typePost]: {
          data: !exist
            ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              [...state[action.payload.typePost].data, action.payload.post]
            : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              state[action.payload.typePost].data.map((post: IMediaPostAnalyzed) =>
                post.postID === action.payload.post.postID ? action.payload.post : post,
              ),
        },
      };
    }
    case ACTIONS.UPDATE_LOADING: {
      return { ...state, loading: action.payload };
    }
    case ACTIONS.SET_ALEATORY_COMMENTS: {
      return { ...state, aleatoryComments: action.payload };
    }
    case ACTIONS.UPDATE_LOADING_REPLIES: {
      return { ...state, loadingReplies: action.payload };
    }
    case ACTIONS.SET_ERROR_TYPE_ACCOUNT: {
      return { ...state, errorTypeAccount: action.payload };
    }
    case ACTIONS.STORE_MEDIA_COMMENTS: {
      return {
        ...state,
        media: {
          data: state.media.data.map((post: IMediaPost) =>
            post.id === action.payload.postId ? { ...post, comments: action.payload.comments } : post,
          ),
          cursors: state.media.cursors,
        },
      };
    }
    case ACTIONS.SET_COMMENTS_POST_ANALYZED: {
      return {
        ...state,
        mediaPostsAnalyzed: {
          data: state.mediaPostsAnalyzed.data.map((post: IMediaPostAnalyzed) =>
            post.postID === action.payload.postId
              ? {
                  ...post,
                  [action.payload.type]: {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    data: post[action.payload.type]?.data
                      ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        [...post[action.payload.type].data, ...action.payload.comments]
                      : action.payload.comments,
                    cursor: {
                      pageNumber: action.payload.nextPageNumber,
                      pageSize: PAGE_SIZE,
                    },
                  },
                }
              : post,
          ),
        },
      };
    }
    case ACTIONS.UPDATE_REPLIES_COMMENT_POST_ANALYZED: {
      return {
        ...state,
        mediaPostsAnalyzed: {
          data: state.mediaPostsAnalyzed.data.map((post: IMediaPostAnalyzed) =>
            post.postID === action.payload.postId
              ? {
                  ...post,
                  [action.payload.type]: {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    data: post[action.payload.type]?.data.map((comment: IComment) =>
                      comment.id === action.payload.commentID
                        ? {
                            ...comment,
                            replies: action.payload.replies,
                          }
                        : comment,
                    ),
                    cursor: {
                      pageNumber: action.payload.nextPageNumber,
                      pageSize: PAGE_SIZE,
                    },
                  },
                }
              : post,
          ),
        },
      };
    }
    case ACTIONS.DELETE_REPLY_COMMENT_POST_ANALYZED: {
      return {
        ...state,
        mediaPostsAnalyzed: {
          data: state.mediaPostsAnalyzed.data.map((post: IMediaPostAnalyzed) =>
            post.postID === action.payload.postID
              ? {
                  ...post,
                  [action.payload.type]: {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    data: post[action.payload.type]?.data.map((comment: IComment) =>
                      comment.id === action.payload.commentID
                        ? {
                            ...comment,
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            replies: comment?.replies.filter((reply: IReply) => reply.id !== action.payload.replyID),
                          }
                        : comment,
                    ),
                    cursor: {
                      pageNumber: action.payload.nextPageNumber,
                      pageSize: PAGE_SIZE,
                    },
                  },
                }
              : post,
          ),
        },
      };
    }
    // eslint-disable-next-line no-duplicate-case
    case ACTIONS.DELETE_REPLY_COMMENT_POST_ANALYZED: {
      return {
        ...state,
        mediaPostsAnalyzed: {
          data: state.mediaPostsAnalyzed.data.map((post: IMediaPostAnalyzed) =>
            post.postID === action.payload.postID
              ? {
                  ...post,
                  [action.payload.type]: {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    data: post[action.payload.type]?.data.filter(
                      (comment: IComment) => comment.id !== action.payload.commentID,
                    ),
                    cursor: {
                      pageNumber: action.payload.nextPageNumber,
                      pageSize: PAGE_SIZE,
                    },
                  },
                }
              : post,
          ),
        },
      };
    }
    case ACTIONS.SET_POST_TYPE: {
      return { ...state, type: action.payload };
    }
    case ACTIONS.RESET_STATE: {
      return initialState;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const InstagramProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(instagramReducer, initialState);
  const { token } = useAuth();

  // eslint-disable-next-line @typescript-eslint/ban-types
  const storeMedia = (value: {}) => {
    dispatch({
      type: ACTIONS.STORE_MEDIA,
      payload: value,
    });
  };

  const resetMedia = () => {
    dispatch({
      type: ACTIONS.RESET_STORE_MEDIA,
      payload: undefined,
    });
  };

  // eslint-disable-next-line @typescript-eslint/ban-types
  const storeStories = (value: {}) => {
    dispatch({
      type: ACTIONS.STORE_STORIES,
      payload: value,
    });
  };

  const setErrorTypeAcctount = (value: boolean) => {
    dispatch({
      type: ACTIONS.SET_ERROR_TYPE_ACCOUNT,
      payload: value,
    });
  };

  const storeMediaComments = (comments: IComment[], postId: string) => {
    dispatch({
      type: ACTIONS.STORE_MEDIA_COMMENTS,
      payload: { comments, postId },
    });
  };

  const storePostAnalized = (post: IMediaPostAnalyzed, typePost: string) => {
    dispatch({
      type: ACTIONS.STORE_POST_ANALYZED,
      payload: { post, typePost },
    });
  };

  const setPostTypeAction = (value: string) => {
    dispatch({
      type: ACTIONS.SET_POST_TYPE,
      payload: value,
    });
  };

  const updateLoading = (value: boolean) => {
    dispatch({
      type: ACTIONS.UPDATE_LOADING,
      payload: value,
    });
  };

  const updateLoadingReplies = (value: boolean) => {
    dispatch({
      type: ACTIONS.UPDATE_LOADING_REPLIES,
      payload: value,
    });
  };

  const storeMediaCommentsAnalized = (comments: IComment[], type: string, postId: string, nextPageNumber: number) => {
    dispatch({
      type: ACTIONS.SET_COMMENTS_POST_ANALYZED,
      payload: { comments, type, postId, nextPageNumber },
    });
  };

  const resetState = () => {
    dispatch({
      type: ACTIONS.RESET_STATE,
      payload: null,
    });
  };

  const updateMediaRepliesCommentsAnalized = (commentID: string, replies: IReply[], postId: string, type: string) => {
    dispatch({
      type: ACTIONS.UPDATE_REPLIES_COMMENT_POST_ANALYZED,
      payload: { commentID, replies, postId, type },
    });
  };

  const setAleatoryComments = (comments: IComment[]) => {
    dispatch({
      type: ACTIONS.SET_ALEATORY_COMMENTS,
      payload: comments,
    });
  };

  const resetAleatoryComment = () => {
    dispatch({
      type: ACTIONS.SET_ALEATORY_COMMENTS,
      payload: [],
    });
  };

  const deleteMediaReplyCommentAnalyzed = (postID: string, type: string, commentID: string, replyID: string) => {
    dispatch({
      type: ACTIONS.DELETE_REPLY_COMMENT_POST_ANALYZED,
      payload: { postID, type, commentID, replyID },
    });
  };

  const deleteMediaCommentAnalyzed = (postID: string, type: string, commentID: string) => {
    dispatch({
      type: ACTIONS.DELETE_COMMENT_POST_ANALYZED,
      payload: { postID, type, commentID },
    });
  };

  const getMedia = async (tokenValue: string, after?: string) => {
    try {
      updateLoading(true);
      const request = await axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: tokenValue,
        },
        data: { after },
        url: `${process.env.NEXT_PUBLIC_API_URL}/v1/instagram/media`,
      });
      updateLoading(false);
      if (request.data.ok) {
        const { data, paging } = request.data.response.media;
        const cursors = paging?.next
          ? paging.cursors
          : {
              after: '',
              before: paging.cursors?.before,
            };
        storeMedia({
          data,
          cursors,
        });
      }
    } catch (error) {
      updateLoading(false);
    }
  };

  const getStories = async (tokenValue: string, after?: string) => {
    try {
      updateLoading(true);
      const request = await axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: tokenValue,
        },
        data: { after },
        url: `${process.env.NEXT_PUBLIC_API_URL}/v1/instagram/stories`,
      });
      updateLoading(false);
      if (request.data.ok) {
        const { data, paging } = request.data.response.stories;
        const cursors = paging?.next
          ? paging.cursors
          : {
              after: '',
              before: paging.cursors?.before,
            };
        storeStories({
          data,
          cursors,
        });
      }
    } catch (error) {
      updateLoading(false);
    }
  };

  const connectInstagram = async (accessToken: string, tokenValue: string, updateAccountConnected: any) => {
    updateLoading(true);
    try {
      const request = await axios({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: tokenValue,
        },
        url: `${process.env.NEXT_PUBLIC_API_URL}/v1/instagram/connect/${accessToken}`,
      });
      if (request.data.ok) {
        updateAccountConnected(request.data.response);
      } else {
        setErrorTypeAcctount(true);
      }
      updateLoading(false);
    } catch (error) {
      updateLoading(false);
    }
  };

  const getComments = async (idPost: string, setLoading: (res: boolean) => void) => {
    try {
      setLoading(true);
      const request = await axios({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        url: `${process.env.NEXT_PUBLIC_API_URL}/v1/instagram/comments/${idPost}`,
      });
      switch (state.type) {
        case 'media':
          storeMediaComments(request.data.response?.comments?.data, idPost);
          break;
        default:
          break;
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const setPostType = async (type: string) => setPostTypeAction(type);

  const analizeComments = async (postID: string, type: string, callBack: any) => {
    try {
      updateLoading(true);
      const request = await axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        data: {
          id: postID,
          type,
        },
        url: `${process.env.NEXT_PUBLIC_API_URL}/v1/instagram/comments/analyze`,
      });
      // eslint-disable-next-line no-console
      console.log('request ', request);
      updateLoading(false);

      if (!request.data?.ok) {
        // const code = request.data?.response?.code ? request.data?.response?.code : request.data?.response?.msg;
        // Alert.alert(t(code));
        return;
      }

      // Alert.alert(request.data?.response?.msg);
      callBack();
      switch (state.type) {
        case 'media':
          // eslint-disable-next-line consistent-return
          return storePostAnalized(request.data.response?.post, 'mediaPostsAnalyzed');
        case 'stories':
          // eslint-disable-next-line consistent-return
          return storePostAnalized(request.data.response?.post, 'storiesPostsAnalyzed');
        default:
          break;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error ', error);
      // Alert.alert(t('errorAnalyzeCommentsCatch'));
      updateLoading(false);
    }
  };

  // eslint-disable-next-line consistent-return
  const getPostAnalyzed = async (postID: string, callBack: any) => {
    try {
      updateLoading(true);
      const request = await axios({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        url: `${process.env.NEXT_PUBLIC_API_URL}/v1/instagram/posts/${postID}`,
      });
      updateLoading(false);
      if (request.data.response?.post) {
        switch (state.type) {
          case 'media':
            return storePostAnalized(request.data.response?.post, 'mediaPostsAnalyzed');
          default:
            break;
        }
      } else {
        callBack();
      }
    } catch (error) {
      updateLoading(false);
      // eslint-disable-next-line no-console
      console.log('error ', error);
    }
  };

  const getCommentsPostAnalyzed = async (post: IMediaPostAnalyzed, type: string) => {
    try {
      updateLoading(true);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const pageNumber = post[type]?.cursor?.pageNumber ? post[type]?.cursor?.pageNumber : 1;
      let comments;

      switch (type) {
        case 'commentsPostive':
          comments = paginate(post.positive, pageNumber, PAGE_SIZE);
          break;
        case 'commentsNeutral':
          comments = paginate(post.neutral, pageNumber, PAGE_SIZE);
          break;
        case 'commentsNegative':
          comments = paginate(post.negative, pageNumber, PAGE_SIZE);
          break;
        default:
          break;
      }

      const request = await axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        data: {
          comments: comments?.items,
          postID: post.postID,
          type,
        },
        url: `${process.env.NEXT_PUBLIC_API_URL}/v1/instagram/comments`,
      });

      if (request.data.response?.needUpdatePost) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        getPostAnalyzed(post.postID, () => {});
      }

      switch (state.type) {
        case 'media':
          storeMediaCommentsAnalized(request.data.response?.comments, type, post.postID, comments?.nextPage || 0);
          break;
        default:
          break;
      }
      updateLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error ', error);
      updateLoading(false);
    }
  };

  const createReply = async (commentID: string, message: string, postID: string, type: string) => {
    try {
      updateLoading(true);
      const request = await axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        data: {
          commentID,
          message,
        },
        url: `${process.env.NEXT_PUBLIC_API_URL}/v1/instagram/comments/reply`,
      });

      if (!request.data?.ok) {
        updateLoading(false);
        // Alert.alert(t('errorReply'));
        return;
      }

      if (request.data.response?.replies) {
        switch (state.type) {
          case 'media':
            // eslint-disable-next-line no-case-declarations
            const replies = request.data.response?.replies.data || [];
            updateMediaRepliesCommentsAnalized(commentID, replies, postID, type);
            break;
          default:
            break;
        }
      }

      updateLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error ', error);
      updateLoading(false);
    }
  };

  const deleteComment = async (postID: string, type: string, commentID: string, replyID: string) => {
    try {
      updateLoading(true);
      const id = replyID || commentID;
      const request = await axios({
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        url: `${process.env.NEXT_PUBLIC_API_URL}/v1/instagram/comment/${id}`,
      });
      // eslint-disable-next-line no-console
      console.log('request ', request);
      if (request.status !== 200 || !request.data.ok) {
        // Alert.alert(t('errorDeleteComment'));
      } else if (replyID) {
        deleteMediaReplyCommentAnalyzed(postID, type, commentID, replyID);
      } else {
        deleteMediaCommentAnalyzed(postID, type, commentID);
      }
      updateLoading(false);
    } catch (error) {
      updateLoading(false);
    }
  };

  const getReplies = async (commentID: string, postID: string, type: string) => {
    try {
      updateLoadingReplies(true);
      const request = await axios({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        url: `${process.env.NEXT_PUBLIC_API_URL}/v1/instagram/comments/replies/${commentID}`,
      });

      // if (!request.data?.ok) {
      //   updateLoadingReplies(false);
      //   Alert.alert(t('errorReply'));
      //   return;
      // }

      if (request.data.response) {
        const replies = request.data.response || [];
        updateMediaRepliesCommentsAnalized(commentID, replies, postID, type);
      }

      updateLoadingReplies(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error ', error);
      updateLoadingReplies(false);
    }
  };

  const getAleatoryComments = async (comments: Isentiment[]) => {
    try {
      updateLoading(true);
      const request = await axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        data: {
          comments,
        },
        url: `${process.env.NEXT_PUBLIC_API_URL}/v1/instagram/comments/aleatory`,
      });

      if (request.data.response) {
        const response = request.data.response.comments || [];
        setAleatoryComments(response);
      }

      updateLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error ', error);
      updateLoading(false);
    }
  };

  return (
    <InstagramContext.Provider
      value={{
        ...state,
        analizeComments,
        storeMedia,
        getMedia,
        connectInstagram,
        getComments,
        setPostType,
        updateLoading,
        getCommentsPostAnalyzed,
        getPostAnalyzed,
        createReply,
        getStories,
        deleteComment,
        resetState,
        getReplies,
        getAleatoryComments,
        resetAleatoryComment,
        resetMedia,
      }}
    >
      {children}
    </InstagramContext.Provider>
  );
};

export default InstagramProvider;
