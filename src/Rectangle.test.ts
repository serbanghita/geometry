import { describe, it, expect } from 'vitest';
import { Rectangle } from './Rectangle';
import { Point } from './Point';

describe('Rectangle', () => {
  describe('constructor', () => {
    it('should create a rectangle with width, height, and center', () => {
      const center = new Point(50, 50);
      const rectangle = new Rectangle(40, 30, center);
      expect(rectangle.width).toBe(40);
      expect(rectangle.height).toBe(30);
      expect(rectangle.center).toBe(center);
      expect(rectangle.center.x).toBe(50);
      expect(rectangle.center.y).toBe(50);
    });

    it('should calculate area correctly', () => {
      const center = new Point(0, 0);
      const rectangle = new Rectangle(10, 20, center);
      expect(rectangle.area).toBe(200);
    });

    it('should handle zero dimensions', () => {
      const center = new Point(10, 10);
      const rectangle = new Rectangle(0, 0, center);
      expect(rectangle.width).toBe(0);
      expect(rectangle.height).toBe(0);
      expect(rectangle.area).toBe(0);
    });

    it('should work with negative coordinates for center', () => {
      const center = new Point(-20, -30);
      const rectangle = new Rectangle(40, 30, center);
      expect(rectangle.center.x).toBe(-20);
      expect(rectangle.center.y).toBe(-30);
    });
  });

  describe('init', () => {
    it('should reinitialize rectangle with new values', () => {
      const center = new Point(50, 50);
      const rectangle = new Rectangle(40, 30, center);

      rectangle.init(80, 60, 100, 100);

      expect(rectangle.width).toBe(80);
      expect(rectangle.height).toBe(60);
      expect(rectangle.center.x).toBe(100);
      expect(rectangle.center.y).toBe(100);
      expect(rectangle.area).toBe(4800);
    });

    it('should update area after init', () => {
      const center = new Point(0, 0);
      const rectangle = new Rectangle(10, 10, center);

      rectangle.init(20, 30, 50, 50);

      expect(rectangle.area).toBe(600);
    });
  });

  describe('resize', () => {
    it('should change dimensions and recalculate area', () => {
      const center = new Point(50, 50);
      const rectangle = new Rectangle(40, 30, center);

      rectangle.resize(80, 60);

      expect(rectangle.width).toBe(80);
      expect(rectangle.height).toBe(60);
      expect(rectangle.area).toBe(4800);
    });

    it('should not change center when resizing', () => {
      const center = new Point(50, 50);
      const rectangle = new Rectangle(40, 30, center);

      rectangle.resize(100, 100);

      expect(rectangle.center.x).toBe(50);
      expect(rectangle.center.y).toBe(50);
    });
  });

  describe('moveCenterTo', () => {
    it('should move center to specified coordinates', () => {
      const center = new Point(50, 50);
      const rectangle = new Rectangle(40, 30, center);

      rectangle.moveCenterTo(100, 100);

      expect(rectangle.center.x).toBe(100);
      expect(rectangle.center.y).toBe(100);
    });

    it('should not change dimensions when moving', () => {
      const center = new Point(50, 50);
      const rectangle = new Rectangle(40, 30, center);

      rectangle.moveCenterTo(100, 100);

      expect(rectangle.width).toBe(40);
      expect(rectangle.height).toBe(30);
      expect(rectangle.area).toBe(1200);
    });

    it('should work with negative coordinates', () => {
      const center = new Point(50, 50);
      const rectangle = new Rectangle(40, 30, center);

      rectangle.moveCenterTo(-50, -50);

      expect(rectangle.center.x).toBe(-50);
      expect(rectangle.center.y).toBe(-50);
    });
  });

  describe('moveCenterBy', () => {
    it('should move center by delta values', () => {
      const center = new Point(50, 50);
      const rectangle = new Rectangle(40, 30, center);

      rectangle.moveCenterBy(10, 20);

      expect(rectangle.center.x).toBe(60);
      expect(rectangle.center.y).toBe(70);
    });

    it('should handle negative delta values', () => {
      const center = new Point(50, 50);
      const rectangle = new Rectangle(40, 30, center);

      rectangle.moveCenterBy(-30, -40);

      expect(rectangle.center.x).toBe(20);
      expect(rectangle.center.y).toBe(10);
    });

    it('should allow multiple moves', () => {
      const center = new Point(0, 0);
      const rectangle = new Rectangle(40, 30, center);

      rectangle.moveCenterBy(10, 10);
      rectangle.moveCenterBy(5, 5);

      expect(rectangle.center.x).toBe(15);
      expect(rectangle.center.y).toBe(15);
    });
  });

  describe('corner getters', () => {
    it('should calculate topLeft coordinates correctly', () => {
      const center = new Point(50, 50);
      const rectangle = new Rectangle(40, 30, center);

      expect(rectangle.topLeftX).toBe(30);
      expect(rectangle.topLeftY).toBe(35);
    });

    it('should calculate topRight coordinates correctly', () => {
      const center = new Point(50, 50);
      const rectangle = new Rectangle(40, 30, center);

      expect(rectangle.topRightX).toBe(70);
      expect(rectangle.topRightY).toBe(35);
    });

    it('should calculate bottomLeft coordinates correctly', () => {
      const center = new Point(50, 50);
      const rectangle = new Rectangle(40, 30, center);

      expect(rectangle.bottomLeftX).toBe(30);
      expect(rectangle.bottomLeftY).toBe(65);
    });

    it('should calculate bottomRight coordinates correctly', () => {
      const center = new Point(50, 50);
      const rectangle = new Rectangle(40, 30, center);

      expect(rectangle.bottomRightX).toBe(70);
      expect(rectangle.bottomRightY).toBe(65);
    });

    it('should update corners when center moves', () => {
      const center = new Point(50, 50);
      const rectangle = new Rectangle(40, 30, center);

      rectangle.moveCenterTo(100, 100);

      expect(rectangle.topLeftX).toBe(80);
      expect(rectangle.topLeftY).toBe(85);
      expect(rectangle.bottomRightX).toBe(120);
      expect(rectangle.bottomRightY).toBe(115);
    });

    it('should work with rectangle at origin', () => {
      const center = new Point(0, 0);
      const rectangle = new Rectangle(20, 20, center);

      expect(rectangle.topLeftX).toBe(-10);
      expect(rectangle.topLeftY).toBe(-10);
      expect(rectangle.bottomRightX).toBe(10);
      expect(rectangle.bottomRightY).toBe(10);
    });
  });

  describe('intersects', () => {
    it('should return true when rectangles overlap', () => {
      const rect1 = new Rectangle(40, 40, new Point(50, 50));
      const rect2 = new Rectangle(40, 40, new Point(60, 60));
      expect(rect1.intersects(rect2)).toBe(true);
    });

    it('should return true when one rectangle contains another', () => {
      const rect1 = new Rectangle(100, 100, new Point(50, 50));
      const rect2 = new Rectangle(20, 20, new Point(50, 50));
      expect(rect1.intersects(rect2)).toBe(true);
    });

    it('should return true when rectangles are at same position', () => {
      const rect1 = new Rectangle(40, 30, new Point(50, 50));
      const rect2 = new Rectangle(40, 30, new Point(50, 50));
      expect(rect1.intersects(rect2)).toBe(true);
    });

    it('should return false when rectangles are separated horizontally', () => {
      const rect1 = new Rectangle(20, 20, new Point(10, 10));
      const rect2 = new Rectangle(20, 20, new Point(100, 10));
      expect(rect1.intersects(rect2)).toBe(false);
    });

    it('should return false when rectangles are separated vertically', () => {
      const rect1 = new Rectangle(20, 20, new Point(10, 10));
      const rect2 = new Rectangle(20, 20, new Point(10, 100));
      expect(rect1.intersects(rect2)).toBe(false);
    });

    it('should work with negative coordinates', () => {
      const rect1 = new Rectangle(40, 40, new Point(-50, -50));
      const rect2 = new Rectangle(40, 40, new Point(-60, -60));
      expect(rect1.intersects(rect2)).toBe(true);
    });

    it('should return true when rectangles share an edge', () => {
      const rect1 = new Rectangle(20, 20, new Point(10, 10));
      const rect2 = new Rectangle(20, 20, new Point(30, 10));
      expect(rect1.intersects(rect2)).toBe(true);
    });
  });

  describe('intersectsWithPoint', () => {
    it('should return true when point is at center', () => {
      const rectangle = new Rectangle(40, 30, new Point(50, 50));
      const point = new Point(50, 50);
      expect(rectangle.intersectsWithPoint(point)).toBe(true);
    });

    it('should return true when point is inside rectangle', () => {
      const rectangle = new Rectangle(40, 30, new Point(50, 50));
      const point = new Point(55, 55);
      expect(rectangle.intersectsWithPoint(point)).toBe(true);
    });

    it('should return true when point is on edge', () => {
      const rectangle = new Rectangle(40, 30, new Point(50, 50));
      const point = new Point(rectangle.topLeftX, 50);
      expect(rectangle.intersectsWithPoint(point)).toBe(true);
    });

    it('should return true when point is on corner', () => {
      const rectangle = new Rectangle(40, 30, new Point(50, 50));
      const point = new Point(rectangle.topLeftX, rectangle.topLeftY);
      expect(rectangle.intersectsWithPoint(point)).toBe(true);
    });

    it('should return false when point is outside rectangle', () => {
      const rectangle = new Rectangle(40, 30, new Point(50, 50));
      const point = new Point(100, 100);
      expect(rectangle.intersectsWithPoint(point)).toBe(false);
    });

    it('should work with tolerance parameter', () => {
      const rectangle = new Rectangle(40, 30, new Point(50, 50));
      const point = new Point(rectangle.topLeftX - 5, 50);

      expect(rectangle.intersectsWithPoint(point, 0)).toBe(false);
      expect(rectangle.intersectsWithPoint(point, 5)).toBe(true);
    });

    it('should work with negative tolerance', () => {
      const rectangle = new Rectangle(40, 30, new Point(50, 50));
      const point = new Point(rectangle.topLeftX + 2, 50);

      expect(rectangle.intersectsWithPoint(point, 0)).toBe(true);
      expect(rectangle.intersectsWithPoint(point, -3)).toBe(false);
    });

    it('should work with negative coordinates', () => {
      const rectangle = new Rectangle(40, 30, new Point(-50, -50));
      const point = new Point(-50, -50);
      expect(rectangle.intersectsWithPoint(point)).toBe(true);
    });

    it('should handle point just outside rectangle', () => {
      const rectangle = new Rectangle(40, 30, new Point(50, 50));
      const point = new Point(rectangle.topRightX + 1, 50);
      expect(rectangle.intersectsWithPoint(point)).toBe(false);
    });
  });
});
