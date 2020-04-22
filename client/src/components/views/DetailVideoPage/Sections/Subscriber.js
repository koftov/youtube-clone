import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Subscriber(props) {
  const { userTo, userFrom } = props;
  const data = { userTo, userFrom };

  const [subscribeNumber, setSubscribeNumber] = useState(0);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    axios.post('/api/subscribe/subscriberNumder', data).then((res) => {
      if (res.data.success) {
        setSubscribeNumber(res.data.subscribeNumber);
      } else {
        alert('Failed to get subscriber Number');
      }
    });

    axios.post('/api/subscribe/subscribed', data).then((res) => {
      if (res.data.success) {
        setSubscribed(res.data.subscribed);
      } else {
        alert('Failed to get subscriber Number');
      }
    });
  }, []);

  const onClick = () => {
    if (subscribed) {
      axios.post('/api/subscribe/unsubscribe', data).then((res) => {
        if (res.data.success) {
          setSubscribeNumber(subscribeNumber - 1);
          setSubscribed(!subscribed);
        } else {
          alert('Failed to unsubscribe');
        }
      });
    } else {
      axios.post('/api/subscribe/subscribe', data).then((res) => {
        if (res.data.success) {
          setSubscribeNumber(subscribeNumber + 1);
          setSubscribed(!subscribed);
        } else {
          alert('Failed to subscribe');
        }
      });
    }
  };
  return (
    <div>
      <button
        onClick={onClick}
        style={{
          border: 'none',
          backgroundColor: `${subscribed ? '#AAAAAA' : '#CC0000'}`,
          borderRadius: '4px',
          color: 'white',
          padding: '10px 16px',
          fontWeight: 500,
          fontSize: '1rem',
          textTransform: 'uppercase',
        }}
      >
        {subscribeNumber} {subscribed ? 'Subscribed' : 'Subscribe'}
      </button>
    </div>
  );
}

export default Subscriber;
