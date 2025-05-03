- `useLocalSearchParams` - get url param for current component
- custom navigator goes into `_layout.tsx`

- `adb shell "cmd uimode night yes"` - switch dark/light mode (or change phone itself)

## implementing dark mode:
- in app.json - `"userInterfaceStyle": "automatic"`, app will now switch automatically to dark/light mode
(as per device theme).
- wrap root layout in `<ThmeProvider> </ThmeProvider>` for system wide theme info, now whole app can react
to theme changes.
```typescript
const colorScheme = useColorScheme();

<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
</ThemeProvider>
```
- `useColorScheme` in any file to know the current theme (whether dark or light theme).
- now, based upon the theme you can conditionally assign CSS.
- or, **create custom componets (using native componets) which changes colors automatically**.

## custom themed components:
- `ComponentProps<typeof Text>` is same as `Text["props"]`
- `keyof` crates a union type of all keys of an object (or interface).
```typescript
const Person = {
  name: "John",
  age: 30,
  address: "123 Main St"
};

type PersonKeys = keyof typeof Person;
// "name" | "age" | "address"
```
- we can access obj properties like this also: `obj[key]` (or obj.key)

##
- css for spacing b/w letters: `letterSpacing`
- `StyleSheet.hairlineWidth` - minimum possible visible width

## Flatlist
- content is rendered asynchronously offscreen. It's possible to scroll faster than the fill rate and momentarily see blank content.

- by default, Flatlist will **not** re-render on state change.
- use `extraData` prop to achieve the same.

- if there's a `key` prop in each item, it'll be used as React key.
- or provide a custom `keyExtractor` prop.

## Shallow v/s Deep
- shallow comparison: just compare their references (memory location)
```typescript
// e.g
const obj1 = {a: 1, b: 2};
const obj2 = obj1;

obj1.a = 9

obj1 === obj2; // true, since same memory location, & change in one reflects in another.
```
- deep comparison: checking manually each & every key (nested keys included)
```typescript
// only works if all the keys are in same order.
JSON.stringify(obj1) === JSON.stringify(obj2);

// Recommended way:
// Recursively check each key.
```
##
- `useHeaderHeight()` : get the header height.

## state of an application:
- `useState` -> for managing the state limited to a component only.
- `context` -> to avoid passing state of a parent to nested child components (prop-drilling), we use context.
  - it's inefficient, because when data changes, all the components accessing it re-render.
  - we can use `context` where the data doesn't change often, e.g toggle theme (from light to dark).
- `global state management libs` -> when the data changes often. Efficient at managing data globally.

## Zustand basics
```typescript
type State = {
  count: number;
};

type Actions = {
  resetCount: () => void;
  increaseCount: () => void;
}

const useStore = create<State & Actions>()((set) => {
  return {
    count: 33,
    resetCount: () => {
      set({ count: 0 });
    },
    increaseCount: () => {
      set((state) => ({ count: state.count + 1 }));
    },
  };
});

// access items of store...
const count = useStore(state => state.count);
const resetCount = useStore(state => state.resetCount);
const increaseCount = useStore(state => state.increaseCount);
```
## zustand techniques: reduce re-renders
- if a component is subscribed to a value, when that value change, the whole component (+ child components, if any) will re-render,
- if possible, we can create another component, which will be subscribed to that value only. This way, we can reduce re-renders:
```typescript
// when `count` change, this component will re-render along with Name component
const HomeScreen = () => {
  const increaseCount = useStore((state) => state.increaseCount);
  console.log("HomeScreen re-render");

  return (
    <View style={{ gap: 10 }}>
      <Text>{count}</Text>

      <Name />

      <CustomButton title="Increase" onPress={() => increaseCount()} />
    </View>
  );
}
```
```typescript
// now, when value change, it'll only re-render the CounterDisplay component

const CounterDisplay = () => {
  const count = useStore((state) => state.count);
  console.log("Counter re-render");

  return <Text style={{ fontSize: 50 }}>{count}</Text>;
};

const HomeScreen = () => {
  const increaseCount = useStore((state) => state.increaseCount);
  console.log("HomeScreen re-render");

  return (
    <View style={{ gap: 10 }}>
      <CounterDisplay />

      <Name />

      <CustomButton title="Increase" onPress={() => increaseCount()} />
    </View>
  );
}
```
- another way to reduce re-render, a component should be the subscribed to the values it needs (& not the whole store)
```typescript
// only when name changes, it will re-render

const Name = () => {
  const name = useStore((state) => state.name);
  console.log("Name re-render");
  return <Text>{name}</Text>;
};
```
```typescript
// anything in store changes, it'll re-render

const Name = () => {
  const state = useStore();
  console.log("Name re-render");
  return <Text>{state.name}</Text>;
};
```
## typescript: Pick
- opposite of `Omit`
```typescript
type abc = {
  a: string;
  b: number;
  c: number[]
}

type onlyNumberArray = Pick<abc, 'c'>
```
