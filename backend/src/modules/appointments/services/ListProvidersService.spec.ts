import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the profile', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'john Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'john Tred',
      email: 'johntred@example.com',
      password: '123123',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'john Quad',
      email: 'johnquad@example.com',
      password: '123123',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
