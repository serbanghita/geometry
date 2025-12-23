import { describe, it, expect } from 'vitest';
import { Circle } from './Circle';
import { Point } from './Point';
import { Rectangle } from './Rectangle';

describe('Circle', () => {
  describe('constructor', () => {
    it('should create a circle with center and radius', () => {
      const center = new Point(50, 50);
      const circle = new Circle(center, 25);
      expect(circle.center).toBe(center);
      expect(circle.center.x).toBe(50);
      expect(circle.center.y).toBe(50);
      expect(circle.radius).toBe(25);
    });

    it('should handle zero radius', () => {
      const center = new Point(10, 10);
      const circle = new Circle(center, 0);
      expect(circle.radius).toBe(0);
    });

    it('should handle negative coordinates for center', () => {
      const center = new Point(-20, -30);
      const circle = new Circle(center, 15);
      expect(circle.center.x).toBe(-20);
      expect(circle.center.y).toBe(-30);
      expect(circle.radius).toBe(15);
    });
  });

  describe('init', () => {
    it('should reinitialize circle with new values', () => {
      const center = new Point(50, 50);
      const circle = new Circle(center, 25);

      circle.init(100, 100, 50);

      expect(circle.center.x).toBe(100);
      expect(circle.center.y).toBe(100);
      expect(circle.radius).toBe(50);
    });

    it('should update existing center point reference', () => {
      const center = new Point(50, 50);
      const circle = new Circle(center, 25);
      const originalCenter = circle.center;

      circle.init(100, 100, 50);

      expect(circle.center).toBe(originalCenter);
      expect(originalCenter.x).toBe(100);
      expect(originalCenter.y).toBe(100);
    });
  });

  describe('intersects', () => {
    it('should return true when circles overlap', () => {
      const circle1 = new Circle(new Point(0, 0), 10);
      const circle2 = new Circle(new Point(15, 0), 10);
      expect(circle1.intersects(circle2)).toBe(true);
    });

    it('should return true when circles touch exactly', () => {
      const circle1 = new Circle(new Point(0, 0), 10);
      const circle2 = new Circle(new Point(20, 0), 10);
      expect(circle1.intersects(circle2)).toBe(true);
    });

    it('should return true when one circle is inside another', () => {
      const circle1 = new Circle(new Point(0, 0), 20);
      const circle2 = new Circle(new Point(5, 5), 5);
      expect(circle1.intersects(circle2)).toBe(true);
    });

    it('should return true when circles are at same position', () => {
      const circle1 = new Circle(new Point(50, 50), 10);
      const circle2 = new Circle(new Point(50, 50), 10);
      expect(circle1.intersects(circle2)).toBe(true);
    });

    it('should return false when circles are separated', () => {
      const circle1 = new Circle(new Point(0, 0), 10);
      const circle2 = new Circle(new Point(50, 50), 10);
      expect(circle1.intersects(circle2)).toBe(false);
    });

    it('should work with circles at negative coordinates', () => {
      const circle1 = new Circle(new Point(-10, -10), 5);
      const circle2 = new Circle(new Point(-15, -10), 5);
      expect(circle1.intersects(circle2)).toBe(true);
    });

    it('should return false when circles just miss each other', () => {
      const circle1 = new Circle(new Point(0, 0), 10);
      const circle2 = new Circle(new Point(21, 0), 10);
      expect(circle1.intersects(circle2)).toBe(false);
    });
  });

  describe('intersectsWithPoint', () => {
    it('should return true when point is at center', () => {
      const circle = new Circle(new Point(50, 50), 25);
      const point = new Point(50, 50);
      expect(circle.intersectsWithPoint(point)).toBe(true);
    });

    it('should return true when point is inside circle', () => {
      const circle = new Circle(new Point(50, 50), 25);
      const point = new Point(55, 55);
      expect(circle.intersectsWithPoint(point)).toBe(true);
    });

    it('should return true when point is on the edge', () => {
      const circle = new Circle(new Point(0, 0), 10);
      const point = new Point(10, 0);
      expect(circle.intersectsWithPoint(point)).toBe(true);
    });

    it('should return false when point is outside circle', () => {
      const circle = new Circle(new Point(50, 50), 25);
      const point = new Point(100, 100);
      expect(circle.intersectsWithPoint(point)).toBe(false);
    });

    it('should work with negative coordinates', () => {
      const circle = new Circle(new Point(-50, -50), 25);
      const point = new Point(-55, -55);
      expect(circle.intersectsWithPoint(point)).toBe(true);
    });

    it('should handle point just outside the circle', () => {
      const circle = new Circle(new Point(0, 0), 10);
      const point = new Point(11, 0);
      expect(circle.intersectsWithPoint(point)).toBe(false);
    });
  });

  describe('intersectsWithRectangle', () => {
    it('should return true when circle contains rectangle', () => {
      const circle = new Circle(new Point(50, 50), 50);
      const rectangle = new Rectangle(20, 20, new Point(50, 50));
      expect(circle.intersectsWithRectangle(rectangle)).toBe(true);
    });

    it('should return true when rectangle contains circle', () => {
      const circle = new Circle(new Point(50, 50), 10);
      const rectangle = new Rectangle(100, 100, new Point(50, 50));
      expect(circle.intersectsWithRectangle(rectangle)).toBe(true);
    });

    it('should return true when circle and rectangle overlap', () => {
      const circle = new Circle(new Point(50, 50), 25);
      const rectangle = new Rectangle(40, 40, new Point(60, 60));
      expect(circle.intersectsWithRectangle(rectangle)).toBe(true);
    });

    it('should return true when circle touches rectangle edge', () => {
      const circle = new Circle(new Point(50, 25), 10);
      const rectangle = new Rectangle(40, 40, new Point(50, 50));
      expect(circle.intersectsWithRectangle(rectangle)).toBe(true);
    });

    it('should return false when circle and rectangle are separated', () => {
      const circle = new Circle(new Point(0, 0), 10);
      const rectangle = new Rectangle(20, 20, new Point(100, 100));
      expect(circle.intersectsWithRectangle(rectangle)).toBe(false);
    });

    it('should work with negative coordinates', () => {
      const circle = new Circle(new Point(-50, -50), 25);
      const rectangle = new Rectangle(40, 40, new Point(-50, -50));
      expect(circle.intersectsWithRectangle(rectangle)).toBe(true);
    });

    it('should return true when circle center is inside rectangle', () => {
      const circle = new Circle(new Point(50, 50), 5);
      const rectangle = new Rectangle(100, 100, new Point(50, 50));
      expect(circle.intersectsWithRectangle(rectangle)).toBe(true);
    });

    it('should return false when circle does not reach rectangle corner', () => {
      const circle = new Circle(new Point(0, 0), 10);
      const rectangle = new Rectangle(20, 20, new Point(20, 20));
      // Distance from (0,0) to nearest corner (10,10) is ~14.14, circle radius is 10
      expect(circle.intersectsWithRectangle(rectangle)).toBe(false);
    });

    it('should return true when circle actually touches rectangle corner', () => {
      const circle = new Circle(new Point(0, 0), 15);
      const rectangle = new Rectangle(20, 20, new Point(20, 20));
      // Distance from (0,0) to nearest corner (10,10) is ~14.14, circle radius is 15
      expect(circle.intersectsWithRectangle(rectangle)).toBe(true);
    });
  });
});
