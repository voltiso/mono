#include <gtest/gtest.h>

#include <voltiso/throwError>

using namespace VOLTISO_NAMESPACE;

struct TickEvent {};

struct KeyEvent {
  char key;
};

struct Position {
  double x;
  double y;
};

struct Velocity {
  double vx;
  double vy;
};

struct Ball {
  Position position;
  Velocity velocity;
  Subject<bool> isFrozen = false;
  Subject<bool> isVisible = true;
  Subject<double> size = 10;
  Subject<bool> isControlled = true;

  // used to serialize and deserialize the state
  void introspect() {
    name("Ball");
    field("position", position);
    field("velocity", velocity);
    field("isFrozen", isFrozen);
    field("isVisible", isVisible);
    field("size", size);
    field("isControlled", isControlled);
  }

  Owned<Retainer> retainer = Owned<Retainer>::create();

  void instantiate() {
    context::Guard<Retainer>(retainer);

    auto &input = context::get<Input>();
    auto &ticker = context::get<Ticker>();
    auto &renderer = context::get<Renderer>();

    auto tick = []() {
      if (input.isKeyDown('a')) {
        vx -= 1;
      }
      if (input.isKeyDown('d')) {
        vx += 1;
      }
      if (input.isKeyDown('w')) {
        vy -= 1;
      }
      if (input.isKeyDown('s')) {
        vy += 1;
      }

      vx *= 0.99;
      vy *= 0.99;
      x += vx;
      y += vy;
    };

    onChange(isFrozen, [] {
      if (isFrozen)
        return;
      // register our callback to be called on every tick
      ticker.on<TickEvent>(tick);
    });

    onChange({props.isVisible, props.size}, [] {
      if (!props.isVisible)
        return;
      renderer.on<DrawEvent>([&](DrawEvent &event) {
        event.drawingContext.drawCircle(position.x, position.y, size);
      });
    });

    onChange({props.isControlled}, [] {
      if (!props.isControlled)
        return;
      input.on<KeyEvent>([&](KeyEvent &event) {
        if (event.key == ' ') {
          isFrozen = !isFrozen;
        }
      });
    });
  }
};

TEST(State, basic) {
  auto guards = {context::Guard<Input>(), context::Guard<Ticker>(),
                 context::Guard<Renderer>()};
  auto ball = instantiate<Ball>();
  ball.isFrozen = true;
  ball.isVisible = true;
  ball.isControlled = true;
  ball.size = 10;
}
