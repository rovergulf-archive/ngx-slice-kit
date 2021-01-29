import { I17rPipe } from './i17r.pipe';
import { I17rService } from './i17r.service';

describe('I17rPipe', () => {
  let service: I17rService;
  it('create an instance', () => {
    const pipe = new I17rPipe(
      service
    );
    expect(pipe).toBeTruthy();
  });
});
