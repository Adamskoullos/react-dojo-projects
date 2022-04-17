## Custom Hooks

- [Encapsulating State Logic](#Encapsulating-State-Logic)
- [Building a network request hook](#Building-a-network-request-hook)
- [Creating a usePersistStorage hook](#Creating-a-usePersistStorage-hook)
- [useScrollToBottom](#useScrollToBottom)

---

### Encapsulating State Logic

Below is a core pattern used when creating custom hooks:

1. Create local state using `useState`
2. Make calls to get data with `useEffect`
3. Assign data to state and return state

```js
import React, { useState, useEffect } from "react";
import useFetch from "./useFetch"; // another custom hook

const usePicture = (date, url) => {
  const [state, setState] = useState();

  useEffect(() => {
    // Make some call to get some data
    // set data to state
  }, [date]);

  return state;
};
```

Then within components we can import `usePicture` and use it:

```js
const picture = usePicture(date, url);
```

---

### Building a network request hook

```js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetch = ({url}) => {
    const [state, setState] = useState({data: null, loading: true, error: null});

    useEffect(() => {
        const getData = async () => {
            try{
                const res = await axios.get(url);
                if(res.data){
                    setSate({data: res.data, loading: false}, error: null);
                }
            } catch(e){
                setSate({data: null, loading: false, error: e.message});
            }
        }
        getData();
    }, [url]);

    return state;
}
```

Then within components and hooks...in this instance another hook:

```js
import { useFetch } from './useFetch';

export const usePicture = (date) => {
    const {data, loading, error} = usefetch({
        url: 'some-url'
    }));

    return {picture: data, loading, error};
}
```

---

### Creating a useStorage hook

```js
import React, { useState, useEffect } from "react";

export const useStorage = (key, initialValue) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    let existingState = localStorage.getItem(key);
    if (existingState) {
      setState(JSON.parse(existingState));
    }
  }, [key]);

  return [
    state,
    (state) => {
      setState(state);
      localStorage.setItem(key, JSON.stringify(state));
    },
  ];
};
```

Then within components:

```js
import { useStorage } from "./useStorage";

// within component function
const [user, setUser] = useStorage("user", user);
```

### useScrollToBottom

```js
import { useEffect, useRef } from "react";

export const useScrollToBottom = (messages) => {
  let scrollContainer = useRef();

  useEffect(() => {
    if (!scrollContainer?.current) return;

    scrollContainer.current.scrollTo(0, scrollContainer.current.scrollHeight);
  }, [messages]);

  return scrollContainer;
};
```

Within component function:

```js
const scrollRef = useScrollToBottom(messages);

// within jsx
<div style={styles.container} ref={(ref) => (scrollRef.current = ref)}>
```
