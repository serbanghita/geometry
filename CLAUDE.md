# Geometry

## Overview

2D geometric primitives (Point, Rectangle, Circle) with intersection detection methods for collision detection in game development.

## Source Structure

| File | Description |
|------|-------------|
| `src/Point.ts` | 2D point with intersection checks against points and rectangles |
| `src/Rectangle.ts` | Axis-aligned rectangle with movement, resize, and AABB collision |
| `src/Circle.ts` | Circle with intersection checks against circles, rectangles, and points |
| `src/utils.ts` | `distanceBetweenPoints` utility function |
| `src/index.ts` | Public API re-exports |

## Key Exports

| Export | Type | Description |
|--------|------|-------------|
| `Point` | Class | `(x, y, id?)` with `intersects`, `intersectsWithRectangle` |
| `Rectangle` | Class | `(width, height, center)` with `intersects`, `moveCenterTo/By`, `resize` |
| `Circle` | Class | `(center, radius)` with `intersects`, `intersectsWithPoint`, `intersectsWithRectangle` |
| `distanceBetweenPoints` | Function | Euclidean distance between two points |
| `PointDTO` | Type | `{ x, y, id }` |

## Dependencies

None (standalone library).

## Development

| Command | What it does |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run test` | Run tests (vitest) |
| `npm run lint` | Lint (eslint) |

## Testing

- Framework: Vitest
- Tests: `src/Point.test.ts`, `src/Rectangle.test.ts`, `src/Circle.test.ts`

## Coding Guidelines

- All geometric primitives use mutable properties for performance in game loops.
- `init()` methods allow instance reuse without allocation.
- Avoid unnecessary comments in code.
