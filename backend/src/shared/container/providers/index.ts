import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

// registerSingleton não estava utilizando o constructor da class então usou uma instance para poder funcionar continuando sendo um sigleton
container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);
