interface PE<T> extends Promise<T> {
  resolve?: (value: T | PromiseLike<T>) => void;
  reject?: (reason?: any) => void;
}

export class DelayQueue<T> {
  queue: (() => PE<T>)[];
  delay: number;
  cursor: number;
  paused: boolean;
  current: undefined | PE<T>;
  tick: (...args: any[]) => void;

  constructor(delay: number, tick: (...args: any[]) => void) {
    this.queue = [];
    this.delay = delay;
    this.cursor = 0;
    this.paused = false;
    this.current = undefined;
    this.tick = tick;
  }

  add(item: T) {
    let resolve: undefined | ((value: T | PromiseLike<T>) => void) = undefined,
      reject: undefined | ((reason?: any) => void) = undefined;

    const pFn = () => {
      const p: PE<T> = new Promise<T>((resolve, reject) => {
        resolve = resolve;
        reject = reject;
        setTimeout(() => {
          this.paused ? reject() : resolve(item);
        }, this.delay);
      });

      p.resolve = resolve;
      p.reject = reject;

      return p;
    };

    this.queue.push(pFn);

    this.start();
  }

  start() {
    Promise.resolve().then(() => {
      if (this.paused) return;

      if (this.current) return; // 正在执行了

      if (this.cursor < this.queue.length) {
        const p = this.queue[this.cursor]();
        p.then((data: T) => {
          this.everyTick(data);
          this.cursor++;
          this.current = undefined;
          this.start();
        }).catch(err => {
          console.error("===> err", this.cursor, err);
          this.current = undefined;
        });
        this.current = p;
      }
    });
  }

  stop() {
    this.paused = true;
  }

  continue() {
    this.paused = false;
    this.start();
  }

  pause() {
    this.paused = true;
  }

  clear() {
    return Promise.resolve(this.current?.reject?.()).finally(() => {
      this.queue = [];
      this.cursor = 0;
    });
  }

  everyTick(item: T) {
    this.tick(item, this.cursor);
  }
}
