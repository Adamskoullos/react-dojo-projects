## React / TS - Hook Typing Patterns

- [useSate](#useState)
- [useRef](#useRef)
- [Custom Hooks](#Custom-Hooks)
- [useMemo](#useMemo)

---

## useSate

```ts
// Initial empty array  but able to accept an array of numbers
const [arr, setArr] = useState<number[]>([]);

// Initial value of null but can be either a string or null
const [text, setText] = useState<string | null>(null);

// Initial empty array but able to take an array of specific interface or type
const [arr, setArr] = useState<ISomeInterface[]>([]);
```

---

## useRef

```ts
const inputRef = useRef<HTMLInputElement | null>(null);
```

---

## Custom Hooks

The below example presents the basic structure of a generic typed custom hook which also creates a computed property with useMemo:

`hooks/useFetch.ts`

```tsx
import { useState, useEffect, useMemo } from "react";

function useFetch<Payload>(url: string): {
  data: Payload | null;
  done: boolean;
} {
  const [data, setData] = useState<Payload | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((d: Payload) => {
        setData(d);
        setDone(true);
      });
  }, [url]);

  return { data, done };
}
```

Then within the component we import and use the the custom hook we also either create or import an interface and then pass the interface in to replace the generic when we call the custom hook:

```tsx
interface IProduct{
    name: string;
    type: string;
}

function SomeComponent(){

    const { data, done } = useFetch<IProduct[]>('some-url');
    const snowboards = useMemo(() => {
        return data?.filter((product) => product.type === 'snowboards');
    }, [data]);
    return (
        // TSX
    )
}
```
