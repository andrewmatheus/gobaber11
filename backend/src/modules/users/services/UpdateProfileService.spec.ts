import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John quad',
      email: 'johnquad@example.com',
    });

    expect(updatedUser.name).toBe('John quad');
    expect(updatedUser.email).toBe('johnquad@example.com');
  });

  it('should not be able update the profile from non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-existing-user-id',
        name: 'John Duo',
        email: 'john@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'john Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    const user = await fakeUsersRepository.create({
      name: 'john Quad',
      email: 'teste@example.com',
      password: '123123',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John quad',
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John quad',
      email: 'johnquad@example.com',
      oldPassword: '123123',
      password: '123456',
    });

    expect(updatedUser.password).toBe('123456');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John quad',
        email: 'johnquad@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John quad',
        email: 'johnquad@example.com',
        oldPassword: 'wrong-old-password',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
