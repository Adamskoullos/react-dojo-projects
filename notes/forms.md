## Forms

- [Creating controlled Components](#Creating-controlled-Components)
- [Binding multiple form controls to Component State](#Binding-multiple-form-controls-to-Component-State)
- [Submitting Form Data](#Submitting-Form-Data)
- [Updating form State from code](#Updating-form-State-from-code)
- [Using a textarea](#Using-a-textarea)
- [Using a select](#Using-a-select)
- [Using a checkbox](#Using-a-checkbox)
- [Grouping checkboxes together](#Grouping-checkboxes-together)
- [Using radio buttons](#Using-radio-buttons)
- [Loading data into a form](#Loading-data-into-a-form)

---

### Creating controlled Components

```js
const Form = () => {
  const [firstName, setFirstName] = useState("");

  const onChangeHandler = (e) => {
    setFirstName(e.target.value);
  };

  return (
    <form>
      <label htmlFor="firstName">First Name</label>
      <input id="firstName" onChange={onChangeHandler} value={firstName} />
    </form>
  );
};
```

---

### Binding multiple form controls to Component State

1. Create a `formState` object so we can just use one instance of `useState` and one `onChangeHandler`
2. Add the `name` prop to inputs with the same name as the state property it is to update
3. Use the `name` value within the `onFormChangeHandler` function to update the state property

The `onFormChangeHandler` first spreads the existing `formState` object in, this creates a new object. Then `[e.target.name]` is used to replace /override the existing property which is updated with the value of `e.target.value`:

```js
const Form = () => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
  });

  const onFormChangeHandler = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        onChange={onFormChangeHandler}
        value={formState.firstName}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        onChange={onFormChangeHandler}
        value={formState.lastName}
      />
    </form>
  );
};
```

---

### Submitting Form Data

1. Add `submit` button to form
2. Add `onSubmit` event handler to `form` element
3. Within the `onSubmitHandler` function prevent the default

```js
const Form = () => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
  });

  const onFormChangeHandler = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // code to submit for data
  };

  return (
    <form onSubmit="onSubmitHandler">
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        onChange={onFormChangeHandler}
        value={formState.firstName}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        onChange={onFormChangeHandler}
        value={formState.lastName}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
```

---

### Updating form State from code

1. Save the `formState` initial state to a const `initialState` so we can reuse it
2. Use `initialState` to set the initial value of `useState`
3. use `setFormState(initialState)` when we want to reset the form after submission

```js
// Outside Form component scope
const initialState = {
    firstName: "",
    lastName: "",
}

const Form = () => {
  const [formState, setFormState] = useState(initialState);

  const onFormChangeHandler = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // code to submit for data
    // >>>>>>>>>>>>>>>>>>>>>>>>
    // After submission reset the form
    setFormState(initialState);
  };

```

**Side Note**: `<button type="button></button>"` can be placed within the `form` and will not submit the form on click as it is type `button` and not type `submit`. If no type is specified a button will default to type `submit` > It is always good to explicitly set the type on buttons.

---

### Using a textarea

```js
const initialState = {
  firstName: "",
  lastName: "",
  biography: "",
};

const Form = () => {
  const [formState, setFormState] = useState(initialState);

  const onFormChangeHandler = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // code to submit for data
    // >>>>>>>>>>>>>>>>>>>>>>>>
    // After submission reset the form
    setFormState(initialState);
  };

  return (
    <form onSubmit="onSubmitHandler">
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        onChange={onFormChangeHandler}
        value={formState.firstName}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        onChange={onFormChangeHandler}
        value={formState.lastName}
      />
      <label htmlFor="biography">Biography</label>
      <textarea
        id="biography"
        name="biography"
        rows="10"
        onChange={onFormChangeHandler}
        value={formState.biography}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
```

---

### Using a select

```js
const initialState = {
  firstName: "",
  lastName: "",
  biography: "",
  transport: "",
};

const Form = () => {
  const [formState, setFormState] = useState(initialState);

  const onFormChangeHandler = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // code to submit for data
    // >>>>>>>>>>>>>>>>>>>>>>>>
    // After submission reset the form
    setFormState(initialState);
  };

  return (
    <form onSubmit="onSubmitHandler">
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        onChange={onFormChangeHandler}
        value={formState.firstName}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        onChange={onFormChangeHandler}
        value={formState.lastName}
      />
      <label htmlFor="biography">Biography</label>
      <textarea
        id="biography"
        name="biography"
        rows="10"
        onChange={onFormChangeHandler}
        value={formState.biography}
      />
      <label htmlFor="transport">Transport</label>
      <select
        id="transport"
        name="transport"
        onChange={onFormChangeHandler}
        value={formState.transport}
      >
        <option>None Selected</option>
        <option value="plane">Plane</option>
        <option value="boat">Boat</option>
        <option value="train">Train</option>
        <option value="car">Car</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};
```

---

### Using a checkbox

Using a `checkbox` we need to alter a few areas as we bind to the `checked` prop instead of the `value` prop:

1. Add the boolean prop `hasReadConditions` to `initialState`
2. Create the label and input with type `checkbox` and instead of binding the value to `formState.hasReadConditions` we bind `checked={hasReadConditions}` instead
3. Now we need to refactor the `onFormChangeHandler` to accommodate the value to be taken from either `checked` or `value`

```js
const initialState = {
  firstName: "",
  lastName: "",
  biography: "",
  transport: "",
  hasReadConditions: false,
};

const Form = () => {
  const [formState, setFormState] = useState(initialState);

  const onFormChangeHandler = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormState({
      ...formState,
      [e.target.name]: value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // code to submit for data
    // >>>>>>>>>>>>>>>>>>>>>>>>
    // After submission reset the form
    setFormState(initialState);
  };

  return (
    <form onSubmit="onSubmitHandler">
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        onChange={onFormChangeHandler}
        value={formState.firstName}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        onChange={onFormChangeHandler}
        value={formState.lastName}
      />
      <label htmlFor="biography">Biography</label>
      <textarea
        id="biography"
        name="biography"
        rows="10"
        onChange={onFormChangeHandler}
        value={formState.biography}
      />
      <label htmlFor="transport">Transport</label>
      <select
        id="transport"
        name="transport"
        onChange={onFormChangeHandler}
        value={formState.transport}
      >
        <option>None Selected</option>
        <option value="plane">Plane</option>
        <option value="boat">Boat</option>
        <option value="train">Train</option>
        <option value="car">Car</option>
      </select>
      <label htmlFor="hasReadConditions">
        I have read the terms and conditions
      </label>
      <input
        type="checkbox"
        id="hasReadConditions"
        name="hasReadConditions"
        onChange={onFormChangeHandler}
        checked={formState.hasReadConditions}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
```

---

### Grouping checkboxes together

```js
const initialState = {
  firstName: "",
  lastName: "",
  biography: "",
  transport: "",
  hasReadConditions: false,
  breakfast: false,
  lunch: false,
  dinner: false,
};

// code omitted for focus

<fieldset>
  <legend>Select you meals</legend>
  <input
    type="checkbox"
    id="breakfast"
    name="breakfast"
    onChange={onFormChangeHandler}
    checked={formState.breakfast}
  />
  <label htmlFor="breakfast">Breakfast</label>
  <input
    type="checkbox"
    id="lunch"
    name="lunch"
    onChange={onFormChangeHandler}
    checked={formState.lunch}
  />
  <label htmlFor="lunch">Lunch</label>
  <input
    type="checkbox"
    id="dinner"
    name="dinner"
    onChange={onFormChangeHandler}
    checked={formState.dinner}
  />
  <label htmlFor="dinner">Dinner</label>
</fieldset>;
```

---

### Using radio buttons

1. Radio inputs have type `radio`
2. The `name` prop is used to group multiple radios and is also used as the formState property flag as normal
3. Radio inputs use the `value` prop as normal inputs
4. The `checked` prop is set using a conditional to match of the current value against each radios value

```js
const initialState = {
  firstName: "",
  lastName: "",
  biography: "",
  transport: "",
  hasReadConditions: false,
  breakfast: false,
  lunch: false,
  dinner: false,
  shirtSize: "",
};

// code omitted for focus

<fieldset>
  <legend>Select your T-shirt size</legend>
  <input
    type="radio"
    id="small"
    name="shirtSize"
    onChange={onFormChangeHandler}
    value="small"
    checked={formState.shirtSize === "small"}
  />
  <label htmlFor="small">Small</label>
  <input
    type="radio"
    id="medium"
    name="shirtSize"
    onChange={onFormChangeHandler}
    value="medium"
    checked={formState.shirtSize === "medium"}
  />
  <label htmlFor="medium">Medium</label>
  <input
    type="radio"
    id="large"
    name="shirtSize"
    onChange={onFormChangeHandler}
    value="large"
    checked={formState.shirtSize === "large"}
  />
  <label htmlFor="large">Large</label>
</fieldset>;
```

---

### Loading data into a form
