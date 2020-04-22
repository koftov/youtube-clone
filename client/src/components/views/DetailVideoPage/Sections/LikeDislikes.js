import React, { useEffect, useState } from 'react';
import { Tooltip, Icon } from 'antd';
import axios from 'axios';

function LikeDislikes(props) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [likeAction, setLikeAction] = useState(null);
  const [dislikeAction, setDislikeAction] = useState(null);
  let variable = {};

  if (props.video) {
    variable = { videoId: props.videoId, userId: props.userId };
  } else {
    variable = { commentId: props.commentId, userId: props.userId };
  }

  useEffect(() => {
    axios.post('/api/like/getLikes', variable).then((res) => {
      if (res.data.success) {
        //How many likes does this video or comment have
        setLikes(res.data.likes.length);

        //if I already click this like button or not
        res.data.likes.map((like) => {
          if (like.userId === props.userId) {
            setLikeAction('liked');
          }
        });
      } else {
        alert('Failed to get likes');
      }
    });

    axios.post('/api/like/getDislikes', variable).then((res) => {
      if (res.data.success) {
        //How many likes does this video or comment have
        setDislikes(res.data.dislikes.length);

        //if I already click this like button or not
        res.data.dislikes.map((dislike) => {
          if (dislike.userId === props.userId) {
            setDislikeAction('disliked');
          }
        });
      } else {
        alert('Failed to get dislikes');
      }
    });
  }, []);

  const onLike = () => {
    if (likeAction === null) {
      axios.post('/api/like/upLike', variable).then((res) => {
        if (res.data.success) {
          setLikes(likes + 1);
          setLikeAction('liked');

          //If dislike button is already clicked

          if (dislikeAction !== null) {
            setDislikeAction(null);
            setDislikes(dislikes - 1);
          }
        } else {
          alert('Failed to increase the like');
        }
      });
    } else {
      axios.post('/api/like/unLike', variable).then((res) => {
        if (res.data.success) {
          setLikes(likes - 1);
          setLikeAction(null);
        } else {
          alert('Failed to decrease the like');
        }
      });
    }
  };

  const onDisLike = () => {
    if (dislikeAction !== null) {
      axios.post('/api/like/unDisLike', variable).then((res) => {
        if (res.data.success) {
          setDislikes(dislikes - 1);
          setDislikeAction(null);
        } else {
          alert('Failed to decrease dislike');
        }
      });
    } else {
      axios.post('/api/like/upDisLike', variable).then((res) => {
        if (res.data.success) {
          setDislikes(dislikes + 1);
          setDislikeAction('disliked');

          //If dislike button is already clicked
          if (likeAction !== null) {
            setLikeAction(null);
            setLikes(likes - 1);
          }
        } else {
          alert('Failed to increase dislike');
        }
      });
    }
  };

  return (
    <React.Fragment>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={likeAction === 'liked' ? 'filled' : 'outlined'}
            onClick={onLike}
          />
        </Tooltip>
        <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{likes}</span>
      </span>
      &nbsp;&nbsp;
      <span key="comment-basic-dislike">
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={dislikeAction === 'disliked' ? 'filled' : 'outlined'}
            onClick={onDisLike}
          />
        </Tooltip>
        <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{dislikes}</span>
      </span>
    </React.Fragment>
  );
}

export default LikeDislikes;
