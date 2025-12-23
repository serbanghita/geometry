import { describe, it, expect } from 'vitest';
import { Point } from './Point';
import { Rectangle } from './Rectangle';

describe('Point', () => {
  describe('constructor', () => {
    it('should create a point with x and y coordinates', () => {
      const point = new Point(10, 20);
      expect(point.x).toBe(10);
      expect(point.y).toBe(20);
      expect(point.id).toBeUndefined();
    });

    it('should create a point with optional id', () => {
      const point = new Point(10, 20, 'point-1');
      expect(point.x).toBe(10);
      expect(point.y).toBe(20);
      expect(point.id).toBe('point-1');
    });

    it('should handle negative coordinates', () => {
      const point = new Point(-5, -10);
      expect(point.x).toBe(-5);
      expect(point.y).toBe(-10);
    });

    it('should handle zero coordinates', () => {
      const point = new Point(0, 0);
      expect(point.x).toBe(0);
      expect(point.y).toBe(0);
    });
  });

  describe('intersects', () => {
    it('should return true when points are at the same location', () => {
      const point1 = new Point(10, 20);
      const point2 = new Point(10, 20);
      expect(point1.intersects(point2)).toBe(true);
    });

    it('should return false when points have different x coordinates', () => {
      const point1 = new Point(10, 20);
      const point2 = new Point(15, 20);
      expect(point1.intersects(point2)).toBe(false);
    });

    it('should return false when points have different y coordinates', () => {
      const point1 = new Point(10, 20);
      const point2 = new Point(10, 25);
      expect(point1.intersects(point2)).toBe(false);
    });

    it('should return false when points have different x and y coordinates', () => {
      const point1 = new Point(10, 20);
      const point2 = new Point(15, 25);
      expect(point1.intersects(point2)).toBe(false);
    });

    it('should work with negative coordinates', () => {
      const point1 = new Point(-10, -20);
      const point2 = new Point(-10, -20);
      expect(point1.intersects(point2)).toBe(true);
    });
  });

  describe('intersectsWithRectangle', () => {
    it('should return true when point is at the center of rectangle', () => {
      const point = new Point(50, 50);
      const center = new Point(50, 50);
      const rectangle = new Rectangle(40, 30, center);
      expect(point.intersectsWithRectangle(rectangle)).toBe(true);
    });

    it('should return true when point is inside rectangle', () => {
      const point = new Point(55, 55);
      const center = new Point(50, 50);
      const rectangle = new Rectangle(40, 30, center);
      expect(point.intersectsWithRectangle(rectangle)).toBe(true);
    });

    it('should return true when point is on the edge of rectangle', () => {
      const center = new Point(50, 50);
      const rectangle = new Rectangle(40, 30, center);

      // Top-left corner
      const topLeft = new Point(rectangle.topLeftX, rectangle.topLeftY);
      expect(topLeft.intersectsWithRectangle(rectangle)).toBe(true);

      // Bottom-right corner
      const bottomRight = new Point(rectangle.topRightX, rectangle.bottomLeftY);
      expect(bottomRight.intersectsWithRectangle(rectangle)).toBe(true);
    });

    it('should return false when point is outside rectangle', () => {
      const point = new Point(100, 100);
      const center = new Point(50, 50);
      const rectangle = new Rectangle(40, 30, center);
      expect(point.intersectsWithRectangle(rectangle)).toBe(false);
    });

    it('should return false when point is to the left of rectangle', () => {
      const point = new Point(20, 50);
      const center = new Point(50, 50);
      const rectangle = new Rectangle(40, 30, center);
      expect(point.intersectsWithRectangle(rectangle)).toBe(false);
    });

    it('should return false when point is above rectangle', () => {
      const point = new Point(50, 20);
      const center = new Point(50, 50);
      const rectangle = new Rectangle(40, 30, center);
      expect(point.intersectsWithRectangle(rectangle)).toBe(false);
    });

    it('should work with rectangle at origin', () => {
      const point = new Point(0, 0);
      const center = new Point(0, 0);
      const rectangle = new Rectangle(20, 20, center);
      expect(point.intersectsWithRectangle(rectangle)).toBe(true);
    });

    it('should work with negative coordinates', () => {
      const point = new Point(-50, -50);
      const center = new Point(-50, -50);
      const rectangle = new Rectangle(40, 30, center);
      expect(point.intersectsWithRectangle(rectangle)).toBe(true);
    });
  });
});
