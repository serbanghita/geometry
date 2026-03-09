# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [1.0.0] - 2025-12-23

### Added
- `Point` class — 2D point with intersection detection for points and rectangles
- `Rectangle` class — axis-aligned rectangle with movement, resize, and AABB collision
- `Circle` class — circle with intersection detection for circles, rectangles, and points
- `distanceBetweenPoints` utility function
- `PointDTO` type for serialization
- `init()` methods on Rectangle and Circle for instance reuse
- Comprehensive unit tests for all primitives (80 tests)
- TypeScript strict mode with declaration output
- ESLint configuration
