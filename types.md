# Basic Typescript types

## Primitives

```typescript
const title: string = 'my title'
const age: number = 20
const exist: boolean = true
```

## Arrays

```typescript
const list: string[] = ['a', 'b', 'c']
const list2: number[] = [1, 2, 3]
const list3: boolean[] = [true, true, false]
```

## Others

```typescript
const something: any = 'ss'
```

## Usage in function

```typescript
const sum = (a: number, b: number) => a + b
```

## Return type

```typescript
const sum = (a: number, b: number): number => a + b
```

## Optional properties

```typescript
const getUserName = (name?: string): string => name
```

## Union types

```typescript
const thing: string | number = 'my title'

const getUserName = (name?: string): string | void => {
  if (name) return name
}
```

## Custom types

```typescript
type user = {
  name: string
  age: number
  developer: boolean
}

const alexis: user = {
  name: 'Alexis',
  age: 20,
  developer: true,
}
```

## Interface for function

```typescript
interface Move {
  (speed: number): number
}
const move: Move = (s: number) => {
  return s
}
```

## Interface for classe

```typescript
interface ClockInterface {
  currentTime: Date
}
class Clock implements ClockInterface {
  currentTime: Date = new Date()
}
```