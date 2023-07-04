import { BadRequestException } from '@nestjs/common';
import { createRoleJoiSchema } from './dto/create-role.dto';
import { ParseRolePipe } from './parse-role.pipe';

describe('ParseRolePipe', () => {
  it('should be defined', async () => {
    const pipe = new ParseRolePipe(createRoleJoiSchema);
    expect(pipe).toBeDefined();
    expect(
      pipe.transform({ name: 'test', description: 'test' }, { type: 'body' }),
    ).toEqual({ name: 'test', description: 'test' });
    expect(pipe.transform({ name: 'test' }, { type: 'body' })).toEqual({
      name: 'test',
    });
  });

  it('should throw an error', async () => {
    const pipe = new ParseRolePipe(createRoleJoiSchema);
    expect(() => pipe.transform({}, null)).toThrow(BadRequestException);
    expect(() => pipe.transform({ name: 't' }, null)).toThrow(
      BadRequestException,
    );
  });
});
