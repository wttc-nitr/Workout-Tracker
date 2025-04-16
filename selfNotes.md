- `useLocalSearchParams` - get url param for current component
- custom navigator goes into `_layout.tsx`

- `adb shell "cmd uimode night yes"` - switch dark/light mode (or change phone itself)

## implementing dark mode:
- in app.json - `"userInterfaceStyle": "automatic"`, app will now switch automatically to dark/light mode
(as per device theme).
- wrap root layout in `<ThmeProvider> </ThmeProvider>` for system wide theme info, now whole app can react
to theme changes.
```
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
```
const Person = {
  name: "John",
  age: 30,
  address: "123 Main St"
};

type PersonKeys = keyof typeof Person;
// "name" | "age" | "address"
```
- we can access obj properties like this also: `obj[key]` (or obj.key)
